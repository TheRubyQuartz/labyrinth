import {createRequire} from 'node:module';import fs from 'node:fs';import path from 'node:path';
const require=createRequire('C:/Users/Neo/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/package.json');process.env.PLAYWRIGHT_BROWSERS_PATH=path.resolve('.practice-qa/browsers');const {chromium}=require('playwright');const browser=await chromium.launch({headless:true});const page=await browser.newPage({viewport:{width:1440,height:1000}});const log=[];
async function step(name,fn){try{await fn();await page.waitForTimeout(600);await page.screenshot({path:'.practice-qa/references/'+name+'.png'});log.push({name,status:'tested',text:(await page.locator('body').innerText()).slice(-10000)});console.log('TESTED '+name)}catch(e){log.push({name,status:'not verified',error:e.message});console.log('NOT VERIFIED '+name)}}
await page.goto('https://www.apple.com/mac/');
await step('apple-megamenu',async()=>{await page.locator('#globalnav a[href="/mac/"]').first().hover()});
await page.mouse.move(20,700);
await step('apple-lineup-tab',async()=>{await page.getByRole('tab',{name:'Laptops',exact:true}).click({timeout:5000})});
await step('apple-lineup-next',async()=>{await page.getByRole('button',{name:'Next model, Explore the lineup',exact:true}).first().click({timeout:5000})});
await step('apple-feature-panel',async()=>{await page.getByRole('button',{name:'Learn more about education pricing.',exact:true}).click({timeout:5000})});
await page.keyboard.press('Escape');
await page.goto('https://www.apple.com/');
await step('apple-search-overlay',async()=>{await page.getByRole('button',{name:'Search apple.com',exact:true}).click({timeout:5000})});
await page.goto('https://blog.ecosia.org/');
await step('ecosia-blog-search',async()=>{await page.getByRole('link',{name:'Search',exact:true}).first().click();await page.getByPlaceholder('Type to Search').fill('trees');await page.waitForTimeout(1500)});
await page.goto('https://blog.ecosia.org/');
await step('ecosia-more-posts',async()=>{const before=await page.locator('article').count();await page.getByRole('button',{name:'More Posts',exact:true}).click();await page.waitForTimeout(1800);log.push({name:'more-post-count',before,after:await page.locator('article').count()})});
for(const [name,url] of [['ecosia-finances-correct','https://blog.ecosia.org/ecosia-financial-reports-tree-planting-receipts/'],['ecosia-trees-correct','https://blog.ecosia.org/tag/where-does-ecosia-plant-trees/']]){await page.goto(url);await step(name,async()=>{});}
await page.goto('https://blog.ecosia.org/');const article=page.locator('h2 a').first();const href=await article.getAttribute('href');if(href){await page.goto(new URL(href,'https://blog.ecosia.org/').href);await step('ecosia-article',async()=>{});await step('ecosia-article-reading',async()=>{await page.evaluate(()=>scrollTo(0,900))})}
const inventory=JSON.parse(fs.readFileSync('.practice-qa/references/inspection.json','utf8'));for(const ref of inventory.filter(r=>r.id.startsWith('apple')&&r.status===200)){await page.goto(ref.url,{waitUntil:'domcontentloaded'});await page.evaluate(()=>scrollTo(0,innerHeight*1.5));await page.waitForTimeout(700);await page.screenshot({path:'.practice-qa/references/'+ref.id+'-scroll.png'});}
fs.writeFileSync('.practice-qa/references/interactions.json',JSON.stringify(log,null,2));await browser.close();
