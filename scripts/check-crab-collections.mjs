import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createServer} from 'vite';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
const groups=JSON.parse(fs.readFileSync('app/crab-categories.json','utf8'));
const server=await createServer({server:{middlewareMode:true},appType:'custom'});
try{
 const {crabCollections}=await server.ssrLoadModule('/app/crab-collections.ts');
 const {CrabCollectionView}=await server.ssrLoadModule('/app/crab-collection-view.tsx');
 assert.deepEqual(Object.keys(crabCollections).sort(),groups.map(g=>g.id).sort());
 let count=0;
 for(const group of groups){
  const c=crabCollections[group.id];
  assert(c.records.length>=12,group.id+' must have at least twelve records');
  assert.equal(new Set(c.records.map(r=>r.title)).size,c.records.length,group.id+' duplicate titles');
  for(const r of c.records){assert(r.title&&r.description&&r.credit&&r.scope);assert.equal(r.inspect.length,3);assert(new URL(r.source).protocol==='https:');count++;if(r.media?.type==='image'&&!/^https?:/.test(r.media.url)){const file='public/'+r.media.url.replace(/^(\.\/|\/)/,'');assert(fs.existsSync(file),'Missing embedded image '+file);assert(fs.statSync(file).size>1000,'Empty embedded image '+file)}}
  const html=renderToStaticMarkup(React.createElement(CrabCollectionView,{section:group.id}));
  assert(html.includes('crab-collection-'+group.id));
  assert(html.includes('Export source catalog'));
  assert(html.includes('Compare with'));
  console.log(group.title+': '+c.records.length+' entries / '+c.records.filter(r=>r.media).length+' embedded media');
  assert(!html.includes('Not yet available'));
 }
 console.log(`PASS: ${count} sourced records, 13 populated collections, inspection notes, comparisons and source exports.`);
}finally{await server.close()}
process.exit(0);
