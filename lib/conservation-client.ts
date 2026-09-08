import {parseNoaa} from './conservation-parsers.ts';
import {noaaUrl} from './noaa.ts';
import type {ConservationData} from './conservation-types.ts';

// GitHub Pages has no server runtime. NOAA supports direct public API requests;
// DNR/VIMS snapshots are rebuilt by the included scheduled GitHub Actions job.
export async function refreshStaticStations(previous: ConservationData): Promise<ConservationData> {
  const data = structuredClone(previous), checkedAt = new Date().toISOString();
  await Promise.all(Object.entries({'8571892':'AS-001','8577330':'AS-002'}).flatMap(([station, record]) => ['water_temperature','water_level','monthly_mean'].map(async product => {
    const id = `noaa-${station}-${product}`, url = noaaUrl(station, product), prior = data.sources[id];
    try {
      const response = await fetch(url, {signal: AbortSignal.timeout(20000)});
      if (!response.ok) throw new Error(`Provider HTTP ${response.status}`);
      const series = parseNoaa(await response.json(), station, product);
      const metric = data.metrics[record]?.find(m => m.id === product);
      if (!metric) throw new Error('Metric definition missing');
      metric.series = series;
      data.sources[id] = {...prior, name: prior?.name || `NOAA ${station} ${product}`, url, state:'ok', checkedAt, lastSuccessAt:checkedAt, message:'Loaded directly from NOAA. Observation times are separate from fetch times.'};
    } catch (error) {
      data.sources[id] = {...prior, name:prior?.name || `NOAA ${station} ${product}`, url, state:'error', checkedAt, lastSuccessAt:prior?.lastSuccessAt || null, message:`${error instanceof Error ? error.message : 'Refresh unavailable'}. Previous imported values retained.`};
    }
  })));
  return data;
}
