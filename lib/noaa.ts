export const NOAA_API = 'https://api.tidesandcurrents.noaa.gov/api/prod/datagetter';
export function noaaUrl(station: string, product: string, today = new Date().toISOString().slice(0,10).replaceAll('-', '')) {
  const params = new URLSearchParams({product, station, time_zone: product === 'monthly_mean' ? 'lst' : 'gmt', units: 'metric', format: 'json', application: 'LabyrinthConservation'});
  if (product !== 'water_temperature') params.set('datum', 'MSL');
  if (product === 'monthly_mean') {params.set('begin_date', '20000101'); params.set('end_date', today);} else params.set('date', 'latest');
  return `${NOAA_API}?${params}`;
}
