import fs from 'node:fs';
import assert from 'node:assert/strict';
const original=JSON.parse(fs.readFileSync('app/crab-merged.json','utf8'));
const groups=JSON.parse(fs.readFileSync('app/crab-categories.json','utf8'));
const flatten=sections=>sections.flatMap(s=>[s,...flatten(s.children)]);
const sections=flatten(original.sections);
const lookup=new Map(sections.map(s=>[s.id,s]));
const expected=sections.flatMap(s=>s.paragraphs.map((_,i)=>`${s.id}:${i}`)).sort();
const actual=lookup.get('crab-in-culture').paragraphs.map((_,i)=>`crab-in-culture:${i}`);
const anchors=new Set(['crab-in-culture']);
for(const group of groups){
 assert(!anchors.has('crab-category-'+group.id));anchors.add('crab-category-'+group.id);
 for(const entry of group.sections){
  const source=lookup.get(entry.source);assert(source,entry.source);
  const id=entry.id||source.id;assert(!anchors.has(id),'Duplicate anchor '+id);anchors.add(id);
  for(const i of entry.paragraphs||source.paragraphs.map((_,i)=>i)){
   assert(source.paragraphs[i]);actual.push(`${source.id}:${i}`);
  }
 }
}
assert.deepEqual(actual.sort(),expected,'Every original paragraph must appear exactly once');
for(const s of sections)assert(anchors.has(s.id),'Lost original anchor '+s.id);
for(const g of groups)for(const link of g.links||[])assert(anchors.has(link.target),'Broken cross-link '+link.target);
assert.equal(groups.length,13);
assert.equal(groups[0].id,'overview');
assert(!groups.some(group=>group.id==='music'));
console.log(`PASS: ${actual.length} paragraphs mapped exactly once across 13 tabs; music excluded from Contents; all section anchors and cross-links intact.`);
