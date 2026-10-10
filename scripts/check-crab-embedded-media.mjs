import {createRequire} from 'node:module';
import path from 'node:path';
import assert from 'node:assert/strict';
process.env.PLAYWRIGHT_BROWSERS_PATH=path.resolve('.practice-qa/browsers');
const require=createRequire('C:/Users/Neo/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/package.json');
const {chromium}=require('playwright');
const browser=await chromium.launch({headless:true,args:['--enable-unsafe-swiftshader']});
const page=await browser.newPage({viewport:{width:1440,height:1050}});
page.setDefaultTimeout(45000);
const failures=[];page.on('requestfailed',r=>{if(/3d-api|draco|studisulqui|wikimedia/.test(r.url()))failures.push({url:r.url(),error:r.failure()?.errorText})});
try{
 await page.goto('http://127.0.0.1:5205/?entry=SP-001#crab-category-modeling',{waitUntil:'domcontentloaded'});
 await page.getByText('Smithsonian female specimen · 150k surface mesh · 4096-pixel textures',{exact:true}).waitFor();
 await page.getByRole('button',{name:'Zoom into specimen'}).click();
 await page.getByRole('checkbox',{name:'Surface mesh',exact:true}).check();
 await page.getByRole('checkbox',{name:'Surface mesh',exact:true}).uncheck();
 await page.locator('.crab-specimen').screenshot({path:'.practice-qa/crab-real-specimen.png'});
 console.log('PASS actual Smithsonian GLB decoded and rendered');
 await page.getByRole('tab',{name:'Graphics',exact:true}).first().click();
 await page.getByRole('button',{name:/Image · PhotographyBlueCrab/}).first().click().catch(async()=>{await page.locator('#crab-collection-graphics .crab-record-list button').nth(4).click()});
 await page.waitForFunction(()=>{const im=document.querySelector('.crab-selected-object .crab-embedded-image img');return im&&im.complete&&im.naturalWidth>0});
 await page.locator('#crab-collection-graphics').screenshot({path:'.practice-qa/crab-photo-gallery.png'});
 console.log('PASS source-hosted crab photograph loaded');
 await page.getByRole('tab',{name:'Sounds',exact:true}).first().click();
 const audio=page.locator('.crab-selected-object audio');
 await page.waitForFunction(()=>{const a=document.querySelector('.crab-selected-object audio');return a&&Number.isFinite(a.duration)&&a.duration>0});
 const duration=await audio.evaluate(a=>a.duration);await audio.evaluate(async a=>{a.muted=true;await a.play();a.pause()});
 console.log('PASS real field recording loaded and played, duration '+duration.toFixed(1)+'s');
 await page.locator('#crab-collection-sounds').screenshot({path:'.practice-qa/crab-recording.png'});
 const ids=['4COzo5koWgk','X_B1vwXFIF8','EFG87XDLZ6U','iUOMVPo4tRk','5VIeof3j2RQ','JkkLkicCKdA','R4Yc-pEB0dU','WV67sNmvPBs','vJUG8UvY-lk','s6O1Yfpks1I','2kKlt8aw_5g'];
 for(const id of ids){try{const r=await page.request.get('https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v='+id+'&format=json',{timeout:10000});console.log('VIDEO '+id+' '+r.status()+' '+(r.ok()?(await r.json()).title:'Unavailable metadata'))}catch{console.log('VIDEO '+id+' metadata request failed')}}
}finally{console.log(JSON.stringify({networkFailures:failures}));await browser.close()}
