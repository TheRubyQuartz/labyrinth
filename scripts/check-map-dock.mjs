import {createRequire} from 'node:module';
import assert from 'node:assert/strict';
process.env.PLAYWRIGHT_BROWSERS_PATH='C:/Users/Neo/Downloads/labyrinth-main (1)/labyrinth-home-recovery/.practice-qa/browsers';
const require=createRequire('C:/Users/Neo/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/package.json');const {chromium}=require('playwright');
const b=await chromium.launch({headless:true,args:['--enable-webgl','--ignore-gpu-blocklist','--use-angle=swiftshader']});
try{
 const p=await b.newPage({viewport:{width:1440,height:1000}});const errors=[];p.on('pageerror',e=>errors.push(e.message));p.setDefaultTimeout(90000);
 await p.goto('http://127.0.0.1:5212/?view=map');await p.locator('.gm-console').scrollIntoViewIfNeeded();
 await p.locator('.gm-subject-list label').filter({hasText:'Blue crab'}).getByRole('checkbox').check();await p.getByText('40,388',{exact:true}).waitFor();
 await p.locator('.gm-console').evaluate(el=>el.scrollIntoView({block:'start'}));
 const before=await p.locator('.gm-stage').boundingBox();await p.locator('.gm-dock-content').evaluate(el=>el.scrollTop=el.scrollHeight);
 const after=await p.locator('.gm-stage').boundingBox();assert.equal(Math.round(before.y),Math.round(after.y));assert(before.x+before.width<=(await p.locator('.gm-control-dock').boundingBox()).x);
 await p.getByRole('navigation',{name:'Subject control shortcuts'}).getByRole('button',{name:'Population',exact:true}).click();await p.getByText('349 million',{exact:true}).waitFor();assert.equal(Math.round((await p.locator('.gm-stage').boundingBox()).y),Math.round(before.y));await p.getByRole('navigation',{name:'Subject control shortcuts'}).getByRole('button',{name:'Movement',exact:true}).click();await p.getByRole('navigation',{name:'Subject control shortcuts'}).getByRole('button',{name:'Dates & data',exact:true}).click();await p.getByText('40,388',{exact:true}).waitFor();assert.equal(Math.round((await p.locator('.gm-stage').boundingBox()).y),Math.round(before.y));
 await p.getByRole('button',{name:'Tools',exact:true}).click();await p.getByRole('button',{name:'Environment',exact:true}).click();await p.getByRole('button',{name:'Subjects & filters',exact:true}).click();assert(await p.locator('.gm-subject-list label').filter({hasText:'Blue crab'}).getByRole('checkbox').isChecked());
 await p.locator('.gm-dock-content').evaluate(el=>el.scrollTop=0);await p.screenshot({path:'.practice-qa/map-dock-desktop.png'});
 await p.setViewportSize({width:390,height:844});await p.locator('.gm-console').evaluate(el=>el.scrollIntoView({block:'start'}));
 const mobileBefore=await p.locator('.gm-stage').boundingBox();await p.locator('.gm-dock-content').evaluate(el=>el.scrollTop=el.scrollHeight);const mobileAfter=await p.locator('.gm-stage').boundingBox();assert.equal(Math.round(mobileBefore.y),Math.round(mobileAfter.y));assert(mobileAfter.y>=-1&&mobileAfter.y+mobileAfter.height<844);assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
 await p.screenshot({path:'.practice-qa/map-dock-mobile.png'});assert.deepEqual(errors,[]);console.log('Desktop side panel, mobile split panel, stationary map while filtering, retained subject state, no overflow/runtime errors: PASS');
}finally{await b.close()}
