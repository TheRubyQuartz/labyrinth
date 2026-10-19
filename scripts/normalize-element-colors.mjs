import fs from 'node:fs';
const file='app/exploration-dark.css';
let css=fs.readFileSync(file,'utf8');
// Replace the legacy hard-coded green UI palette, retaining all layout rules.
css=css.replace(/#[0-9a-f]{8}|#[0-9a-f]{6}/gi,color=>{
 const rgb=color.slice(1,7);const r=parseInt(rgb.slice(0,2),16),g=parseInt(rgb.slice(2,4),16),b=parseInt(rgb.slice(4),16);
 if(Math.max(r,g,b)-Math.min(r,g,b)<8)return color;
 const light=(r+g+b)/3;
 return light>150?'var(--site-muted)':light>65?'var(--site-border)':light<30?'var(--site-deep)':'var(--site-surface)';
});
fs.writeFileSync(file,css);
// Preserve lightness/opacity while moving legacy green entry decoration to ice blue.
for(const name of fs.readdirSync('app').filter(n=>/^(crab-|archive-).*\.css$/.test(n)&&n!=='archive-elements.css')){
 const path='app/'+name;
 const text=fs.readFileSync(path,'utf8').replace(/#[0-9a-f]{8}\b|#[0-9a-f]{6}\b/gi,color=>{
  const [r,g,b]=[1,3,5].map(i=>parseInt(color.slice(i,i+2),16));
  if(g<=r||g<=b)return color;
  return '#'+[r,b,g].map(v=>v.toString(16).padStart(2,'0')).join('')+color.slice(7);
 });
 fs.writeFileSync(path,text);
}
