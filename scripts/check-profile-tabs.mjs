import {createServer} from 'vite';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const groups=JSON.parse(fs.readFileSync('app/crab-categories.json','utf8'));
assert.deepEqual(groups.map(g=>g.title),['Overview','Infrastructure','Movement','Graphics','Society','Health','Combat','Models','Art','Environment','Survival','Videos','Sounds']);
globalThis.window={location:{hash:''}};
const server=await createServer({server:{middlewareMode:true},appType:'custom'});
try{
 const {MergedCrabArticle,MergedCrabContents}=await server.ssrLoadModule('/app/crab-merged.tsx');
 for(const group of groups){
  window.location.hash='#crab-category-'+group.id;
  const html=renderToStaticMarkup(React.createElement(MergedCrabArticle));
  assert.equal((html.match(/role="tab"/g)||[]).length,group.id==='overview'?18:13,group.id+' tab count');
  assert(html.includes('id="crab-category-'+group.id+'"'),group.id+' active content');
  assert(html.includes('id="article-see-also"'),group.id+' See Also');
  assert(html.includes('id="article-references"'),group.id+' References');
  assert(html.includes('Hide player'),group.id+' music control');
  assert(html.includes('id="article-further-reading"'),group.id+' Further Reading');
  assert(html.includes('id="crab-in-culture"'),group.id+' preserved literature');
  assert(html.indexOf('id="article-further-reading"')>html.indexOf('id="article-see-also"'),'Further Reading nested after See Also');
  assert.equal((html.match(/id="article-references"/g)||[]).length,1,'No duplicate reference IDs');
  if(group.id==='overview'){
   assert.equal((html.match(/class="crab-question-card"/g)||[]).length,7);
   assert(html.indexOf('id="crab-questions"')>html.indexOf('Personality and Disposition'));
   const headings=[...html.matchAll(/<h3>(.*?)<\/h3>/g)].map(match=>match[1]);
   assert.deepEqual(headings.slice(headings.indexOf('Summary'),headings.indexOf('Summary')+5),['Summary','Significance across Beliefs','Major Risks and Issues','World Map','Origins and development']);
   for(const title of ['Christianity','Moche traditions','History','Mythology','Fiction','Origins','Evolution','Current developments','Mind / consciousness','Body and functions','Personality and Disposition'])assert(html.includes('<h4>'+title+'</h4>'),title+' nested heading');
   assert(html.indexOf('<h4>Christianity</h4>')<html.indexOf('<h4>Moche traditions</h4>'));
   assert(html.includes('<h4>Buddhism</h4>')&&html.includes('<h4>Greek astral tradition</h4>'));
   assert(!html.includes('kosher')&&!html.includes('abstinence rules'));
   assert(html.indexOf('id="crab-major-risks"')<html.indexOf('id="crab-world-map"'));
   assert(html.includes('World blue crab regional locations'));
   assert.equal((html.match(/class="crab-risk-card"/g)||[]).length,6);
   assert.equal((html.match(/data-node=/g)||[]).length,12,'Twelve plotted milestones');
   assert(html.indexOf('id="crab-profiles"')<html.indexOf('id="crab-questions"'));
   assert(html.indexOf('class="overview-connected"')<html.indexOf('id="crab-questions"'));
   assert(html.indexOf('id="crab-questions"')<html.indexOf('id="article-see-also"'));
   assert(html.indexOf('id="crab-testing"')>html.indexOf('id="crab-profiles"'));
   assert(!html.includes('Overview quick navigation'));
   assert(!html.includes('aria-label="Related to Overview"'));
   assert(html.indexOf('<h3>Crabs in culture</h3>')>html.indexOf('<h3>Mind, Body and Disposition</h3>'));
   assert(html.includes('All beliefs · 460'));
   assert(html.includes('aria-label="Significance across Beliefs"'));
   assert.equal((html.match(/Major works and appearances/g)||[]).length,3);
   assert(!html.includes('spiritual aura')&&!html.includes('primary religious lens'));
  }
 }
 const toc=renderToStaticMarkup(React.createElement(MergedCrabContents,{link:(target,label)=>React.createElement('a',{href:'#'+target},label)}));
 assert(!toc.includes('Music'),'Music must not appear in Contents');
 assert(toc.includes('Overview')&&toc.includes('Survival'));
 console.log('PASS: all 13 tabs render independently with See Also, References and player controls; Contents excludes music.');
}finally{await server.close()}
