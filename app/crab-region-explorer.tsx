import {useState} from 'react';
import {landmarks,regionalDetails,topics} from './crab-region-details';
import {locations} from './crab-overview-panels';
type Props={region:number;landmark:string|null;onTravel:(id:string)=>void;saved:boolean;onSave:()=>void;storageAvailable:boolean};
export function CrabRegionExplorer({region,landmark,onTravel,saved,onSave,storageAvailable}:Props){
 const [topic,setTopic]=useState(0);const detail=regionalDetails[region],place=landmarks.find(l=>l.id===landmark);
 return <div className="atlas-regional-explorer">
  <header className="atlas-dossier-heading"><div><span className="poc-eyebrow">REGIONAL FIELD GUIDE / {String(region+1).padStart(2,'0')}</span><h4>{locations[region].name}</h4><p>{detail.subtitle}</p></div><button aria-pressed={saved} onClick={onSave}>{saved?'★ Saved region':'☆ Save region'}</button></header>
  {!storageAvailable&&<p role="status">Saved regions are available for this visit only; browser storage is unavailable.</p>}
  <div className="atlas-topic-tabs" role="tablist" aria-label="Regional topic">{topics.map((t,i)=><button key={t} id={'atlas-topic-'+i} role="tab" aria-selected={topic===i} aria-controls="atlas-topic-panel" tabIndex={topic===i?0:-1} onClick={()=>setTopic(i)} onKeyDown={e=>{const next=e.key==='ArrowRight'?(i+1)%4:e.key==='ArrowLeft'?(i+3)%4:e.key==='Home'?0:e.key==='End'?3:null;if(next!==null){e.preventDefault();setTopic(next);document.getElementById('atlas-topic-'+next)?.focus()}}}><span>0{i+1}</span>{t}</button>)}</div>
  <div id="atlas-topic-panel" role="tabpanel" aria-labelledby={'atlas-topic-'+topic} tabIndex={0} className="atlas-topic-panel"><span className="atlas-topic-kicker">{topics[topic]}</span><p>{detail.views[topic]}</p><div className="atlas-evidence-links">{detail.sources.map(s=><a key={s.url} href={s.url} target="_blank" rel="noreferrer">{s.title} ↗</a>)}</div></div>
  <div className="atlas-local-heading"><h5>Explore nearby landmarks</h5><span>Approximate locations • not live sightings</span></div>
  <div className="atlas-landmark-cards">{landmarks.filter(l=>l.region===region).map(l=><button key={l.id} aria-pressed={l.id===landmark} onClick={()=>onTravel(l.id)}><span className="atlas-landmark-kind">{l.kind}</span><strong>{l.name}</strong><p>{l.note}</p><small>{Math.abs(l.lat).toFixed(2)}°{l.lat>=0?'N':'S'} · {Math.abs(l.lon).toFixed(2)}°{l.lon>=0?'E':'W'} <b>Travel →</b></small></button>)}</div>
  {place&&<div className="atlas-local-selection" aria-live="polite"><span>◇ {place.name}</span><p>{place.note} The marker is for regional exploration, not navigation or access guidance.</p></div>}
 </div>;
}
