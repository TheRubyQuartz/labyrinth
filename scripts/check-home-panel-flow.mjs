import {createRequire} from 'node:module';
import {createServer} from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
process.env.PLAYWRIGHT_BROWSERS_PATH=path.resolve('.practice-qa/browsers');
const require=createRequire('C:/Users/Neo/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/package.json');
const {chromium}=require('playwright');
const root=path.resolve('docs');
const server=createServer((req,res)=>{const file=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));const target=file===root?path.join(root,'index.html'):file;if(!target.startsWith(root+path.sep)||!fs.existsSync(target)||!fs.statSync(target).isFile()){res.writeHead(404).end();return}res.setHeader('Content-Type',({'.js':'text/javascript','.css':'text/css','.html':'text/html','.png':'image/png','.jpg':'image/jpeg','.json':'application/json','.wasm':'application/wasm'})[path.extname(target)]||'application/octet-stream');fs.createReadStream(target).pipe(res)});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const browser=await chromium.launch({headless:true,args:['--enable-unsafe-swiftshader']});
const errors=[];
try{
 for(const width of [1440,390]){
  const page=await browser.newPage({viewport:{width,height:900}});
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:'+server.address().port+'/',{waitUntil:'domcontentloaded'});
  await page.locator('.lh-panel-flow').waitFor();
  assert.equal(await page.locator('.lh-panel-flow>section').count(),8);
  for(const id of ['connections','manifesto','discover','perspectives','fieldnotes','expeditions','fieldkit','connect']){
   const section=page.locator('#'+id);const title=section.locator('h2').first();
   await title.scrollIntoViewIfNeeded();await page.waitForTimeout(400);
   assert(await title.isVisible(),id+' heading hidden');
   const hit=await title.evaluate(el=>{const previous=el.style.pointerEvents;el.style.pointerEvents='auto';const r=el.getBoundingClientRect();const x=Math.max(1,Math.min(innerWidth-2,r.left+r.width/2)),y=Math.max(1,Math.min(innerHeight-2,r.top+r.height/2));const top=document.elementFromPoint(x,y);el.style.pointerEvents=previous;return {visible:top===el||el.contains(top),tag:top?.tagName,class:top?.className,opacity:getComputedStyle(el).opacity}});
   assert(hit.visible,id+' obscured: '+JSON.stringify(hit));
   assert.notEqual(hit.opacity,'0');
   assert(await section.evaluate(el=>el.scrollWidth<=el.clientWidth+2),id+' overflows at '+width);
   if(['manifesto','discover','expeditions'].includes(id))await page.screenshot({path:'.practice-qa/home-rebuilt-'+id+'-'+width+'.png'});
   console.log('PASS '+width+' '+id+' visible, uncovered, fits viewport');
  }
  await page.locator('#discover .lh-filters').getByRole('button',{name:'Species',exact:true}).click();
  assert(await page.locator('#discover .lh-record').count()>0);
  await page.getByRole('button',{name:'Preview Blue crab',exact:true}).click();
  await page.locator('.lh-dialog[open]').waitFor();
  await page.getByRole('button',{name:'Close dialog',exact:true}).click();
  await page.getByRole('button',{name:'Save reading plan',exact:false}).click();
  await page.locator('#expeditions').getByRole('button',{name:'Schedule',exact:true}).click();
  assert.equal(await page.locator('.lh-schedule-row').count(),1);
  await page.locator('#expeditions').getByRole('button',{name:'Complete SP-001',exact:true}).click();
  await page.locator('#expeditions').getByRole('button',{name:'Completed',exact:true}).click();
  assert.equal(await page.locator('.lh-schedule-row').count(),1);
  await page.close();
 }
 assert.deepEqual(errors,[]);console.log('PASS panels, previews and calendar on desktop/mobile; no browser exceptions');
}finally{await browser.close();await new Promise(resolve=>server.close(resolve))}
