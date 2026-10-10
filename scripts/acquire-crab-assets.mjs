// Acquire explicitly reusable binary collection objects for the website.
// Text manifests are printed for review and are applied separately.
import fs from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve('public/crab-collection');
await fs.mkdir(root,{recursive:true});
const photos=JSON.parse(await fs.readFile('app/crab-media-catalog.json','utf8'));
const results=[];
async function acquire(url,file,source){const target=path.resolve(root,file);if(!target.startsWith(root+path.sep))throw Error('Invalid asset path');try{const existing=await fs.stat(target).catch(()=>null);if(existing?.size>1000){results.push({file,source,bytes:existing.size,cached:true});return}const response=await fetch(url,{headers:{'User-Agent':'LabyrinthArchive/1.0 (educational blue-crab collection)'},signal:AbortSignal.timeout(25000)});if(!response.ok)throw Error('HTTP '+response.status);const data=new Uint8Array(await response.arrayBuffer());const type=response.headers.get('content-type')||'';if(type.includes('text/html')||data.length<1000)throw Error('Unexpected asset response '+type);if(file.endsWith('.glb')&&new TextDecoder().decode(data.slice(0,4))!=='glTF')throw Error('Not a GLB');await fs.writeFile(target,data);results.push({file,source,bytes:data.length});console.log('ASSET '+file+' '+data.length)}catch(error){results.push({file,source,error:String(error)});console.log('FAILED '+file+' '+error.message)}}
await acquire('https://3d-api.si.edu/content/document/3d_package:b0bf6d44-af22-40dc-bd85-7d66255be4a7/blue-crab-150k-4096-high.glb','smithsonian-blue-crab-4k.glb','Smithsonian SERC · dpo_3d_200038 · public domain');
for(const photo of photos){if(!/CC BY|Public domain|No restrictions/.test(photo.license)||!photo.credit)continue;const extension=/\.png(?:$|\?)/i.test(photo.image)?'png':/\.svg(?:$|\?)/i.test(photo.image)?'svg':'jpg';await acquire(photo.image,'image-'+photo.researchIndex+'.'+extension,photo.source)}
await acquire('https://images.metmuseum.org/CRDImages/gr/original/DP20970.jpg','met-bronze-crab.jpg','Metropolitan Museum of Art · 1992.11.69 · public domain');
await acquire('https://images.metmuseum.org/CRDImages/eg/original/81.2.2_EGDP014597.jpg','met-obelisk-crab.jpg','Metropolitan Museum of Art · 81.2.2 · public domain');
console.log('MANIFEST '+JSON.stringify(results));
