import {useState} from 'react';
import type {CrabRecord} from './crab-collections';
import {CrabRecordMedia,CrabMediaThumbnail} from './crab-record-media';
import {CrabImageComparison} from './crab-image-comparison';
import {CrabObjectJournal} from './crab-object-journal';

/** Photographs stay attached to their original records; no inferred capture dates. */
export function CrabApparatus({records}:{records:CrabRecord[]}){
 const photographs=records.filter(r=>r.media?.type==='image');
 const [index,I]=useState(0),[comparison,C]=useState(false);
 if(!photographs.length)return null;
 const selected=photographs[Math.min(index,photographs.length-1)];
 return <section className="apparatus-exhibit"><header><span>RESEARCH IN THE PHYSICAL WORLD</span><h4>The instruments<br/>behind the observations.</h4><p>Inspect the actual apparatus before following the sampling method below. Keep experimental settings separate from conditions in the wild.</p></header><div className="apparatus-layout"><div><CrabRecordMedia key={selected.media!.url} record={selected}/></div><aside><h5>{selected.title}</h5><p>{selected.description}</p><p>{selected.credit}</p><a href={selected.source} target="_blank" rel="noreferrer">Source and photograph provenance ↗</a><nav aria-label="Research apparatus photographs">{photographs.map((r,i)=><button key={r.title+i} aria-pressed={i===index} onClick={()=>I(i)}><CrabMediaThumbnail record={r}/><span>{r.title}</span></button>)}</nav>{photographs.length>1&&<button aria-pressed={comparison} onClick={()=>C(!comparison)}>{comparison?'Close equipment comparison':'Compare equipment photographs'}</button>}</aside></div>{comparison&&<CrabImageComparison key={selected.media!.url} a={selected} b={photographs[(index+1)%photographs.length]}/>}<CrabObjectJournal key={selected.media!.url} title={'Infrastructure / '+selected.title}/></section>
}
