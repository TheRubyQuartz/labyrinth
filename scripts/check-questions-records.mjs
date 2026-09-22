import {chromium} from 'file:///C:/Users/Neo/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'msedge',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[];
page.on('pageerror',e=>errors.push(e.message));
try{
 await page.goto('http://127.0.0.1:5202/?entry=SP-001#connections');
 const hide=page.getByRole('button',{name:'Hide player',exact:true});if(await hide.count())await hide.click();
 const records=page.locator('#connections');
 assert.equal(await records.locator('.connected-record').count(),2);
 assert.deepEqual(await records.locator('.connected-record h4').allTextContents(),['Tangier Sound grass habitat','Solomons Island monitoring station']);
 for(const row of await records.locator('.connected-record').all()){
  await row.getByRole('button',{name:'Quick view'}).click();
  assert.equal(await row.locator('.connected-record-preview').isVisible(),true);
  assert.equal(await row.getByRole('link',{name:'Official monitoring source'}).count(),1);
  const metric=row.getByRole('combobox');
  for(const option of await metric.locator('option').all()){
   const value=await option.getAttribute('value');await metric.selectOption(value);
   assert.equal(await metric.inputValue(),value);
  }
 }
 assert.equal(await records.locator('.connected-record-preview:visible').count(),1);
 await records.screenshot({path:'connected-records-desktop.png'});
 await records.getByRole('link',{name:'Open record'}).first().click();
 await page.waitForURL('**/?entry=HB-001');
 assert.equal(await page.locator('#article-title').innerText(),'Tangier Sound grass habitat');
 await page.goBack();
 const questions=page.locator('#crab-questions'),research=page.locator('#crab-questions-unresolved');
 assert.equal(await questions.locator('.crab-question-card').count(),7);
 const search=questions.getByRole('searchbox');
 await search.fill('consciously');assert.equal(await questions.locator('.crab-question-card').count(),1);
 await search.fill('zzz-no-question');await questions.getByRole('button',{name:'Clear search'}).click();
 assert.equal(await questions.locator('.crab-question-card').count(),7);
 for(const summary of await research.locator('summary').all()){await summary.click()}
 assert.equal(await research.locator('details[open]').count(),3);
 await research.getByRole('button',{name:'Draft a related question'}).first().click();
 const field=questions.getByRole('textbox',{name:'Your question',exact:true});
 assert.match(await field.inputValue(),/nursery habitat/);
 assert.equal(await field.evaluate(el=>el===document.activeElement),true);
 await field.fill('My existing research question must remain intact.');
 await research.getByRole('button',{name:'Draft a related question'}).nth(1).click();
 assert.equal(await field.inputValue(),'My existing research question must remain intact.');
 await questions.getByRole('button',{name:'Preview question',exact:true}).click();
 assert.equal(await questions.getByText('Not submitted',{exact:true}).count(),1);
 await research.getByRole('link',{name:'Explore origins and development'}).click();
 assert.equal(new URL(page.url()).hash,'#crab-group-overview-2');
 assert.equal(await page.locator('#crab-group-overview-2').count(),1);
 await page.evaluate(()=>{location.hash='crab-questions-unresolved'});
 const hideAgain=page.getByRole('button',{name:'Hide player',exact:true});if(await hideAgain.count())await hideAgain.click();
 await research.screenshot({path:'unresolved-desktop.png'});
 await page.setViewportSize({width:390,height:844});
 await research.screenshot({path:'unresolved-mobile.png'});
 await records.screenshot({path:'connected-records-mobile.png'});
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
 assert.deepEqual(errors,[]);
 console.log('PASS: both linked records, source previews, archive navigation/back, all seven questions, search/empty/reset, three research disclosures, draft seeding/focus, existing-draft protection, preview-only submission, mobile overflow and runtime errors.');
}finally{await browser.close()}
