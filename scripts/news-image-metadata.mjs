import {createRequire} from 'node:module';
process.env.PLAYWRIGHT_BROWSERS_PATH='C:/Users/Neo/Downloads/labyrinth-main (1)/labyrinth-home-recovery/.practice-qa/browsers';
const require=createRequire('C:/Users/Neo/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/package.json');
const {chromium}=require('playwright');const b=await chromium.launch({headless:true});
const {readFileSync}=await import('node:fs');const text=readFileSync('app/newsroom-data.ts','utf8');const rows=[...text.matchAll(/story\('([^']+)'[^\n]+?'(https:\/\/[^']+)'\)/g)];
try{for(const row of rows){const p=await b.newPage();try{await p.goto(row[2],{waitUntil:'domcontentloaded',timeout:25000});console.log(JSON.stringify({id:row[1],image:await p.locator('meta[property="og:image"]').first().getAttribute('content')}));}catch{console.log(JSON.stringify({id:row[1],image:null}));}await p.close();}}finally{await b.close()}
