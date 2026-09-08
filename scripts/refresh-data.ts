import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {emptyData, refreshConservation} from '../lib/conservation-ingest.ts';
import type {ConservationData} from '../lib/conservation-types.ts';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const filename = path.join(root, 'app/conservation-snapshot.json');
let previous: ConservationData;
try {previous = JSON.parse(await fs.readFile(filename, 'utf8'));} catch {previous = emptyData();}
const fixtureDir = process.env.CONSERVATION_FIXTURES;
const fetcher = fixtureDir ? async (url: string, init?: RequestInit) => {
  await fs.mkdir(fixtureDir, {recursive:true});
  const key = path.join(fixtureDir, createHash('sha256').update(url).digest('hex'));
  try {return new Response(await fs.readFile(key));} catch {}
  const response = await fetch(url, init);
  if (response.ok) {await fs.writeFile(key, new Uint8Array(await response.clone().arrayBuffer())); await fs.writeFile(key+'.url', url);}
  return response;
} : undefined;
const data = await refreshConservation(previous, {fullHistory: true, fetcher});
for (const [id, source] of Object.entries(data.sources)) console.log(id, source.state, source.state === 'error' ? source.message : 'loaded');
for (const id of ['SP-001','SP-002','HB-001','HB-002','AS-001','AS-002']) {
  if (!data.metrics[id]?.length) throw new Error(`No validated metrics for ${id}; snapshot not written.`);
}
await fs.writeFile(filename + '.tmp', JSON.stringify(data, null, 2) + '\n');
await fs.rename(filename + '.tmp', filename);
await fs.mkdir(path.join(root, 'public'), {recursive: true});
await fs.copyFile(filename, path.join(root, 'public/conservation-data.json'));
console.log('Saved validated source data. Individual source failures preserve last imported values.');
