import {useState} from 'react';
import type {BayRecord} from './chesapeake-data';
type Journal={subject:string;question:string;notes:string;next:string};
export function ArchiveJournal({records,onOpen}:{records:BayRecord[];onOpen:(r:BayRecord)=>void}){
 const [value,setValue]=useState<Journal>(()=>{try{const v=JSON.parse(localStorage.getItem('labyrinth-archive-journal')||'null');if(v&&['subject','question','notes','next'].every(k=>typeof v[k]==='string'))return v}catch{}return{subject:records[0]?.id||'',question:'',notes:'',next:''}});
 const [status,setStatus]=useState('Stored only on this device');
 function edit(key:keyof Journal,text:string){setValue(v=>({...v,[key]:text}));setStatus('Unsaved changes')}
 function save(){try{localStorage.setItem('labyrinth-archive-journal',JSON.stringify(value));setStatus('Journal saved on this device')}catch{setStatus('Storage unavailable. Download your notes instead.')}}
 function download(){const subject=records.find(r=>r.id===value.subject);const text=`# ${subject?.name||'Archive investigation'}\n\n## Question\n${value.question}\n\n## Evidence notes\n${value.notes}\n\n## Next step\n${value.next}\n\nSource: ${subject?.source||''}\n`;const url=URL.createObjectURL(new Blob([text],{type:'text/markdown'}));const a=document.createElement('a');a.href=url;a.download='archive-investigation.md';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
 return <section className="ar-editorial" id="ar-journal"><header><div><p className="ar-eyebrow">YOUR INVESTIGATION / PRIVATE NOTES</p><h2>Keep a question.<br/>Build an answer.</h2></div><span role="status">{status}</span></header><div className="ar-editorial-grid ar-working-journal">
 <article><small>1 / Choose a subject</small><h3>Your question</h3><label>Subject<select value={value.subject} onChange={e=>edit('subject',e.target.value)}>{records.map(r=><option key={r.id} value={r.id}>{r.name}</option>)}</select></label><label>What do you want to find out?<textarea value={value.question} onChange={e=>edit('question',e.target.value)} rows={4}/></label><button className="ar-pill" onClick={()=>{save();const r=records.find(r=>r.id===value.subject);if(r)onOpen(r)}}>Inspect selected subject</button></article>
 <article><small>2 / Record evidence</small><h3>Observations & sources</h3><label>What did you observe? Include source links.<textarea value={value.notes} onChange={e=>edit('notes',e.target.value)} rows={8}/></label><button className="ar-pill" onClick={save}>Save investigation</button></article>
 <article><small>3 / Continue deliberately</small><h3>Your next step</h3><label>What remains uncertain?<textarea value={value.next} onChange={e=>edit('next',e.target.value)} rows={6}/></label><button className="ar-pill" onClick={download}>Download notes & source</button><p>No account sync. Download a copy before clearing browser storage.</p></article>
 </div></section>
}
