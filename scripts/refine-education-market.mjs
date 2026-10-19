import fs from 'node:fs';const path='app/exploration-reference.tsx';let s=fs.readFileSync(path,'utf8');
s=s.replace('id="market-guidance"','id="market-legacy-benefits"');
s=s.replace('<Icon size={35} strokeWidth={1.2}/>{label}','<span className="edu-category-object">{id===\'Task\'?<ArchiveRecordArt id="HB-001"/>:id===\'Products\'?<ArchiveRecordArt id="AS-001"/>:id===\'Supplies\'?<svg viewBox="0 0 120 90" aria-hidden="true"><g fill="#ffe1ad" stroke="#a87742" strokeWidth="2">{[25,52,79].map(x=><g key={x}><rect x={x} y="25" width="20" height="50" rx="5"/><rect x={x+4} y="17" width="12" height="13" rx="2"/></g>)}</g></svg>:<Icon size={35} strokeWidth={1.2}/>}</span>{label}');
fs.writeFileSync(path,s);
const comp='app/education-market.tsx';s=fs.readFileSync(comp,'utf8').replace('<section className="edu-quick">','<section className="edu-quick" id="market-guidance">');fs.writeFileSync(comp,s);
