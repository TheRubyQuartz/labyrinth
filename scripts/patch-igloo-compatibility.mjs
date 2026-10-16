import fs from 'node:fs';
// Prevent undefined smoothstep edges on constant-distance MSDF texels.
// This preserves the original type animation while fixing software/WebGL drivers.
const file='public/reference/igloo-complete/assets/App3D-d68cb154.js';
const original=fs.readFileSync(file,'utf8');
const patched=original.replaceAll('float d=fwidth(signedDist);','float d=max(0.00001,fwidth(signedDist));');
if(patched===original&&!original.includes('float d=max(0.00001,fwidth(signedDist));'))throw new Error('MSDF compatibility patch target not found');
fs.writeFileSync(file,patched);
console.log('MSDF compatibility fix applied.');
