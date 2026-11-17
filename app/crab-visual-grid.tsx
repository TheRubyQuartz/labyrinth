import {useEffect,useState} from 'react';
import type {CrabRecord} from './crab-collections';
import {CrabMediaThumbnail} from './crab-record-media';
import {catalogPeriod} from './crab-section-workflows';
import './crab-visual-grid.css';

export function CrabVisualGrid({records,onSelect,onCompare}:{records:CrabRecord[];onSelect:(i:number)=>void;onCompare:(a:number,b:number)=>void}){
 const [query,Q]=useState(''),[format,F]=useState('All'),[sort,S]=useState('Curated'),[columns,C]=useState(3),[page,P]=useState(0),[pair,B]=useState<number[]>([]);
 useEffect(()=>P(0),[query,format,sort,columns]);
 const results=records.map((r,i)=>({r,i})).filter(({r})=>(format==='All'||(format==='Images'?r.media?.type==='image':!r.media))&&`${r.title} ${r.focus} ${r.kind} ${r.credit}`.toLowerCase().includes(query.toLowerCase())).sort((a,b)=>sort==='Title'?a.r.title.localeCompare(b.r.title):sort==='Newest'?(catalogPeriod(b.r)?.start??-Infinity)-(catalogPeriod(a.r)?.start??-Infinity):a.i-b.i);
 const size=columns*2,pages=Math.max(1,Math.ceil(results.length/size)),current=Math.min(page,pages-1);
 return <section className="crab-visual-grid" aria-label="Visual collection grid">
  <div className="visual-grid-toolbar"><label>Find a visual<input type="search" value={query} onChange={e=>Q(e.target.value)} placeholder="Title, topic or creator"/></label><label>Show<select value={format} onChange={e=>F(e.target.value)}><option>All</option><option>Images</option><option>Research notes</option></select></label><details><summary>View options</summary><label>Grid columns<select value={columns} onChange={e=>C(Number(e.target.value))}><option value={2}>2 · larger previews</option><option value={3}>3 · compact previews</option></select></label><label>Order<select value={sort} onChange={e=>S(e.target.value)}><option>Curated</option><option>Title</option><option>Newest</option></select></label></details></div>
  <div className="visual-grid-status"><span role="status">{results.length} records · page {current+1} of {pages}</span><button disabled={pair.length!==2} onClick={()=>onCompare(pair[0],pair[1])}>Compare {pair.length}/2</button>{pair.length>0&&<button onClick={()=>B([])}>Clear selection</button>}</div>
  <div className="visual-grid-tiles" style={{'--grid-columns':columns} as React.CSSProperties}>{results.slice(current*size,(current+1)*size).map(({r,i})=><article key={r.title}><button className="visual-grid-open" onClick={()=>onSelect(i)} aria-label={'Inspect '+r.title}><CrabMediaThumbnail record={r}/><span><small>{r.kind}</small><strong>{r.title}</strong><small>{catalogPeriod(r)?.label||'Date not stated'}</small></span></button><label className="visual-grid-compare"><input type="checkbox" checked={pair.includes(i)} disabled={!pair.includes(i)&&pair.length===2} onChange={()=>B(p=>p.includes(i)?p.filter(n=>n!==i):[...p,i])}/>Compare</label></article>)}</div>
  {!results.length&&<p>No matching records. <button onClick={()=>{Q('');F('All')}}>Clear filters</button></p>}
  <nav aria-label="Visual grid pages"><button disabled={current===0} onClick={()=>P(current-1)}>← Previous</button><span>{current+1} / {pages}</span><button disabled={current+1>=pages} onClick={()=>P(current+1)}>Next →</button></nav>
 </section>
}
