import {chromium} from 'file:///C:/Users/Neo/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const works=JSON.parse(readFileSync('app/crab-culture-selections.json','utf8'));
const browser=await chromium.launch({channel:'msedge',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[];
page.on('pageerror',e=>errors.push(e.message));
try{
 await page.goto('http://127.0.0.1:5202/?entry=SP-001#crab-group-overview-4');
 const hide=page.getByRole('button',{name:'Hide player',exact:true});if(await hide.count())await hide.click();
 assert.equal(await page.locator('.culture-work').count(),16);
 for(const category of ['History','Mythology','Fiction']){
 const scope=page.locator('.culture-'+category.toLowerCase());
 for(const work of works.filter(w=>w.category===category)){
 await scope.getByRole('tab',{name:new RegExp(work.title.replace(/[.*+?^${}()|[\]\\]/g,'\\ for(const work of works){'))}).click();
  const row=page.locator('.culture-work').filter({has:page.getByRole('link',{name:work.title,exact:false})});
  assert.equal(await row.locator('.culture-description').innerText(),work.description);
  assert.equal(await row.getByRole('link',{name:'Explore source for '+work.title}).getAttribute('href'),work.url);
 }
 const tabs=scope.getByRole('tab');await tabs.first().focus();await page.keyboard.press('End');assert.equal(await tabs.last().getAttribute('aria-selected'),'true');await page.keyboard.press('Home');assert.equal(await tabs.first().getAttribute('aria-selected'),'true');
 const save=scope.getByRole('button',{name:'Save '+works.find(w=>w.category===category).title,exact:true});await save.click();assert.equal(await save.getAttribute('aria-pressed'),'true');
 await scope.getByRole('button',{name:'Read all works'}).click();assert.equal(await scope.locator('.culture-work:visible').count(),({History:6,Mythology:4,Fiction:6})[category]);await scope.getByRole('button',{name:'Gallery view'}).click();
 }
 await page.reload();for(const category of ['History','Mythology','Fiction']){const scope=page.locator('.culture-'+category.toLowerCase());assert.equal(await scope.getByRole('button',{name:'Save '+works.find(w=>w.category===category).title,exact:true}).getAttribute('aria-pressed'),'true')}
 assert.equal(await page.locator('.culture-dossier,.culture-explorer-tools,.culture-compare-panel').count(),0);
 await page.locator('.culture-history').screenshot({path:'culture-desktop.png'});
 await page.setViewportSize({width:390,height:844});
 await page.locator('.culture-fiction').screenshot({path:'culture-mobile.png'});
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
 assert.deepEqual(errors,[]);
 console.log('PASS: 16 integrated appearances; 10 preserved descriptions and sources; gallery selection, keyboard navigation, read-all mode, saved state/reload, desktop/mobile layout and no runtime errors.');
}finally{await browser.close()}
