import fs from 'node:fs';
const s=fs.readFileSync('public/reference/igloo-complete/assets/App3D-d68cb154.js','utf8');
for(const term of process.argv.slice(2)){const i=s.indexOf(term);console.log(term,i,s.slice(Math.max(0,i-100),i+2400))}
