export type Observation = {
  date: string;
  value: number | null;
  quality: string;
  source: string;
  sourceUrl?: string;
  note?: string;
};
export type ConservationMetric = {
  id: string;
  label: string;
  unit: string;
  precision: number;
  scope: string;
  cadence: 'Annual' | 'Monthly' | 'Station feed';
  definition: string;
  series: Observation[];
};
export type DataSource = {
  name: string;
  url: string;
  state: 'ok' | 'error' | 'snapshot';
  checkedAt: string;
  lastSuccessAt: string | null;
  message: string;
};
export type StationMetadata = {
  id: string; name: string; lat: number; lon: number; established: string;
};
export type ConservationData = {
  schemaVersion: 1;
  generatedAt: string;
  metrics: Record<string, ConservationMetric[]>;
  sources: Record<string, DataSource>;
  stations: Record<string, StationMetadata>;
};

export function latest(metric?: ConservationMetric): Observation | undefined {
  return metric?.series.at(-1);
}
export function formatMetric(value: number | null | undefined, precision = 1) {
  return value == null ? '—' : value.toLocaleString('en-US', {maximumFractionDigits: precision});
}
export function isStale(observation?: Observation, now = Date.now()) {
  return !observation || now - Date.parse(observation.date) > 60 * 60 * 1000;
}
