import {useState} from 'react';
import type {CrabRecord} from './crab-collections';
import {catalogPeriod} from './crab-section-workflows';
import {CrabEditorialScene} from './crab-editorial-scenes';
import {CrabRecordMedia} from './crab-record-media';

/** The connections describe catalog organization, never inferred causal relationships. */
export function CrabTopicAtlas({section,records,onChoose}:{section:string;records:CrabRecord[];onChoose:(index:number)=>void}){
 const groups=[...new Set(records.map(r=>r.focus))];
 const [active,setActive]=useState(groups[0]);
 const selected=records.map((r,i)=>({r,i})).filter(({r})=>r.focus===active);
 const film=selected.find(({r})=>r.media?.type==='youtube'||r.media?.type==='vimeo');
 const title=section==='business'?'Signals, relationships, communities':section==='survival'?'Pressures and protective responses':'Explore the records';
 return <section className={'crab-topic-atlas topic-'+section} aria-label={title}>
 <header><span>BLUE CRAB / {section==='business'?'SOCIETY':'SURVIVAL'}</span><h4>{title}</h4><p>Explore the animal’s interactions and the coastal settings of these source records. Illustrations are interpretive; dated accounts remain below.</p></header>
 {film?<section className="topic-feature-film"><h5>{film.r.title}</h5><CrabRecordMedia key={film.r.title} record={film.r}/><p>{film.r.description}</p><button onClick={()=>onChoose(film.i)}>Study this recording →</button></section>:<CrabEditorialScene survival={section==='survival'} topic={active}/>}
 <div className="topic-atlas-layout"><div className="topic-orbit"><svg viewBox="0 0 600 440" role="img" aria-label={'Catalog topics; selected: '+active}><defs><radialGradient id={'topic-glow-'+section}><stop stopColor="#73bad0" stopOpacity=".23"/><stop offset="1" stopColor="#73bad0" stopOpacity="0"/></radialGradient></defs><circle cx="300" cy="220" r="200" fill={'url(#topic-glow-'+section+')'}/><circle cx="300" cy="220" r="150" fill="none" stroke="#b4d8e73b" strokeDasharray="3 8"/>{groups.map((g,i)=>{const a=i/groups.length*Math.PI*2-Math.PI/2,x=300+Math.cos(a)*180,y=220+Math.sin(a)*150;return <g key={g} role="button" tabIndex={0} aria-label={g+' · '+records.filter(r=>r.focus===g).length+' records'} aria-pressed={active===g} onClick={()=>setActive(g)} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();setActive(g)}}}><path d={`M300 220L${x} ${y}`} stroke={active===g?'#d8f3ff':'#7298a84a'} strokeWidth={active===g?2:1}/><circle cx={x} cy={y} r={active===g?20:12} fill={active===g?'#cbefff':'#284858'} stroke="#a4d3e3"/><text x={x} y={y+38} textAnchor="middle" fill="#d6edf6" fontSize="12">{g}</text></g>})}<circle cx="300" cy="220" r="57" fill="#102c3b" stroke="#9acadd"/><text x="300" y="216" textAnchor="middle" fill="#ebf9ff" fontSize="18">Blue crab</text><text x="300" y="240" textAnchor="middle" fill="#a2bdca" fontSize="11">{records.length} source records</text></svg></div>
 <div className="topic-source-stack"><div className="topic-choices" aria-label="Choose a catalog topic">{groups.map(g=><button key={g} aria-pressed={active===g} onClick={()=>setActive(g)}>{g}</button>)}</div><h5>{active}</h5>{selected.map(({r,i})=><button className="topic-source" key={r.title} onClick={()=>onChoose(i)}><small>{catalogPeriod(r)?.label||'Date not stated'} · {r.kind}</small><strong>{r.title}</strong><span>{r.description}</span><em>Inspect record and source →</em></button>)}</div></div></section>
}
