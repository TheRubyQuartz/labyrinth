import type {Observation} from './conservation-types.ts';

export const stripHtml = (html: string) => html.replace(/<[^>]*>/g, ' ').replace(/&nbsp;|&#160;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
export function tableRows(html: string) {
  return [...html.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)].map(row =>
    [...row[1].matchAll(/<t[dh]\b[^>]*>([\s\S]*?)<\/t[dh]>/gi)].map(cell => stripHtml(cell[1])));
}
export function parseCrabs(html: string): Record<string, Observation[]> {
  const rows = tableRows(html).filter(row => row.length === 5 && /^20\d{2}$/.test(row[0]));
  if (rows.length < 20 || !/Juveniles/.test(html) || !/Adult Females/.test(html)) throw new Error('Crab table format changed; retained prior assessment.');
  const keys = ['juveniles', 'males', 'females', 'total'];
  const result: Record<string, Observation[]> = Object.fromEntries(keys.map(k => [k, []]));
  for (const row of rows) {
    if (+row[0] > new Date().getUTCFullYear()) continue;
    keys.forEach((key, i) => {
      if (!/^\d+(\.\d+)?$/.test(row[i + 1])) throw new Error('Invalid crab abundance.');
      const value = +row[i + 1];
      if (value < 0 || value > 2000) throw new Error('Crab abundance outside validation range.');
      result[key].push({date: row[0], value, quality: 'Published estimate', source: 'crab'});
    });
  }
  for (const series of Object.values(result)) {
    series.sort((a,b) => a.date.localeCompare(b.date));
    if (new Set(series.map(o => o.date)).size !== series.length) throw new Error('Duplicate crab survey years.');
  }
  return result;
}

export function parseSav(html: string, years: number[], segment: string): Observation[] {
  if (!/Areas in Hectares/i.test(html)) throw new Error('SAV units changed.');
  const rows = tableRows(html);
  const header = rows.find(row => row[0] === 'Segment');
  if (!header || years.some((y, i) => header[i + 1] !== String(y))) throw new Error('SAV year columns changed.');
  const row = rows.find(row => row[0]?.startsWith(segment + ' -'));
  if (!row || row.length !== years.length + 1) throw new Error('SAV segment unavailable.');
  return years.map((year, index) => {
    const cell = row[index + 1];
    const partial = /pd/i.test(cell), missing = /nd/i.test(cell);
    const raw = cell.replace(/,/g, '').replace(/\(?(?:pd|nd)\)?/gi, '').trim();
    const value = missing || raw === '' ? null : /^\d+(\.\d+)?$/.test(raw) ? +raw : NaN;
    if (Number.isNaN(value) || (value != null && (value < 0 || value > 100000))) throw new Error(`Invalid SAV area (${segment}, ${year}: ${cell}).`);
    const preliminary = new RegExp(`${year} SAV Totals are Preliminary`, 'i').test(stripHtml(html));
    return {date: String(year), value, source: 'sav', sourceUrl: `https://mobjack.vims.edu/SAV/SegmentAreaTable.aspx?SalZone=MH&ZoneType=Salinity&Year1=${years[0]}&Year2=${years[1]}&Year3=${years[2]}`, quality: missing ? 'Not mapped' : partial ? 'Partial survey' : preliminary ? 'Preliminary' : 'Published survey', ...(partial ? {note: 'Not fully mapped; area is incomplete.'} : {})};
  });
}

// Read the actual year header and named summary row on each PDF table page.
// Reject layout changes instead of silently assigning values to the wrong years.
export function parseOysterPages(pages: string[], reportYear: number): Record<string, Observation[]> {
  const result: Record<string, Observation[]> = {spat: [], mortality: []};
  for (const page of pages) {
    const key = /^\d+\s*\nTable 2[.\s-]/.test(page) && /Spatfall Intensity/.test(page) ? 'spat' : /^\d+\s*\nTable 5[.\s-]/.test(page) && /Total Observed Mortality/.test(page) ? 'mortality' : null;
    if (!key) continue;
    const lines = page.split('\n').map(s => s.trim());
    const header = lines.find(s => /^(?:Oyster Bar )?(?:19|20)\d{2}(?:\s|$)/.test(s));
    const summary = lines.find(s => key === 'spat' ? /^Spat Index\s/.test(s) : /^Annual Means\s/.test(s));
    if (!header || !summary) throw new Error('Oyster table layout changed.');
    const years = [...header.matchAll(/\b(?:19|20)\d{2}\b/g)].map(m => +m[0]);
    const values = summary.replace(key === 'spat' ? /^Spat Index\s+/ : /^Annual Means\s+/, '').split(/\s+/);
    if (!years.length || values.length < years.length || values.length > years.length + 1) throw new Error('Oyster table column mismatch.');
    years.forEach((year, i) => {
      if (year < 2000 || year > reportYear) return;
      if (!/^\d+(\.\d+)?$/.test(values[i])) throw new Error('Invalid oyster index.');
      const value = +values[i];
      if (value < 0 || value > (key === 'mortality' ? 100 : 10000)) throw new Error('Oyster index outside validation range.');
      result[key].push({date: String(year), value, source: 'oyster-report', quality: 'Published survey'});
    });
  }
  for (const series of Object.values(result)) {
    series.sort((a,b) => a.date.localeCompare(b.date));
    if (series.length !== reportYear - 1999 || new Set(series.map(o => o.date)).size !== series.length || series.at(-1)?.date !== String(reportYear)) throw new Error('Oyster history is incomplete or duplicated.');
  }
  return result;
}

type NoaaResponse = {metadata?: {id?: string}; error?: {message?: string}; data?: Record<string, string>[]};
export function parseNoaa(payload: NoaaResponse, station: string, product: string): Observation[] {
  if (payload.error || !Array.isArray(payload.data) || payload.metadata?.id !== station) throw new Error(payload.error?.message || 'Station response invalid.');
  const monthly = product === 'monthly_mean';
  const series = payload.data.map(row => {
    const date = monthly ? `${row.year}-${row.month.padStart(2, '0')}` : row.t?.replace(' ', 'T') + ':00Z';
    const raw = monthly ? row.MSL : row.v;
    const value = raw == null || raw.trim() === '' ? null : Number(raw);
    if (!date || !Number.isFinite(Date.parse(date)) || Date.parse(date) > Date.now() + 15 * 60 * 1000 || (value != null && (!Number.isFinite(value) || (product === 'water_temperature' ? value < -5 || value > 45 : Math.abs(value) > 15)))) throw new Error('Station value or timestamp failed validation.');
    const flagged = !monthly && (row.f || '').split(',').some(v => Number(v.trim()) !== 0);
    const quality = value == null ? 'Missing observation' : monthly ? row.inferred === '1' ? 'Inferred' : 'Verified monthly mean' : flagged ? 'Flagged by NOAA' : row.q === 'v' ? 'Verified' : 'Preliminary';
    return {date, value, source: `noaa-${station}-${product}`, quality, ...(flagged ? {note: `Provider flags: ${row.f}. Inspect the source before interpreting.`} : {})};
  }).sort((a,b) => a.date.localeCompare(b.date));
  if (!series.length) throw new Error('No station observations returned.');
  if (new Set(series.map(o => o.date)).size !== series.length) throw new Error('Duplicate station timestamps.');
  return series;
}
