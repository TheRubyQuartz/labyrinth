import {createRequire} from 'node:module';
process.env.PLAYWRIGHT_BROWSERS_PATH='C:/Users/Neo/Downloads/labyrinth-main (1)/labyrinth-home-recovery/.practice-qa/browsers';
const require=createRequire('C:/Users/Neo/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/package.json');
const {chromium}=require('playwright');const b=await chromium.launch({headless:true});
try{const p=await b.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
for(const query of ['view=archive','entry=SP-001','entry=SP-002','view=map','view=marketplace','view=news']){
 await p.goto('http://127.0.0.1:5212/?'+query);await p.locator('.xr-app').waitFor();await p.waitForTimeout(700);
 console.log(query,await p.locator('.xr-app').evaluate(e=>({background:getComputedStyle(e).backgroundColor,accent:getComputedStyle(e).getPropertyValue('--site-accent')})));
 console.log('Green UI',await p.locator('.xr-app').evaluate(root=>[...root.querySelectorAll('*')].filter(e=>{const c=getComputedStyle(e).backgroundColor.match(/[\d.]+/g)?.map(Number);return c&&c[1]>c[0]*1.1&&c[1]>c[2]*1.1&&e.getBoundingClientRect().width>20}).map(e=>e.className).filter(x=>typeof x==='string').slice(0,25)));
 await p.screenshot({path:'.practice-qa/theme-'+query.replace('=','-')+'.png'});
}
}finally{await b.close()}
