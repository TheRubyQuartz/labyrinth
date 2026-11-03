import {useState} from 'react';
import type {CrabRecord} from './crab-collections';
import {CrabRecordMedia,CrabMediaThumbnail} from './crab-record-media';
import {CrabImageComparison} from './crab-image-comparison';
import {CrabObjectJournal} from './crab-object-journal';
export function CrabMoltRecords({records}:{records:CrabRecord[]}){
 const plates=records.filter(r=>r.media?.type==='image'&&/molt|shedd/i.test(r.title+' '+r.description));
 const [selected,S]=useState(0),[compare,C]=useState(false);
 if(!plates.length)return null;
 const current=plates[Math.min(selected,plates.length-1)];
 return <section className="molt-source-stage"><header><span>RECORDED FORM / GROWTH</span><h4>A new shell.<br/>A changing body.</h4><p>Inspect the documented molt. Published plate order is not a calibrated timeline, and historical illustrations are not measurements of a living specimen.</p></header><div className="molt-filmstrip" aria-label="Published molt plates">{plates.map((r,i)=><button key={r.title+String(i)} aria-pressed={i===selected} onClick={()=>S(i)}><CrabMediaThumbnail record={r}/><span><small>PLATE {String(i+1).padStart(2,'0')}</small>{r.title}</span></button>)}</div><CrabRecordMedia key={current.title} record={current}/><p>{current.description}</p><a href={current.source} target="_blank" rel="noreferrer">Original image and attribution ↗</a>{plates.length>1&&<><button aria-pressed={compare} onClick={()=>C(!compare)}>{compare?'Close plate comparison':'Compare the documented plates'}</button>{compare&&<CrabImageComparison key={current.title} a={current} b={plates[(selected+1)%plates.length]}/>}</>}<CrabObjectJournal key={current.title} title={'Health / '+current.title}/></section>;
}
