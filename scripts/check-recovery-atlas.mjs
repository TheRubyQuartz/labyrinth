import {chromium} from 'file:///C:/Users/Neo/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'msedge',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000}});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
try{
 await page.goto('http://127.0.0.1:5202/?entry=SP-001#crab-world-map');
 const map=page.locator('.spatial-map-canvas');await map.waitFor();await map.scrollIntoViewIfNeeded();
 const section=page.locator('#crab-world-map');
 await section.getByRole('button',{name:'Western Atlantic',exact:true}).click();await page.waitForTimeout(500);
 assert.match(await section.locator('.atlas-camera-controls').innerText(),/2.0×/);
 let box=await map.boundingBox();await page.mouse.click(box.x+box.width*.55,box.y+box.height*.45);await page.mouse.wheel(0,-120);await page.waitForTimeout(500);
 assert.match(await section.locator('.atlas-camera-controls').innerText(),/2.7×/);
 const before=await section.locator('.atlas-map-status').innerText();await page.mouse.move(box.x+box.width*.5,box.y+box.height*.5);await page.mouse.down();await page.mouse.move(box.x+box.width*.65,box.y+box.height*.6,{steps:15});await page.mouse.up();await page.waitForTimeout(700);
 assert.notEqual(await section.locator('.atlas-map-status').innerText(),before);
 await section.getByRole('button',{name:'Expand map workspace'}).click();await page.getByRole('dialog').waitFor();await page.getByRole('button',{name:'Return map to normal size'}).click();
 await section.getByRole('searchbox').fill('Adriatic');assert.equal(await section.locator('.atlas-record-list button').count(),1);await section.locator('.atlas-record-list button').click();await page.waitForTimeout(500);assert.match(await section.locator('.atlas-selected h4').innerText(),/Adriatic/);
 await section.getByRole('searchbox').fill('');await section.screenshot({path:'atlas-recovery-desktop.png'});
 await page.setViewportSize({width:390,height:844});await map.scrollIntoViewIfNeeded();assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth),true);await section.screenshot({path:'atlas-recovery-mobile.png'});
 // Two contact points exercise pinch and pinch-to-drag handoff.
const initial=await section.locator('.atlas-camera-controls').innerText();
await map.evaluate(el=>{const r=el.getBoundingClientRect();const fire=(type,id,x,y)=>el.dispatchEvent(new PointerEvent(type,{bubbles:true,pointerId:id,pointerType:'touch',button:0,clientX:r.x+x,clientY:r.y+y}));el.setPointerCapture=()=>{};el.hasPointerCapture=()=>false;fire('pointerdown',11,100,80);fire('pointerdown',12,200,80);fire('pointermove',12,240,80);fire('pointerup',12,240,80);fire('pointermove',11,110,90);fire('pointerup',11,110,90)});
await page.waitForTimeout(500);assert.notEqual(await section.locator('.atlas-camera-controls').innerText(),initial);
assert.deepEqual(errors,[]);console.log('PASS: region travel, focused wheel zoom, drag, expanded workspace, search, selection, mobile overflow, no page errors.');
}finally{await browser.close()}
