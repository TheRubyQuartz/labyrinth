import {createRequire} from 'node:module';
process.env.PLAYWRIGHT_BROWSERS_PATH='C:/Users/Neo/Downloads/labyrinth-main (1)/labyrinth-home-recovery/.practice-qa/browsers';
const require=createRequire('C:/Users/Neo/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/package.json');
const {chromium}=require('playwright');const b=await chromium.launch({headless:true});
try{const p=await b.newPage({viewport:{width:1440,height:1000}});for(const [name,url] of [['apple','https://www.apple.com/store'],['ecosia','https://blog.ecosia.org/']]){await p.goto(url,{waitUntil:'domcontentloaded',timeout:60000});await p.waitForTimeout(2000);console.log(name,await p.locator('h1,h2,h3,nav').allTextContents());await p.screenshot({path:'.practice-qa/'+name+'-live.png'});await p.evaluate(()=>scrollTo(0,850));await p.screenshot({path:'.practice-qa/'+name+'-scroll.png'});}}finally{await b.close()}
