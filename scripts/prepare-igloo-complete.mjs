import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
const origin='https://www.igloo.inc',mount='/reference/igloo-complete',out='public'+mount;
await fs.mkdir(out,{recursive:true});
const manifest=JSON.parse(await fs.readFile('.practice-qa/igloo-runtime/manifest.json','utf8'));
const pending=new Set(manifest.resources.map(r=>r.url).filter(url=>url.startsWith(origin+'/assets/'))),saved=new Map();
for(const file of ['images/cubes/bg.png','images/cubes/advect.png','images/perlin-datatexture.png'])pending.add(origin+'/assets/'+file);
function discover(text){for(const m of text.matchAll(/(?:https:\/\/www\.igloo\.inc)?\/?assets\/[a-zA-Z0-9_./-]+\.(?:js|css|woff2?|png|jpg|webp|svg|ico|json|ktx2|wasm|drc|ogg|exr)/g))pending.add(origin+'/'+m[0].replace(origin,'').replace(/^\//,''));}
const htmlResponse=await fetch(origin+'/');if(!htmlResponse.ok)throw new Error('Reference HTML unavailable');const originalHtml=await htmlResponse.text();await fs.writeFile('.practice-qa/igloo-runtime/original.html',originalHtml);discover(originalHtml);
while(pending.size){const batch=[...pending].slice(0,6);batch.forEach(url=>pending.delete(url));await Promise.all(batch.map(async url=>{if(saved.has(url))return;const relative=new URL(url).pathname.slice(1),target=path.join(out,relative);let body;const audit=path.join('.practice-qa/igloo-runtime',path.basename(relative));try{if(/(?:index-|App3D-).*\.js$/.test(relative))body=await fs.readFile(audit);else if(!relative.endsWith('.js'))body=await fs.readFile(target)}catch{}if(!body){const response=await fetch(url);if(!response.ok)throw new Error(`${url}: ${response.status}`);body=Buffer.from(await response.arrayBuffer())}const originalHash=crypto.createHash('sha256').update(body).digest('hex');if(/\.(js|css)$/.test(relative)){let text=body.toString();discover(text);text=text.replaceAll(origin+'/',mount+'/').replaceAll('"/assets/','"'+mount+'/assets/').replaceAll("'/assets/","'"+mount+'/assets/').replaceAll('`/assets/','`'+mount+'/assets/');if(relative.startsWith('assets/index-'))text=text.replace('relativePath:t==null?void 0:t.relativePath',`relativePath:"${mount}"`);body=Buffer.from(text)}await fs.mkdir(path.dirname(target),{recursive:true});await fs.writeFile(target,body);saved.set(url,{source:url,file:relative,bytes:body.length,originalSha256:originalHash});}));console.log('Saved',saved.size,'files; queued',pending.size)}
let html=originalHtml.replaceAll(origin+'/',mount+'/').replace(/(["'])\/assets\//g,'$1'+mount+'/assets/');
// Keep the visual application local; omit analytics and remote marketing scripts.
html=html.replace(/<script\b[^>]*src=["']https?:\/\/[^"']+["'][^>]*>[\s\S]*?<\/script>/gi,'').replace(/<link\b[^>]*(?:rel=["']canonical["'])[^>]*>/gi,'');
html=html.replace('</head>',`<base href="${mount}/"><meta name="robots" content="noindex,nofollow"><script src="${mount}/local-bridge.js" defer></script></head>`);
await fs.writeFile(path.join(out,'index.html'),html);
await fs.writeFile(path.join(out,'provenance.json'),JSON.stringify({source:origin,purpose:'User-requested local reference copy of the public Igloo experience. The runtime and art are third-party work, not newly authored Labyrinth assets. No redistribution license is asserted. Analytics removed; asset paths localized.',files:[...saved.values()]},null,2));
console.log('Local complete reference prepared:',saved.size,'assets');
await import('./patch-igloo-compatibility.mjs');
await import('./apply-labyrinth-scene.mjs');
