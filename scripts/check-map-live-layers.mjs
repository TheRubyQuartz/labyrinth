import {createRequire} from 'node:module';
import assert from 'node:assert/strict';
process.env.PLAYWRIGHT_BROWSERS_PATH='C:/Users/Neo/Downloads/labyrinth-main (1)/labyrinth-home-recovery/.practice-qa/browsers';
const require=createRequire('C:/Users/Neo/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/package.json');const {chromium}=require('playwright');
const b=await chromium.launch({headless:true,args:['--enable-webgl','--ignore-gpu-blocklist','--use-angle=swiftshader']});
try{
 const p=await b.newPage({viewport:{width:1440,height:1000}});p.setDefaultTimeout(90000);const errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto('http://127.0.0.1:5212/?view=map');await p.waitForFunction(()=>!Array.from(document.querySelectorAll('button')).find(b=>b.textContent==='Save viewpoint')?.disabled,null,{timeout:90000});
 await p.getByRole('button',{name:'All tools',exact:true}).click();await p.getByLabel('Global map imagery').selectOption('Satellite');
 await p.getByLabel('Search global places or coordinates').fill('37, -75');await p.getByRole('button',{name:'Fly to',exact:true}).click();await p.waitForFunction(()=>document.querySelector('.gm-hint span')?.textContent?.includes(' km'),null,{timeout:90000});
 const canvas=p.locator('.gm-canvas canvas').first();await canvas.scrollIntoViewIfNeeded();const box=await canvas.boundingBox();await canvas.click({position:{x:box.width/2,y:box.height/2}});
 for(const field of ['Wind','Ocean currents','Waves']){
  await p.getByLabel('Forecast field').selectOption(field);await p.getByRole('button',{name:'Load forecast around inspected point',exact:true}).click();await p.getByText(/Open-Meteo model forecasts loaded/).waitFor();await p.getByLabel('Wind forecast hour').fill('12');console.log(`${field} live map fetch and time change: PASS`);
 }
 await p.getByLabel('Show forecast arrows').uncheck();
 await p.getByRole('button',{name:/Add inspected point/}).click();await canvas.scrollIntoViewIfNeeded();await canvas.click({position:{x:box.width/2+20,y:box.height/2+10}});await p.getByRole('button',{name:/Add inspected point/}).click();await p.getByRole('button',{name:'Sample terrain profile',exact:true}).click();await p.getByText(/Terrain profile sampled at level 8/).waitFor();console.log('real terrain profile: PASS');await p.getByRole('button',{name:'Clear transect',exact:true}).click();
 await p.locator('.gm-subject-list label').filter({hasText:'Blue crab'}).getByRole('checkbox').check();await p.getByText('40,388',{exact:true}).waitFor();await p.getByLabel('Observation aggregation').selectOption('100');await p.getByText(/100 km Mercator-radius hexagons/).waitFor();
 await p.getByRole('button',{name:'Capture selection A',exact:true}).click();await p.getByLabel('Observation country').selectOption('Italy');await p.getByRole('button',{name:'Capture selection B',exact:true}).click();const dl=p.waitForEvent('download');await p.getByRole('button',{name:'Export comparison report',exact:true}).click();assert.equal((await dl).suggestedFilename(),'map-comparison.json');console.log('hex rendering and filtered comparison report: PASS');
 await p.getByLabel('Observation aggregation').selectOption('0');await p.getByRole('button',{name:'Clear subjects',exact:true}).click();
 const png=p.waitForEvent('download');await p.getByRole('button',{name:'Export map image',exact:true}).click();assert.equal((await png).suggestedFilename(),'labyrinth-research-map.png');console.log('attributed map image export: PASS');
 const catalogPage=await b.newPage();await catalogPage.goto('http://127.0.0.1:5212/research/maps/index.html');await catalogPage.getByText('100 of 100 references',{exact:true}).waitFor();assert.equal(await catalogPage.locator('.card').count(),100);assert.equal(await catalogPage.getByText('Coverage limits',{exact:true}).count(),100);console.log('100 source implementation cards: PASS');assert.deepEqual(errors,[]);await catalogPage.close();
}finally{await b.close()}
