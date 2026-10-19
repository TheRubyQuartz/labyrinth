import {createRequire} from 'node:module';
process.env.PLAYWRIGHT_BROWSERS_PATH='C:/Users/Neo/Downloads/labyrinth-main (1)/labyrinth-home-recovery/.practice-qa/browsers';
const require=createRequire('C:/Users/Neo/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/package.json');
const {chromium}=require('playwright');
const b=await chromium.launch({headless:true});
try {
 const p=await b.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
 const errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto('http://127.0.0.1:5212/?view=archive');
 await p.locator('.ar-feature-card').first().waitFor();
 for(const name of ['Find a subject','Inspect primary sources','Compare records']){
  await p.locator('.ar-feature-card').filter({hasText:name}).click();
  await p.locator('dialog[open]').waitFor();
  console.log(name, (await p.locator('dialog[open]').innerText()).slice(0,180));
  await p.keyboard.press('Escape');
 }
 await p.locator('.ar-feature-card').filter({hasText:'Trace relationships'}).click();
 if(await p.getByRole('button',{name:'Connections',exact:true}).getAttribute('aria-pressed')!=='true')throw Error('Connections not selected');
 await p.locator('.ar-network').waitFor();
 console.log('Connections PASS');
 await p.locator('.ar-feature-card').filter({hasText:'Open saved entries'}).click();
 await p.getByLabel('What do you want to find out?').fill('How does habitat affect this subject?');
 await p.getByRole('button',{name:'Save investigation',exact:true}).click();
 await p.reload();
 if(await p.getByLabel('What do you want to find out?').inputValue()!=='How does habitat affect this subject?')throw Error('Journal did not persist');
 console.log('Journal persistence PASS');
 console.log('Map destination',await p.getByRole('link',{name:'Open the map',exact:true}).getAttribute('href'));
 await p.locator('#ar-journal').scrollIntoViewIfNeeded();
 await p.screenshot({path:'.practice-qa/archive-journal.png'});
 if(errors.length)throw Error(errors.join('\n'));
 console.log('PASS: no browser exceptions');
} finally {await b.close()}
