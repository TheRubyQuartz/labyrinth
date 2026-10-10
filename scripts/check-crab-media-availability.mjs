import {createRequire} from 'node:module';
import path from 'node:path';
process.env.PLAYWRIGHT_BROWSERS_PATH=path.resolve('.practice-qa/browsers');
const require=createRequire('C:/Users/Neo/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/package.json');
const {chromium}=require('playwright');
const browser=await chromium.launch({headless:true,args:['--enable-unsafe-swiftshader']});
const page=await browser.newPage({viewport:{width:1440,height:1050}});
page.setDefaultTimeout(15000);
const results=[];
async function check(name,run){try{const detail=await run();results.push({name,status:'PASS',detail});console.log('PASS '+name+' '+(detail||''))}catch(error){results.push({name,status:'FAIL',error:error.message.split('\n')[0]});console.log('FAIL '+name+' '+error.message.split('\n')[0])}}
try{
 await page.goto('http://127.0.0.1:5205/?entry=SP-001',{waitUntil:'domcontentloaded'});
 await check('local photographs',async()=>{
  await page.getByRole('tab',{name:'Graphics',exact:true}).first().click();
  await page.locator('#crab-collection-graphics .crab-record-list button').filter({has:page.locator('img[src*="crab-collection/image-"]')}).first().click();
  await page.waitForFunction(()=>{const im=document.querySelector('.crab-selected-object .crab-embedded-image img');return im&&im.complete&&im.naturalWidth>0});
  await page.getByLabel('Image zoom',{exact:true}).fill('2');
  await page.locator('.crab-selected-object').screenshot({path:'.practice-qa/crab-photo-gallery.png'});
  return await page.locator('.crab-selected-object img').getAttribute('src');
 });
 await check('field recording playback',async()=>{
  await page.getByRole('tab',{name:'Sounds',exact:true}).first().click();
  const audio=page.locator('.crab-selected-object audio');
  await page.waitForFunction(()=>{const a=document.querySelector('.crab-selected-object audio');return a&&Number.isFinite(a.duration)&&a.duration>0},{},{timeout:20000});
  const duration=await audio.evaluate(a=>a.duration);await audio.evaluate(async a=>{a.muted=true;await a.play();a.pause()});
  await page.locator('.crab-selected-object').screenshot({path:'.practice-qa/crab-recording.png'});
  return duration.toFixed(1)+' seconds';
 });
 await check('Smithsonian specimen',async()=>{
  await page.getByRole('tab',{name:'Models',exact:true}).first().click();
  await page.getByText('Smithsonian female specimen · 150k surface mesh · 4096-pixel textures',{exact:true}).waitFor({timeout:12000});
  await page.getByRole('button',{name:'Zoom into specimen'}).click();
 });
 const ids=['4COzo5koWgk','X_B1vwXFIF8','EFG87XDLZ6U','iUOMVPo4tRk','5VIeof3j2RQ','JkkLkicCKdA','R4Yc-pEB0dU','WV67sNmvPBs','vJUG8UvY-lk','6TIJp2eUlqE','2kKlt8aw_5g'];
 for(const id of ids)await check('video metadata '+id,async()=>{const r=await page.request.get('https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v='+id+'&format=json',{timeout:8000});if(!r.ok())throw Error('HTTP '+r.status());return (await r.json()).title});
}finally{console.log(JSON.stringify(results,null,2));await browser.close()}
if(results.some(r=>r.status==='FAIL'))process.exitCode=1;
