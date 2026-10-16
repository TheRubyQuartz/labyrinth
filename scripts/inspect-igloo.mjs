import {createRequire} from 'node:module';
import fs from 'node:fs';import path from 'node:path';
const require=createRequire('C:/Users/Neo/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/package.json');
process.env.PLAYWRIGHT_BROWSERS_PATH=path.resolve('.practice-qa/browsers');
const {chromium}=require('playwright');const dir='.practice-qa/igloo-motion';fs.mkdirSync(dir,{recursive:true});
const browser=await chromium.launch({headless:true,args:['--enable-unsafe-swiftshader']});
try{const page=await browser.newPage({viewport:{width:1440,height:900}});await page.goto('https://www.igloo.inc/',{waitUntil:'domcontentloaded',timeout:60000});for(let i=0;i<8;i++){await page.waitForTimeout(1200);await page.screenshot({path:`${dir}/intro-${i}.png`});}console.log((await page.locator('body').innerText()).slice(0,4000));for(let i=0;i<8;i++){await page.mouse.wheel(0,700);await page.waitForTimeout(1800);await page.screenshot({path:`${dir}/scroll-${i}.png`});}console.log('Captured introduction and eight scroll states.')}finally{await browser.close()}
