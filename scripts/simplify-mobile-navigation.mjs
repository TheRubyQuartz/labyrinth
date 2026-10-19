import fs from 'node:fs';
const path='app/reference-features.tsx';let s=fs.readFileSync(path,'utf8');
const start=s.indexOf('<section><small>Inside Archive</small>');
const end=s.indexOf('</div></>:panel===',start);
if(start<0||end<0)throw Error('Navigation boundaries not found');
s=s.slice(0,start)+s.slice(end);
s=s.replace('{title} ↗</a>)}</section>','{title} ↗</a>)}<button onClick={()=>{setQuery(\'\');setPanel(\'help\')}}>Support</button></section>');
fs.writeFileSync(path,s);
