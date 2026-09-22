import {chromium} from 'file:///C:/Users/Neo/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'msedge',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
try{
 await page.goto('http://127.0.0.1:5202/?entry=SP-001#crab-group-overview-2');
 const lab=page.locator('.evo-observatory');await lab.waitFor();
 const hide=page.getByRole('button',{name:'Hide player',exact:true});if(await hide.count())await hide.click();
 await lab.scrollIntoViewIfNeeded();assert.equal(await lab.locator('[data-node]').count(),12);
 await lab.getByRole('searchbox').fill('megalopa');assert.equal(await lab.locator('.evo-milestone-strip button').count(),1);await lab.locator('.evo-milestone-strip button').click();await page.waitForTimeout(450);assert.match(await lab.locator('.evo-inspector h4').innerText(),/Megalopa/);
 await lab.getByRole('searchbox').fill('');await lab.getByRole('combobox',{name:'Evidence type'}).selectOption('Fossil');assert.equal(await lab.locator('.evo-milestone-strip button').count(),6);await lab.getByRole('combobox',{name:'Evidence type'}).selectOption('All evidence');
 for(let i=0;i<12;i++){await lab.locator('.evo-milestone-strip button').nth(i).click();assert.ok((await lab.locator('.evo-inspector p').innerText()).length>100)}
 await lab.getByRole('button',{name:'Previous milestone',exact:true}).click();await lab.getByRole('combobox',{name:'Journey reading pace'}).selectOption('5');await lab.getByRole('button',{name:'▷ Play journey',exact:true}).click();await page.waitForTimeout(5300);assert.match(await lab.locator('.evo-inspector h4').innerText(),/Callinectes/);await lab.getByRole('button',{name:'Ⅱ Pause journey',exact:true}).click();
 await lab.getByRole('button',{name:'Expand timeline',exact:true}).click();await page.getByRole('dialog').waitFor();await lab.getByRole('button',{name:'Close expanded timeline',exact:true}).click();assert.equal(await page.getByRole('dialog').count(),0);
 await lab.getByRole('button',{name:'Last 66 Ma',exact:true}).click();await page.waitForTimeout(450);const before=await lab.locator('.evo-options>span').innerText();const graph=lab.locator('.evo-canvas');await graph.scrollIntoViewIfNeeded();let box=await graph.boundingBox();await page.mouse.move(box.x+box.width*.4,box.y+box.height*.8);await page.mouse.down();await page.mouse.move(box.x+box.width*.6,box.y+box.height*.8,{steps:12});await page.mouse.up();await page.waitForTimeout(100);assert.notEqual(await lab.locator('.evo-options>span').innerText(),before);
 await lab.getByRole('button',{name:'Reset',exact:true}).click();await page.waitForTimeout(450);await lab.getByRole('checkbox',{name:'Fossil evidence lane'}).uncheck();assert.equal(await lab.locator('[data-node]').count(),9);await lab.getByRole('checkbox',{name:'Fossil evidence lane'}).check();
 const download=page.waitForEvent('download');await lab.getByRole('button',{name:'Download evidence CSV'}).click();assert.equal((await download).suggestedFilename(),'blue-crab-evolution-evidence.csv');
 await lab.getByText('Compare milestones & inspect the chronological data',{exact:true}).click();await lab.getByRole('combobox',{name:'Comparison milestone'}).selectOption('deep');await lab.getByRole('button',{name:'Frame both on graph'}).click();await page.waitForTimeout(450);assert.equal(await lab.locator('.evo-comparison-table tbody tr').count(),5);
 await lab.getByText('Compare milestones & inspect the chronological data',{exact:true}).click();await lab.getByRole('button',{name:'Reset',exact:true}).click();await page.waitForTimeout(450);await lab.screenshot({path:'evolution-desktop.png'});
 await page.setViewportSize({width:390,height:844});await lab.screenshot({path:'evolution-mobile.png'});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
 await lab.getByRole('button',{name:'Last 66 Ma',exact:true}).click();await page.waitForTimeout(450);await graph.focus();await page.keyboard.press('ArrowLeft');await page.waitForTimeout(450);assert.notEqual(await lab.locator('.evo-options>span').innerText(),'66.0 → 0.0 Ma');
 
 await lab.getByRole('button',{name:'Reset',exact:true}).click();await page.waitForTimeout(450);
 const handle=lab.locator('[data-boundary="old"]');await handle.scrollIntoViewIfNeeded();const h=await handle.boundingBox();await page.mouse.move(h.x+h.width/2,h.y+h.height/2);await page.mouse.down();await page.mouse.move(h.x+70,h.y+h.height/2,{steps:8});await page.mouse.up();await page.waitForTimeout(100);assert.notEqual(await lab.locator('.evo-options>span').innerText(),'520.0 → 0.0 Ma');
 await lab.getByRole('button',{name:'Last 66 Ma',exact:true}).click();await page.waitForTimeout(450);await graph.scrollIntoViewIfNeeded();
 await graph.evaluate(el=>{const r=el.getBoundingClientRect();el.setPointerCapture=()=>{};el.hasPointerCapture=()=>false;const fire=(type,id,x)=>el.dispatchEvent(new PointerEvent(type,{bubbles:true,pointerId:id,pointerType:'touch',button:0,clientX:r.x+x,clientY:r.y+100}));fire('pointerdown',11,100);fire('pointerdown',12,150);fire('pointermove',12,200);fire('pointerup',12,200);fire('pointermove',11,110);fire('pointerup',11,110)});
 await page.waitForTimeout(100);assert.notEqual(await lab.locator('.evo-options>span').innerText(),'66.0 → 0.0 Ma');
 await page.emulateMedia({reducedMotion:'reduce'});await lab.getByRole('button',{name:'All time',exact:true}).click();await page.waitForTimeout(40);assert.equal(await lab.locator('.evo-options>span').innerText(),'520.0 → 0.0 Ma');
 assert.deepEqual(errors,[]);console.log('PASS: 12 milestones, search, evidence filters, journey playback, expansion, drag, layer toggle, CSV, comparison, mobile overflow and keyboard navigation.');
}finally{await browser.close()}
