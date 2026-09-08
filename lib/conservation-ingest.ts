import {parseCrabs, parseSav, parseOysterPages, parseNoaa, tableRows, stripHtml} from './conservation-parsers.ts';
import type {ConservationData, ConservationMetric, Observation} from './conservation-types.ts';
import {noaaUrl} from './noaa.ts';

export const CRAB_URL = 'https://dnr.maryland.gov/fisheries/pages/blue-crab/dredge.aspx';
export const OYSTER_INDEX = 'https://dnr.maryland.gov/fisheries/pages/shellfish-monitoring/reports.aspx';
export const OYSTER_NEWS = 'https://news.maryland.gov/dnr/2026/03/09/governor-moore-announces-historic-year-for-oyster-reproduction-in-maryland-waters/';
export const SAV_URL = 'https://mobjack.vims.edu/SAV/SegmentAreaTable.aspx?SalZone=MH&ZoneType=Salinity';
const stationRecords = {'8571892': 'AS-001', '8577330': 'AS-002'};
export const emptyData = (): ConservationData => ({schemaVersion: 1, generatedAt: new Date().toISOString(), metrics: {}, sources: {}, stations: {}});
type Fetcher = (url: string, init?: RequestInit) => Promise<Response>;

export async function refreshConservation(previous: ConservationData, options: {fetcher?: Fetcher; fullHistory?: boolean; stationOnly?: boolean; cacheAnnualHours?: number} = {}): Promise<ConservationData> {
  const data: ConservationData = structuredClone(previous);
  const checkedAt = new Date().toISOString();
  const fetcher = options.fetcher || fetch;
  const get = async (url: string) => {
    const response = await fetcher(url, {signal: AbortSignal.timeout(25000)});
    if (!response.ok) throw new Error(`Provider HTTP ${response.status}`);
    return response;
  };
  const run = async (id: string, name: string, url: string, action: () => Promise<void>) => {
    const prior = data.sources[id];
    if (options.cacheAnnualHours && ['crab','sav','oyster-report','oyster-preliminary'].includes(id) && prior?.state === 'ok' && Date.now()-Date.parse(prior.checkedAt) < options.cacheAnnualHours*3600000) return;
    try {
      await action();
      data.sources[id] = {name, url, state: 'ok', checkedAt, lastSuccessAt: checkedAt, message: 'Loaded from provider; hosted caches: stations 15 min, annual sources 24 h, PDF reports 7 days. Observation dates are separate.'};
    } catch (error) {
      data.sources[id] = {name, url: prior?.url || url, state: 'error', checkedAt, lastSuccessAt: prior?.lastSuccessAt || null, message: `${error instanceof Error ? error.message : 'Provider unavailable'}. Previous imported values retained, where available.`};
    }
  };
  const put = (record: string, metric: ConservationMetric) => {
    const existing = data.metrics[record] || [];
    data.metrics[record] = [...existing.filter(m => m.id !== metric.id), metric];
  };
  const merge = (record: string, metric: string, observations: Observation[]) => {
    const old = data.metrics[record]?.find(m => m.id === metric)?.series || [];
    return [...new Map([...old, ...observations].map(o => [o.date, o])).values()].sort((a,b) => a.date.localeCompare(b.date));
  };
  const tasks: Promise<void>[] = [];
  if (!options.stationOnly) {
    tasks.push(run('crab', 'Maryland DNR · Winter Dredge Survey', CRAB_URL, async () => {
      const history = parseCrabs(await (await get(CRAB_URL)).text());
      const labels: Record<string, string> = {females: 'Adult female abundance', total: 'Total crab abundance', juveniles: 'Juvenile abundance', males: 'Adult male abundance'};
      for (const id of ['females', 'total', 'juveniles', 'males']) put('SP-001', {id, label: labels[id], unit: 'million crabs', precision: 1, scope: 'Entire Chesapeake Bay · Maryland and Virginia', cadence: 'Annual', definition: 'Bay-wide Winter Dredge Survey population estimate, not a count at the marker. Adult females indicate spawning potential; juveniles indicate recruitment. Values retain DNR rounding; demographic components need not sum to the published total. Survey uncertainty is not quantified in this table.', series: history[id]});
    }));
    tasks.push(run('sav', 'VIMS · annual submerged aquatic vegetation survey', SAV_URL, async () => {
      const html = await (await get(SAV_URL)).text();
      const header = tableRows(html).find(row => row[0] === 'Segment');
      const years = header?.slice(1).map(Number);
      if (!years || years.length !== 3 || years.some(y => !Number.isInteger(y) || y < 2000 || y > new Date().getUTCFullYear())) throw new Error('SAV year header unavailable');
      const tables = [{html, years}];
      if (options.fullHistory) {
        // Sequential batches prevent a burst of requests to the survey service.
        for (let year = 2000; year < years[0]; year += 3) {
          const batch = [year, year + 1, year + 2].map(y => Math.min(y, years[0] - 1));
          const url = `${SAV_URL}&Year1=${batch[0]}&Year2=${batch[1]}&Year3=${batch[2]}`;
          tables.push({html: await (await get(url)).text(), years: batch});
        }
      }
      const results = [['HB-001', 'TANMH1', 'Tangier Sound Segment 1'], ['HB-002', 'CHOMH1', 'Mouth of the Choptank River']].map(([record, segment, scope]) => ({record, metric: {id: 'sav', label: 'Mapped underwater grass area', unit: 'hectares', precision: 2, scope: `${scope} · VIMS ${segment} (whole segment)`, cadence: 'Annual' as const, definition: 'Aerial-survey area of submerged aquatic vegetation (SAV), an indicator of nursery habitat and water clarity. This is a regional mapped area, not percentage cover, oyster reef acreage, or a Maryland-only subtotal. Preliminary and partially mapped years must not be treated as final comparable totals.', series: merge(record, 'sav', tables.flatMap(t => parseSav(t.html, t.years, segment)))} }));
      results.forEach(({record, metric}) => put(record, metric));
    }));
    tasks.push(run('oyster-report', 'Maryland DNR · Fall Oyster Survey, tables 2 and 5', OYSTER_INDEX, async () => {
      const index = await (await get(OYSTER_INDEX)).text();
      const candidates = [...index.matchAll(/href=["']([^"']*(20\d{2})Rpt[^"']*\.pdf)["']/gi)].map(m => ({year: +m[2], url: new URL(m[1].replaceAll('&amp;', '&'), OYSTER_INDEX).href})).filter(v => v.year >= 2024 && v.year <= new Date().getUTCFullYear()).sort((a,b) => b.year-a.year);
      if (!candidates.length) throw new Error('Oyster report link format changed');
      const report = candidates[0];
      if (new URL(report.url).hostname !== 'dnr.maryland.gov') throw new Error('Unexpected report host');
      const buffer = await (await get(report.url)).arrayBuffer();
      if (buffer.byteLength > 20 * 1024 * 1024) throw new Error('Oyster report exceeds import size limit');
      const {extractText} = await import('unpdf');
      const {text} = await extractText(new Uint8Array(buffer));
      const parsed = parseOysterPages(text, report.year);
      // Preserve a newer preliminary observation until the full report replaces it.
      put('SP-002', {id: 'spat', label: 'Spatfall intensity', unit: 'spat / bushel of cultch', precision: 1, scope: 'Maryland · 53 key oyster monitoring bars', cadence: 'Annual', definition: 'Annual recruitment index: average juvenile oysters per bushel of shell material at index bars. It is not oyster density per square metre or total population.', series: merge('SP-002', 'spat', parsed.spat)});
      put('SP-002', {id: 'mortality', label: 'Observed oyster mortality', unit: '%', precision: 1, scope: 'Maryland · disease-monitoring oyster bars', cadence: 'Annual', definition: 'Observed mortality index reported in Table 5, averaged across monitoring bars. Historical values retain the report’s rounded precision. This is not a Harris Creek-specific estimate and is not an IUCN conservation category.', series: parsed.mortality});
      // Store the exact report URL on the source record after the wrapper updates it.
      reportLinks.oyster = report.url;
    }));
  }
  const reportLinks: {oyster?: string} = {};
  for (const [station, record] of Object.entries(stationRecords)) {
    const metadataUrl = `https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations/${station}.json?expand=details`;
    tasks.push(run(`metadata-${station}`, `NOAA · station ${station} metadata`, metadataUrl, async () => {
      const payload = await (await get(metadataUrl)).json() as {stations?: {id: string; name: string; lat: number; lng: number; details?: {established?: string}}[]};
      const item = payload.stations?.find(s => s.id === station);
      if (!item || !Number.isFinite(item.lat) || !Number.isFinite(item.lng)) throw new Error('Station metadata invalid');
      data.stations[station] = {id: station, name: item.name, lat: item.lat, lon: item.lng, established: item.details?.established?.slice(0,10) || 'Not published'};
    }));
    for (const product of ['water_temperature', 'water_level', 'monthly_mean']) {
      const url = noaaUrl(station, product);
      tasks.push(run(`noaa-${station}-${product}`, `NOAA ${station} · ${product.replaceAll('_', ' ')}`, url, async () => {
        const series = parseNoaa(await (await get(url)).json(), station, product);
        const monthly = product === 'monthly_mean', temperature = product === 'water_temperature';
        put(record, {id: product, label: monthly ? 'Monthly mean sea level' : temperature ? 'Water temperature' : 'Observed water level', unit: temperature ? '°C' : 'm relative to station MSL datum', precision: temperature ? 1 : 3, scope: `NOAA CO-OPS ${station} · station observation`, cadence: monthly ? 'Monthly' : 'Station feed', definition: monthly ? 'NOAA verified monthly mean sea level from 2000 onward, relative to the station MSL tidal datum. Inferred months are marked. Regional flood exposure context; not a measurement of equipment health or seabed depth. Missing months are not interpolated.' : temperature ? 'Latest published station water temperature. Temperature is habitat context, not a species health assessment. Preliminary provider readings and quality flags are retained. Battery, calibration and maintenance health are not inferred.' : 'Latest observed water surface height relative to the station MSL tidal datum. This is neither depth below the water nor a NAVD 88 terrain height; these values must not be subtracted from the map model without datum conversion.', series});
      }));
    }
  }
  await Promise.all(tasks);
  if (reportLinks.oyster) data.sources['oyster-report'].url = reportLinks.oyster;
  if (!options.stationOnly) {
    // This dated preliminary release is a separate source, never promoted to a final survey.
    await run('oyster-preliminary', 'Maryland DNR · 2025 preliminary oyster survey release', OYSTER_NEWS, async () => {
      const html = stripHtml(await (await get(OYSTER_NEWS)).text());
      const value = html.match(/index average of ([\d,.]+) spat/i)?.[1];
      if (!value || !/Preliminary results/i.test(html) || +value.replaceAll(',', '') !== 250) throw new Error('Preliminary oyster release changed; review required');
      const metric = data.metrics['SP-002']?.find(m => m.id === 'spat');
      if (!metric) throw new Error('No validated oyster history available');
      const final2025 = metric.series.find(o => o.date === '2025' && o.source === 'oyster-report');
      if (!final2025) metric.series = merge('SP-002', 'spat', [{date: '2025', value: 250, source: 'oyster-preliminary', quality: 'Preliminary', note: 'Preliminary 2025 survey reported March 9, 2026. No numeric 2025 mortality imported from this release.'}]);
    });
  }
  data.generatedAt = checkedAt;
  return data;
}
