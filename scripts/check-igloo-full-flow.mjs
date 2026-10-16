import {createRequire} from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const require=createRequire('C:/Users/Neo/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/package.json');
process.env.PLAYWRIGHT_BROWSERS_PATH=path.resolve('.practice-qa/browsers');
const {chromium}=require('playwright'),out='.practice-qa/igloo-complete';fs.mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true,args:['--enable-unsafe-swiftshader']});
try{
 const page=await browser.newPage({viewport:{width:1200,height:800}}),errors=[],failed=[],remote=[],states=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)failed.push(r.url())});
 await page.route('https://**/*',route=>{remote.push(route.request().url());return route.abort()});
 await page.route('**/App3D-*.js',route=>{const source=fs.readFileSync('public/reference/igloo-complete/assets/App3D-d68cb154.js','utf8').replace('class jF{constructor(e){','class jF{constructor(e){window.__referenceAudit=this;');return route.fulfill({contentType:'application/javascript',body:source})});
 await page.goto('http://127.0.0.1:5205/');
 await page.locator('[data-scene-ready="true"]').waitFor({timeout:60000});
 const frame=page.frames().find(f=>f!==page.mainFrame());assert(frame);
 const state=()=>frame.evaluate(()=>{const c=window.__referenceAudit;return{scroll:c.scroll.y,detail:c.isDetailOpen,index:c.detailIndex,scenes:c.scrollComposers.map(p=>({name:p.passes[0].scene.constructor.name,progress:p.passes[0].scene.progress,visible:p.passes[0].scene.isSceneVisible}))}});
 await page.mouse.move(10,790);await page.waitForTimeout(3000);states.push(await state());await page.screenshot({path:out+'/00-opening.png'});
 for(let i=1;i<=22;i++){
  await page.mouse.move(600,400);await page.mouse.wheel(0,750);await page.waitForTimeout(1100);
  const s=await state();states.push(s);console.log(i,JSON.stringify(s));
  if([4,7,10,13,16,19,22].includes(i))await page.screenshot({path:`${out}/${String(i).padStart(2,'0')}-flow.png`});
 }
 await page.getByRole('button',{name:'LABYRINTH'}).click();await page.getByRole('dialog').waitFor();assert.equal(await page.getByRole('navigation',{name:'Labyrinth destinations'}).getByRole('link').count(),4);await page.screenshot({path:out+'/destinations.png'});
 const report={errors,failed,remote,states};fs.writeFileSync(out+'/full-flow-report.json',JSON.stringify(report,null,2));
 assert.equal(errors.length,0);assert.equal(failed.length,0);assert.equal(remote.length,0);assert(states.some(s=>s.scenes[1].visible));assert(states.some(s=>s.scenes[2].visible));
 console.log('PASS: all three scene systems reached; assets local; no runtime or network errors.');
}finally{await browser.close()}
