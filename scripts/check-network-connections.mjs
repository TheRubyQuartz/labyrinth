import {chromium} from 'file:///C:/Users/Neo/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'msedge',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000}});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
try{
 await page.goto('http://127.0.0.1:5202/?entry=SP-001#crab-profiles');
 const scope=page.locator('#crab-profiles');
 const hide=page.getByRole('button',{name:'Hide player',exact:true});if(await hide.count())await hide.click();
 assert.equal(await scope.locator('.network-profile-slot').count(),4);
 for(const slot of await scope.locator('.network-profile-slot').all()){
  await slot.click();assert.equal(await slot.getAttribute('aria-expanded'),'true');
  assert.equal(await scope.getByRole('region',{name:'Connection preview'}).count(),1);
  assert.equal(await scope.locator('.network-detail-fields>div').count(),3);
  await scope.getByRole('button',{name:'Close connection details'}).click();
  assert.equal(await scope.locator('.network-detail').count(),0);
 }
 await scope.getByRole('button',{name:'Aligned',exact:true}).click();
 assert.equal(await scope.locator('.network-profile-slot').count(),2);
 await scope.getByRole('combobox',{name:'Profile type'}).selectOption('Organization');
 assert.equal(await scope.locator('.network-profile-slot').count(),1);
 await scope.locator('.network-profile-slot').click();
 await scope.getByRole('button',{name:'Misaligned',exact:true}).click();
 assert.equal(await scope.locator('.network-detail').count(),0);
 assert.equal(await scope.locator('.network-profile-slot').count(),1);
 await scope.getByRole('button',{name:'All connections',exact:true}).click();
 await scope.getByRole('combobox',{name:'Profile type'}).selectOption('All profiles');
 await scope.locator('.network-profile-slot').first().focus();await page.keyboard.press('Enter');
 assert.equal(await scope.locator('.network-detail').count(),1);
 assert.equal(await scope.getByRole('button',{name:'View in Networks'}).count(),0);
 await scope.screenshot({path:'network-desktop.png'});
 await page.setViewportSize({width:390,height:844});
 await scope.screenshot({path:'network-mobile.png'});
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
 assert.deepEqual(errors,[]);
 console.log('PASS: all four placeholder previews, combined alignment/type filters, close/reset, keyboard activation, mobile overflow and runtime errors.');
}finally{await browser.close()}
