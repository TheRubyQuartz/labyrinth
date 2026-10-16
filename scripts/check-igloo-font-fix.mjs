import {createRequire} from 'node:module';import fs from 'node:fs';import path from 'node:path';
const require=createRequire('C:/Users/Neo/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/package.json');process.env.PLAYWRIGHT_BROWSERS_PATH=path.resolve('.practice-qa/browsers');const {chromium}=require('playwright');
const b=await chromium.launch({headless:true,args:['--enable-unsafe-swiftshader']});try{const p=await b.newPage({viewport:{width:1200,height:800}});
await p.route('**/App3D-*.js',r=>r.fulfill({contentType:'application/javascript',body:fs.readFileSync('public/reference/igloo-complete/assets/App3D-d68cb154.js','utf8').replaceAll('float d=fwidth(signedDist);','float d=max(0.00001,fwidth(signedDist));')}));
await p.goto('http://127.0.0.1:5205/');await p.locator('[data-scene-ready="true"]').waitFor({timeout:60000});await p.mouse.move(5,400);await p.waitForTimeout(6000);await p.screenshot({path:'.practice-qa/igloo-complete/font-fix.png'});
}finally{await b.close()}
