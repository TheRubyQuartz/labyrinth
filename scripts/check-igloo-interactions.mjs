import {createRequire} from 'node:module';import fs from 'node:fs';import path from 'node:path';import assert from 'node:assert/strict';
const require=createRequire('C:/Users/Neo/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/package.json');process.env.PLAYWRIGHT_BROWSERS_PATH=path.resolve('.practice-qa/browsers');const {chromium}=require('playwright');
const browser=await chromium.launch({headless:true,args:['--enable-unsafe-swiftshader']});
try{for(const mobile of [false,true]){
const p=await browser.newPage({viewport:mobile?{width:390,height:844}:{width:1200,height:800},isMobile:mobile,hasTouch:mobile});const errors=[];p.on('pageerror',e=>errors.push(e.message));
await p.route('**/App3D-*.js',r=>r.fulfill({contentType:'application/javascript',body:fs.readFileSync('public/reference/igloo-complete/assets/App3D-d68cb154.js','utf8').replace('class jF{constructor(e){','class jF{constructor(e){window.__referenceAudit=this;window.__referenceConfig=Be;')}));
await p.goto('http://127.0.0.1:5205/');await p.locator('[data-scene-ready="true"]').waitFor({timeout:60000});const f=p.frames().find(f=>f!==p.mainFrame());await p.waitForTimeout(2500);
if(!mobile){
await p.waitForTimeout(4000);await p.mouse.move(100,743);await p.waitForTimeout(1000);await p.mouse.click(100,743);await p.waitForTimeout(1000);assert.equal(await f.evaluate(()=>window.__referenceAudit.audioController._controller.muted),false,'Sound toggle');
await f.evaluate(()=>window.__referenceAudit.centerDetailScene(0));await p.waitForTimeout(1800);await p.mouse.move(600,400);await p.waitForTimeout(1000);await p.mouse.click(600,400);await p.waitForTimeout(2500);
assert.equal(await f.evaluate(()=>window.__referenceAudit.isDetailOpen),true,'Project click opens detail');await p.screenshot({path:'.practice-qa/igloo-complete/project-detail.png'});
await f.waitForFunction(()=>window.__referenceAudit.currentSection!=='home');await f.evaluate(()=>window.__referenceAudit.navigateToSection('home'));await f.waitForFunction(()=>!window.__referenceAudit.isDetailOpen);
}else{await p.screenshot({path:'.practice-qa/igloo-complete/mobile.png'});await p.getByRole('button',{name:'LABYRINTH'}).click();await p.getByRole('dialog').waitFor();await p.getByRole('button',{name:'Close destinations'}).click();}
assert.deepEqual(errors,[]);console.log(mobile?'PASS mobile scene and destinations':'PASS project click/detail/return and sound toggle');await p.close();
}}finally{await browser.close()}
