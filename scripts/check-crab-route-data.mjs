import fs from 'node:fs';
import assert from 'node:assert/strict';
const rows=JSON.parse(fs.readFileSync(new URL('../app/crab-documented-shipments.json',import.meta.url),'utf8'));
const ids=new Set(), corridors=new Set();
const counts={Land:0,Air:0,Sea:0};
for(const r of rows){
  assert(!ids.has(r.id),`Duplicate ID: ${r.id}`); ids.add(r.id);
  assert(r.family in counts,`Unknown family: ${r.family}`);
  for(const p of [r.a,r.b]) assert(p.length===2 && p.every(Number.isFinite) && Math.abs(p[0])<=180 && Math.abs(p[1])<=90,`Invalid coordinate: ${r.id}`);
  const corridor=JSON.stringify([r.family,r.a,r.b]);
  assert(!corridors.has(corridor),`Duplicate corridor: ${r.id}`); corridors.add(corridor);
  for(const key of ['source','period','status','note','from','to']) assert(r[key]?.length,`Missing ${key}: ${r.id}`);
  assert.equal(r.scope,'Callinectes sapidus');
  counts[r.family]++;
}
console.log(JSON.stringify({records:rows.length,counts,target:12,remaining:Object.fromEntries(Object.entries(counts).map(([k,v])=>[k,Math.max(0,12-v)])),rankingEstablished:false},null,2));
