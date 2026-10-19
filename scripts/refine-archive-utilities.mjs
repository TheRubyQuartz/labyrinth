import fs from 'node:fs';
let file='app/archive-reference.tsx',s=fs.readFileSync(file,'utf8');
s=s.replace("<button className=\"ar-preview-link\" onClick={()=>setPanel({kind:'record',id:r.id})}>Quick look <Plus size={14}/></button>","<button className=\"ar-preview-link\" onClick={async()=>{const url=new URL(location.href);url.search='?entry='+r.id;url.hash='';try{await navigator.clipboard.writeText(url.href);setToast('Entry link copied')}catch{setToast('Copy unavailable. Open the entry and copy its address.')}}}>Copy entry link <ArrowUpRight size={14}/></button>");
fs.writeFileSync(file,s);
file='app/crab-collection-view.tsx';s=fs.readFileSync(file,'utf8');
s=s.replace('<button onClick={()=>{setComparison((selected+1)%collection.records.length)}}>Compare next record</button>',`<button onClick={()=>{const text=[current.title,current.credit,current.source].join('\\n');const url=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='source-citation.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}}>Download citation</button>`);
fs.writeFileSync(file,s);
