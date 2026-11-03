import {createRequire} from 'node:module';
import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
process.env.PLAYWRIGHT_BROWSERS_PATH='C:/Users/Neo/Downloads/labyrinth-main (1)/labyrinth-home-recovery/.practice-qa/browsers';
const require=createRequire('C:/Users/Neo/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/package.json');
const {chromium}=require('playwright');
const data=JSON.parse(readFileSync('app/crab-organization-logistics.json'));
assert.equal(new Set(data.routes.map(r=>r.id)).size,data.routes.length);
for(const r of data.routes){assert(data.sources.some(s=>s.id===r.source));assert(r.organizations.length);assert(r.activities.length);assert(r.note);}
for(const f of ['Land','Sea','Air'])assert(data.routes.filter(r=>r.family===f).length>=2);
const browser=await chromium.launch({headless:true,args:['--enable-webgl','--ignore-gpu-blocklist','--use-angle=swiftshader']});
try{
 const page=await browser.newPage({viewport:{width:1440,height:1000}});page.setDefaultTimeout(60000);const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:5212/?entry=SP-001#crab-category-transport');
 if(process.env.CHECK_LIVE_GLOBE)await page.locator('.gm-loading').waitFor({state:'hidden'});
 await page.getByRole('button',{name:'Subject & data',exact:true}).click();await page.getByRole('button',{name:'Human logistics',exact:true}).click();
 const panel=page.locator('.gm-logistics-evidence');
 const count=async n=>panel.getByText(`${n} plots visible · ${n} match your filters`,{exact:true}).waitFor();
 await count(17);
 await page.getByLabel('Logistics Organization',{exact:true}).selectOption('Mariscadoras / Blueat');await count(5);
 await panel.getByRole('button',{name:'Acquisition',exact:true}).click();await count(3);
 await panel.getByRole('button',{name:'Reset filters',exact:true}).click();
 for(const f of ['Land','Sea','Air']){await page.getByLabel('Logistics Transport family',{exact:true}).selectOption(f);await count(data.routes.filter(r=>r.family===f).length);}
 await panel.getByRole('button',{name:'Hide matching plots',exact:true}).click();await panel.getByText('0 plots visible · 2 match your filters',{exact:true}).waitFor();
 await panel.getByRole('button',{name:'Show all matching plots',exact:true}).click();await count(2);
 await panel.getByRole('button',{name:'Reset filters',exact:true}).click();
 await page.getByLabel('Logistics Organization',{exact:true}).selectOption('ZIM');await count(1);await panel.getByRole('button',{name:'Evidence',exact:true}).click();await panel.getByText(/Manifest sample explicitly names/).waitFor();
 await panel.getByRole('button',{name:'Trade context',exact:true}).click();await count(21);
 await panel.getByRole('button',{name:'Organizations',exact:true}).click();await count(17);
 await page.screenshot({path:'.practice-qa/organization-logistics.png'});
 assert.deepEqual(errors,[]);console.log('PASS: source integrity; organization/activity intersections; land/sea/air; visibility; evidence; isolated trade context; no runtime errors');
}finally{await browser.close()}
