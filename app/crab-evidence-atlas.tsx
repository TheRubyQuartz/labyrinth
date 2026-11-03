import {useState} from 'react';
import type {CrabRecord} from './crab-collections';
import {catalogPeriod} from './crab-section-workflows';
/** Publication/collection coverage only. These glyphs never imply population values. */
export function CrabEvidenceAtlas({records,from,to,onYear}:{records:CrabRecord[];from:string;to:string;onYear:(year:string)=>void}){
 const dated=records.map(r=>({r,p:catalogPeriod(r)})).filter(d=>d.p);
 const years=[...new Set(dated.flatMap(d=>[d.p!.start,d.p!.end]))].sort((a,b)=>a-b);
 const [hover,H]=useState<number|null>(null);
 if(!years.length)return null;
 const min=years[0],max=years.at(-1)!,span=max-min||1;
 const x=(year:number)=>36+(year-min)/span*928;
 return <section className="crab-evidence-atlas" aria-label="Visual catalog date coverage"><header><div><span>THE EVIDENCE LANDSCAPE</span><h5>{min} <span>—</span> {max}</h5></div><p>Each line is a source period.<br/>Select a year to narrow the evidence.</p></header><svg viewBox={`0 0 1000 ${Math.max(110,dated.length*17+38)}`} role="img" aria-label={`${dated.length} catalog records spanning ${min} to ${max}. Year buttons below filter the results.`}><defs><linearGradient id="archive-date-light"><stop stopColor="#b0def6"/><stop offset="1" stopColor="#5a89b5"/></linearGradient></defs>{years.map(y=><line key={y} x1={x(y)} x2={x(y)} y1="10" y2={dated.length*17+24} stroke="currentColor" opacity=".12"/>)}{dated.map(({r,p},i)=><g key={r.title} opacity={(!from||p!.end>=+from)&&(!to||p!.start<=+to)?1:.2}><title>{r.title}: {p!.label}</title><line x1={x(p!.start)} x2={x(p!.end)} y1={i*17+20} y2={i*17+20} stroke="url(#archive-date-light)" strokeWidth="4" strokeLinecap="round"/><circle cx={x(p!.start)} cy={i*17+20} r="4" fill="#d2efff"/><circle cx={x(p!.end)} cy={i*17+20} r="2" fill="#b0def6"/></g>)}{hover!==null&&<line x1={x(hover)} x2={x(hover)} y1="0" y2={dated.length*17+28} stroke="#fff" strokeDasharray="3 4"/>}</svg><div className="crab-atlas-years">{years.map(y=><button key={y} onMouseEnter={()=>H(y)} onMouseLeave={()=>H(null)} onFocus={()=>H(y)} onBlur={()=>H(null)} aria-pressed={from===String(y)&&to===String(y)} onClick={()=>onYear(String(y))}>{y}</button>)}</div><small>Catalog dates, not a biological trend. Long lines indicate stated study periods.</small></section>;
}
