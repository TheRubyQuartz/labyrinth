import {useMemo,useState} from 'react';
import {crabCollections} from './crab-collections';
import {catalogPeriod,crabWorkflows} from './crab-section-workflows';

export function CrabCatalogHistory({section}:{section:string}){
 const records=crabCollections[section].records;
 const [from,F]=useState(''),[to,T]=useState(''),[topic,Q]=useState('All topics'),[order,O]=useState('oldest');
 const dated=useMemo(()=>records.map(record=>({record,period:catalogPeriod(record)})).filter(r=>r.period!==null),[records]);
 const undated=records.filter(r=>!catalogPeriod(r));
 const visible=dated.filter(({record,period})=>(!from||period!.end>=+from)&&(!to||period!.start<=+to)&&(topic==='All topics'||record.focus===topic)).sort((a,b)=>(a.period!.start-b.period!.start)*(order==='oldest'?1:-1));
 const years=dated.flatMap(r=>[r.period!.start,r.period!.end]);
 function inspect(title:string){window.dispatchEvent(new CustomEvent('crab-workspace',{detail:{section,view:'collection',record:title}}))}
 return <section className="crab-catalog-history" aria-label="Catalog chronology"><header><div><span className="crab-collection-eyebrow">EXISTING ARCHIVE EVIDENCE</span><h4>{crabWorkflows[section].title} through time</h4></div></header><p>Dates below are taken from each record’s existing catalog credit. They may identify a publication, collection, or study period—not a continuous time series or a new verification of the source.</p>
 <div className="crab-history-summary"><div><strong>{dated.length}</strong><span>records with a stated year</span></div><div><strong>{years.length?Math.min(...years)+'–'+Math.max(...years):'—'}</strong><span>catalog date coverage</span></div><div><strong>{undated.length}</strong><span>records without a catalog year</span></div></div>
 <div className="crab-history-controls"><label>From year<input type="number" min="1700" max="2100" placeholder="Any year" value={from} onChange={e=>F(e.target.value)}/></label><label>Through year<input type="number" min="1700" max="2100" placeholder="Any year" value={to} onChange={e=>T(e.target.value)}/></label><label>Topic<select value={topic} onChange={e=>Q(e.target.value)}><option>All topics</option>{[...new Set(dated.map(r=>r.record.focus))].map(t=><option key={t}>{t}</option>)}</select></label><label>Order<select value={order} onChange={e=>O(e.target.value)}><option value="oldest">Earliest first</option><option value="newest">Latest first</option></select></label><button onClick={()=>{F('');T('');Q('All topics');O('oldest')}}>Reset</button></div>
 {from&&to&&+from>+to?<p role="alert">The start year must not be after the end year.</p>:null}
 <div className="crab-history-rail">{visible.map(({record:r,period:p})=><article className="crab-history-event" key={r.title}><time>{p!.label}</time><div><h5>{r.title}</h5><small>{r.kind} · {r.focus}</small><p>{r.description}</p><small>{r.credit} · {p!.basis}</small></div><button onClick={()=>inspect(r.title)}>Inspect record →</button></article>)}</div>
 {!visible.length&&<p>{dated.length?'No dated catalog records match these filters.':'These records do not state a year in their catalog credits. They remain accessible below; dates have not been guessed.'}</p>}
 {undated.length>0&&<details className="crab-undated-records"><summary>Records without a stated catalog year ({undated.length})</summary><p>These remain part of the archive. Add a dated observation only when the source establishes its date.</p><ul>{undated.map(r=><li key={r.title}><button onClick={()=>inspect(r.title)}>{r.title} →</button></li>)}</ul></details>}
 </section>
}
