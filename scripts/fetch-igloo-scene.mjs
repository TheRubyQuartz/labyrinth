import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
const base='https://www.igloo.inc/assets/';
const files=['geometries/igloo.drc','geometries/igloo/igloo_cage.drc','geometries/igloo/igloo_outline.drc','geometries/ground.drc','geometries/mountain.drc','images/igloo/igloo_color.ktx2','images/igloo/igloo_exploded_color.ktx2','images/igloo/ground_color.ktx2','images/igloo/ground_sansigloo_color.ktx2','images/igloo/ground_glow.ktx2','images/igloo/mountain_color.ktx2','images/igloo/triangles_tiling.ktx2','images/igloo/igloo_scene.ktx2','images/wind_noise.ktx2','images/mosaic.ktx2','audio/wind.ogg','audio/igloo.ogg','audio/particles.ogg'];
files.push('geometries/intro_particles.drc','geometries/igloo/patch.drc','images/igloo/numbers.ktx2');
const records=[];
for(const file of files){const target=path.join('public/reference/igloo',file);await fs.mkdir(path.dirname(target),{recursive:true});let body;try{body=await fs.readFile(target)}catch{const response=await fetch(base+file);if(!response.ok)throw new Error(`${file}: ${response.status}`);body=Buffer.from(await response.arrayBuffer());await fs.writeFile(target,body)}records.push({file,source:base+file,sha256:crypto.createHash('sha256').update(body).digest('hex')});if(file.endsWith('.drc'))console.log(file,body.subarray(0,5).toString()==='DRACO'?'DRACO metadata':body.subarray(4,4+body.readUInt32LE(0)).toString())}
await fs.writeFile('public/reference/igloo/provenance.json',JSON.stringify({source:'https://www.igloo.inc/',purpose:'User-requested local reference reconstruction. Original assets remain the property of their respective creators; no redistribution license is asserted.',files:records},null,2));
await fs.mkdir('public/reference/decoders/basis',{recursive:true});await fs.mkdir('public/reference/decoders/draco',{recursive:true});
for(const [dir,names]of [['basis',['basis_transcoder.js','basis_transcoder.wasm']],['draco',['draco_wasm_wrapper.js','draco_decoder.wasm']]])for(const name of names)await fs.copyFile(`node_modules/three/examples/jsm/libs/${dir}/${name}`,`public/reference/decoders/${dir}/${name}`);
