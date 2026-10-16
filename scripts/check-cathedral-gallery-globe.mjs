import {createRequire} from 'node:module';
import fs from 'node:fs';import path from 'node:path';
const require=createRequire('C:/Users/Neo/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/package.json');
process.env.PLAYWRIGHT_BROWSERS_PATH=path.resolve('.practice-qa/browsers');
const {chromium}=require('playwright');const browser=await chromium.launch({headless:true,args:['--enable-unsafe-swiftshader']});
const out='.practice-qa/new-scenes';fs.mkdirSync(out,{recursive:true});
try{const page=await browser.newPage({viewport:{width:1200,height:800}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.route('**/App3D-*.js',r=>r.fulfill({contentType:'application/javascript',body:fs.readFileSync('public/reference/igloo-complete/assets/App3D-d68cb154.js','utf8').replace('class jF{constructor(e){','class jF{constructor(e){window.__audit=this;')}));
await page.goto('http://127.0.0.1:5205/');await page.mouse.move(10,450);await page.locator('[data-scene-ready="true"]').waitFor({timeout:120000});await page.waitForTimeout(15000);
const frame=page.frames().find(f=>f!==page.mainFrame());await frame.waitForFunction(()=>window.__audit?.scrollComposers[0].passes[0].scene.igloo.mesh.material.uniforms.uIntroMaterialize.value>=1,{},{timeout:120000});await page.screenshot({path:out+'/cathedral.png'});
console.log(await frame.evaluate(()=>window.__audit.scrollComposers.map(c=>({name:c.passes[0].scene.constructor.name,height:c.passes[0].scene.height}))));
await frame.evaluate(()=>window.__audit.centerScroll(2.75,0));await page.waitForTimeout(7000);await page.screenshot({path:out+'/gallery.png'});
await frame.getByRole('button',{name:'Show Field asset',exact:true}).click();await frame.waitForFunction(()=>Math.abs(window.__audit.scrollComposers[1].passes[0].scene.slide-2)<.01,{},{timeout:60000});await page.screenshot({path:out+'/asset.png'});
console.log('gallery',await frame.evaluate(()=>window.__audit.scrollComposers[1].passes[0].scene.selected));
await frame.evaluate(()=>window.__audit.centerScroll(4.55,0));await page.waitForTimeout(7000);await page.screenshot({path:out+'/globe.png'});
await frame.getByRole('searchbox').fill('Iceland');await frame.locator('.lab-globe-results button').click();await frame.getByRole('button',{name:'+',exact:true}).click();await page.waitForTimeout(4000);await page.screenshot({path:out+'/location.png'});
console.log('location',await frame.locator('.lab-globe-selection').innerText());console.log('errors',errors);if(errors.length)process.exitCode=1;
}finally{await browser.close()}
