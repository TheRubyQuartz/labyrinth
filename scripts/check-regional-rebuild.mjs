import {chromium} from 'file:///C:/Users/Neo/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'msedge',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[];
page.on('pageerror',e=>errors.push(e.message));
try{
 await page.goto('http://127.0.0.1:5202/?entry=SP-001#crab-world-map');
 const section=page.locator('#crab-world-map');await section.waitFor();
 const topicBodies=new Set();
 for(let r=0;r<9;r++){
  await section.locator('.atlas-record-list button').nth(r).click();
  for(let t=0;t<4;t++){await section.getByRole('tab').nth(t).click();const body=await section.getByRole('tabpanel').innerText();assert.ok(body.length>200);topicBodies.add(body)}
  assert.equal(await section.locator('.atlas-landmark-cards button').count(),2);
  for(let n=0;n<2;n++){await section.locator('.atlas-landmark-cards button').nth(n).click();await page.waitForTimeout(400);assert.equal(await section.locator('.atlas-landmark-cards button[aria-pressed=true]').count(),1);assert.match(await section.locator('.atlas-camera-controls').innerText(),/16.0×/);assert.equal(await section.locator('.atlas-local-selection').count(),1)}
 }
 assert.equal(topicBodies.size,36);
 await section.getByRole('button',{name:'☆ Save region',exact:true}).click();
 await page.reload();await section.getByRole('button',{name:/Show saved regions/}).click();assert.equal(await section.locator('.atlas-record-list button').count(),1);assert.match(await section.locator('.atlas-record-list').innerText(),/Black Sea/);
 await section.locator('.atlas-record-list button').click();await section.getByRole('button',{name:'★ Saved region',exact:true}).click();assert.equal(await section.locator('.atlas-record-list button').count(),0);await section.getByRole('button',{name:'Clear filters'}).click();
 await section.getByRole('searchbox').fill('Rocha');assert.equal(await section.locator('.atlas-record-list button').count(),1);await section.locator('.atlas-landmark-results button').click();await page.waitForTimeout(450);assert.match(await section.locator('.atlas-local-selection').innerText(),/Rocha/);
 await section.getByRole('combobox',{name:'Landmark category'}).selectOption('Study area');assert.equal(await section.locator('[data-landmark]').count(),8);
 await section.getByRole('checkbox',{name:'Local landmarks'}).uncheck();assert.equal(await section.locator('[data-landmark]').count(),0);await section.getByRole('checkbox',{name:'Local landmarks'}).check();
 await section.getByRole('combobox',{name:'Landmark category'}).selectOption('All landmarks');
 await section.getByRole('searchbox').fill('rio');assert.equal(await section.locator('.atlas-record-list button').count(),1);await section.getByRole('searchbox').fill('');
 await section.getByRole('button',{name:'Reset map',exact:true}).click();await section.locator('.atlas-record-list button').nth(5).click();await section.getByRole('tab',{name:'Landscape'}).click();await section.locator('.atlas-landmark-cards button').first().click();await page.waitForTimeout(500);
 const hide=page.getByRole('button',{name:'Hide player',exact:true});if(await hide.count())await hide.click();
 await section.screenshot({path:'atlas-rebuilt-desktop.png'});
 await page.setViewportSize({width:390,height:844});await section.screenshot({path:'atlas-rebuilt-mobile.png'});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
 await section.getByRole('tab',{name:'Landscape'}).focus();await page.keyboard.press('ArrowRight');assert.equal(await section.getByRole('tab',{name:'Seasonal life'}).getAttribute('aria-selected'),'true');
 assert.deepEqual(errors,[]);console.log('PASS: 36 distinct views, 18 landmark journeys, save/reload/remove, landmark and accent-insensitive search, categories, layer toggle, mobile overflow and keyboard tabs.');
}finally{await browser.close()}
