import {createRequire} from 'node:module';
import assert from 'node:assert/strict';
process.env.PLAYWRIGHT_BROWSERS_PATH='C:/Users/Neo/Downloads/labyrinth-main (1)/labyrinth-home-recovery/.practice-qa/browsers';
const require=createRequire('C:/Users/Neo/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/package.json');
const {chromium}=require('playwright');
const browser=await chromium.launch({headless:true,args:['--enable-webgl','--ignore-gpu-blocklist','--use-angle=swiftshader']});
try{
 const p=await browser.newPage({viewport:{width:1440,height:1050}});p.setDefaultTimeout(60000);
 const errors=[];p.on('pageerror',e=>{errors.push(e.message);console.log('JS ERROR',e.message)});
 await p.goto('http://127.0.0.1:5212/?view=map');
 await p.waitForFunction(()=>!Array.from(document.querySelectorAll('button')).find(b=>b.textContent==='Save viewpoint')?.disabled,null,{timeout:90000});
 await p.getByRole('button',{name:'All tools',exact:true}).click();
 await p.getByLabel('Map projection').selectOption('2D');await p.getByLabel('Map projection').selectOption('Oblique');await p.getByLabel('Map projection').selectOption('3D');
 await p.getByLabel('Terrain contours',{exact:true}).check();await p.getByLabel('Terrain contours',{exact:true}).uncheck();console.log('projections and contour controls passed');
 const canvas=p.locator('.gm-canvas canvas').first();await canvas.scrollIntoViewIfNeeded();const box=await canvas.boundingBox();await canvas.click({position:{x:box.width/2,y:box.height/2}});
 await p.getByLabel('Field note',{exact:true}).fill('Test geographic annotation');await p.getByRole('button',{name:'Pin note here',exact:true}).click();await p.getByText('Test geographic annotation',{exact:true}).waitFor();await p.getByRole('button',{name:'Delete note',exact:true}).click();
 await p.getByRole('button',{name:'Use inspected location',exact:true}).click();await p.getByText(/visible observation records within/).waitFor();await p.getByRole('button',{name:'Remove study area',exact:true}).click();console.log('field notes and study area passed');
 await p.getByLabel('Import timestamped track').setInputFiles({name:'track.geojson',mimeType:'application/geo+json',buffer:Buffer.from(JSON.stringify({type:'Feature',geometry:{type:'LineString',coordinates:[[-76,38],[-76.1,38.2]]},properties:{times:['2020-01-01T00:00:00Z','2020-01-01T01:00:00Z']}}))});
 await p.getByText(/2 timestamped fixes/).waitFor();await p.getByRole('button',{name:'Play track',exact:true}).click();await p.getByRole('button',{name:'Pause track',exact:true}).click();await p.getByLabel('Track playback time').fill(String(Date.parse('2020-01-01T00:30:00Z')));await p.getByRole('button',{name:'Remove track',exact:true}).click();console.log('timestamped track import, replay and scrub passed');
 await p.getByLabel('Environmental map layer').selectOption('MODIS_Aqua_L2_Chlorophyll_A');await p.getByLabel('Compare dates side by side').check();await p.getByLabel('Imagery comparison divider').fill('0.35');await p.getByLabel('Environmental opacity').fill('0.5');await p.getByLabel('Environmental map layer').selectOption('');console.log('dated imagery and comparison controls passed');
 await p.getByLabel('Import local 3D model').setInputFiles('public/world-terrain/everest-gis.glb');await p.getByText(/everest-gis.glb placed at/).waitFor();await p.getByRole('button',{name:'Remove 3D asset',exact:true}).click();console.log('local GLB placement passed');
 await p.getByRole('button',{name:/Add inspected point/}).click();await canvas.scrollIntoViewIfNeeded();await canvas.click({position:{x:box.width/2+30,y:box.height/2}});await p.getByRole('button',{name:/Add inspected point/}).click();const dl=p.waitForEvent('download');await p.getByRole('button',{name:'Export transect GeoJSON',exact:true}).click();assert.equal((await dl).suggestedFilename(),'study-transect.geojson');await p.getByRole('button',{name:'Clear transect',exact:true}).click();console.log('transect and export passed');
 await p.getByRole('button',{name:'Navigate',exact:true}).click();await p.locator('.gm-research-tools').scrollIntoViewIfNeeded();await p.screenshot({path:'.practice-qa/map-expanded-tools.png'});
 await p.setViewportSize({width:390,height:844});await p.getByRole('button',{name:'All tools',exact:true}).click();assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
 assert.deepEqual(errors,[]);console.log('expanded map: PASS, no runtime errors, no mobile overflow');
}finally{await browser.close()}
