import {createRequire} from 'node:module';
import path from 'node:path';
import assert from 'node:assert/strict';
const require=createRequire('C:/Users/Neo/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/package.json');
process.env.PLAYWRIGHT_BROWSERS_PATH=path.resolve('.practice-qa/browsers');
const {chromium}=require('playwright');
const browser=await chromium.launch({headless:true});
try{
 const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const width of [1440,390]){
  await page.setViewportSize({width,height:900});
  for(const section of ['overview','infrastructure','transport','graphics','business','fitness','agriculture','modeling','animation','nature','survival','film','sounds']){
   await page.goto(`http://127.0.0.1:5205/?entry=SP-001#crab-category-${section}`);
   await page.locator('.sc-notebook').waitFor();
   assert.equal(await page.locator('.sc-connections a').count(),2);
   const note=page.getByLabel('Notes for this record');await note.fill('Test observation '+section);
   await page.reload();await page.locator('.sc-notebook').waitFor();assert.equal(await note.inputValue(),'Test observation '+section);
   await note.fill('');
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),section+' overflow');
  }
  for(const view of ['archive','map','marketplace','news']){
   await page.goto('http://127.0.0.1:5205/?view='+view);await page.getByRole('region',{name:'Connected destinations'}).waitFor();assert.equal(await page.locator('.sc-connections a').count(),2);
  }
 }
 assert.deepEqual(errors,[]);console.log('PASS: all 13 section routes and persistent notes, four destination panels, desktop/mobile, no page errors.');
}finally{await browser.close()}
