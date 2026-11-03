import {createRequire} from 'node:module';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
process.env.PLAYWRIGHT_BROWSERS_PATH='C:/Users/Neo/Downloads/labyrinth-main (1)/labyrinth-home-recovery/.practice-qa/browsers';
const require=createRequire('C:/Users/Neo/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/package.json');
const {chromium}=require('playwright');
const b=await chromium.launch({headless:true,args:['--enable-webgl','--ignore-gpu-blocklist','--use-angle=swiftshader']});
try{
 const p=await b.newPage();const errors=[];p.on('pageerror',e=>errors.push(e.message));p.setDefaultTimeout(30000);
 for(const [id,name]of [['SP-001','Blue crab'],['SP-002','Eastern oyster'],['HB-001','Tangier Sound grass habitat'],['HB-002','Choptank mouth grass habitat'],['AS-001','Cambridge monitoring station'],['AS-002','Solomons Island monitoring station']]){
 await p.goto('http://127.0.0.1:5212/?entry='+id+'#'+(id==='SP-001'?'crab-category-transport':'movement'));
 await p.locator('.gm-subject-list').waitFor();
 assert.equal(await p.locator('.gm-subject-list label').count(),1);
 assert((await p.locator('.gm-subject-list').innerText()).includes(name));
 assert.equal(await p.locator('.gm-subject-list input').isChecked(),true);
 if(id!=='SP-001'){assert.equal(await p.locator('.gm-crab-evidence').count(),0);assert.equal(await p.locator('.gm-route-list button').count(),0);assert(await p.locator('.gm-subjects .metric-history').isVisible());}
 console.log(id+' scoped map: PASS');
 }
 const source=readFileSync('public/reference/igloo-complete/labyrinth-scenes.js','utf8');
 for(const label of ['Find a region','Find a species','Find an item'])assert(source.includes(label));
 assert.deepEqual(errors,[]);
 console.log('All six subject maps, homepage categories, no runtime errors: PASS');
}finally{await b.close()}
