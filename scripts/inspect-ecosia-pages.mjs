import {createRequire} from 'node:module';
process.env.PLAYWRIGHT_BROWSERS_PATH='C:/Users/Neo/Downloads/labyrinth-main (1)/labyrinth-home-recovery/.practice-qa/browsers';
const require=createRequire('C:/Users/Neo/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/package.json');
const {chromium}=require('playwright');const browser=await chromium.launch({headless:true});
try{const page=await browser.newPage({viewport:{width:1440,height:1000}});for(const [name,path] of [['home',''],['trees','tag/where-does-ecosia-plant-trees/'],['news','tag/news/'],['newsletter','newsletter/']]){await page.goto('https://blog.ecosia.org/'+path,{waitUntil:'domcontentloaded',timeout:60000});await page.waitForTimeout(1000);console.log(name,await page.locator('h1,h2,h3,nav').allTextContents());await page.screenshot({path:'.practice-qa/ecosia-'+name+'.png',fullPage:false});}}finally{await browser.close()}
