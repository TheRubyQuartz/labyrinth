import {useState} from 'react';
import {microscopyRecords,microscopySource as source} from './crab-microscopy-data';
import {CrabRecordMedia,CrabMediaThumbnail} from './crab-record-media';
import {CrabImageComparison} from './crab-image-comparison';
import {CrabObjectJournal} from './crab-object-journal';


export function CrabMicroscopy(){
 const [selected,S]=useState(0),[pair,P]=useState(false);const record=microscopyRecords[selected];
 return <section className="crab-microscopy"><header><span>HEALTH / MICROSCOPE ARCHIVE / 2012</span><h4>Life within<br/>the host.</h4><p>Five published views of <i>Hematodinium</i>. These are different parasite forms—not a time-lapse, outbreak map, or diagnostic test.</p></header><div className="microscopy-bench"><div className="microscopy-slide">{pair?<CrabImageComparison a={record} b={microscopyRecords[(selected+1)%microscopyRecords.length]}/>:<CrabRecordMedia key={record.title} record={record}/>}</div><div className="microscopy-tray" aria-label="Microscope slides">{microscopyRecords.map((r,i)=><button key={r.title} aria-pressed={selected===i} onClick={()=>S(i)}><CrabMediaThumbnail record={r}/><span>{String(i+1).padStart(2,'0')} / {r.title.replace('Hematodinium · ','')}</span></button>)}</div></div><p>{record.description}</p><button aria-pressed={pair} onClick={()=>P(!pair)}>{pair?'Return to one field':'Compare with the next field'}</button><p><a href={source} target="_blank" rel="noreferrer">2012 VIMS study account & image credits ↗</a></p><CrabObjectJournal key={record.title} title={'Health microscopy / '+record.title}/></section>
}
