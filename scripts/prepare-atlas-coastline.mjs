// Mechanical simplification of the unmodified Natural Earth GeoJSON download.
import {readFileSync,writeFileSync} from 'node:fs';
const geo=JSON.parse(readFileSync('natural-earth-50m.source.geojson','utf8'));
const rings=geo.features.flatMap(f=>f.geometry.type==='Polygon'?f.geometry.coordinates:f.geometry.coordinates.flat());
const simplified=rings.map(r=>r.filter((_,i)=>i%3===0||i===r.length-1).map(p=>p.map(v=>Number(v.toFixed(3))))).filter(r=>r.length>=4);
writeFileSync('app/crab-world-land-detail.json',JSON.stringify(simplified));
console.log(`${simplified.length} coastline rings; ${simplified.reduce((n,r)=>n+r.length,0)} points`);
