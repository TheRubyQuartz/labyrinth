import {useState} from 'react';
import {Leaf,Radio,ArrowUpRight,ChevronDown} from 'lucide-react';
import type {BayRecord} from './chesapeake-data';
import {RecordStamp,HistoryChart} from './conservation-panel';
import './crab-record-connections.css';

function ConnectedHistory({record}:{record:BayRecord}){
 const available=record.metrics.filter(m=>m.series.some(o=>o.value!==null));
 const [metricId,setMetricId]=useState(()=>available.find(m=>m.series.filter(o=>o.value!==null).length>1)?.id||available[0]?.id||'');
 const metric=available.find(m=>m.id===metricId)||available[0];
 if(!metric)return <p>No observation history is available.</p>;
 return <div className="connected-history"><label>Observation history<select aria-label={'History metric for '+record.name} value={metric.id} onChange={e=>setMetricId(e.target.value)}>{available.map(m=><option value={m.id} key={m.id}>{m.label}</option>)}</select></label><p>{metric.scope} · {metric.cadence}</p>{metric.series.filter(o=>o.value!==null).length>1?<HistoryChart metric={metric}/>:<p>Only one observation is available for this metric; a trend cannot be shown.</p>}</div>
}
export function CrabConnectedRecords({records,onOpen}:{records:BayRecord[];onOpen:(record:BayRecord)=>void}){
 const [expanded,setExpanded]=useState<string|null>(null);
 return <section id="connections" className="crab-record-connections" aria-labelledby="connected-records-title">
 <header><div><h3 id="connected-records-title">Connected Records</h3><p>Explore the habitat and monitoring records linked to this species.</p></div><span>{records.length} linked records</span></header>
 <div className="connected-record-grid">{records.map(record=><article key={record.id} className={'connected-record '+(expanded===record.id?'is-expanded':'')}>
 <div className="connected-record-kind"><span>{record.type==='Habitat'?<Leaf size={19}/>:<Radio size={19}/>} {record.type==='Habitat'?'Habitat context':'Regional monitoring'}</span><small>{record.id}</small></div>
 <h4><a href={'?entry='+record.id} onClick={e=>{if(!e.ctrlKey&&!e.metaKey&&!e.shiftKey&&!e.altKey){e.preventDefault();onOpen(record)}}}>{record.name}<ArrowUpRight size={16}/></a></h4>
 <p className="connected-record-location">{record.area} · {record.latin}</p>
 <div className="connected-record-measure"><strong>{record.metric}</strong><span>{record.unit}</span></div>
 <RecordStamp record={record}/><span className="connected-data-status">{record.status}</span>
 <p className="connected-record-scope">{record.type==='Habitat'?'Whole survey-segment coverage; not a local crab count.':'Regional Bay observations; not measurements in Tangier Sound.'}</p>
 <div className="connected-record-actions"><a href={'?entry='+record.id} onClick={e=>{if(!e.ctrlKey&&!e.metaKey&&!e.shiftKey&&!e.altKey){e.preventDefault();onOpen(record)}}}>Open record <ArrowUpRight size={14}/></a><button aria-expanded={expanded===record.id} aria-controls={'connected-preview-'+record.id} onClick={()=>setExpanded(expanded===record.id?null:record.id)}>Quick view <ChevronDown size={15}/></button></div>
 <div id={'connected-preview-'+record.id} hidden={expanded!==record.id} className="connected-record-preview"><p>{record.desc}</p><ConnectedHistory record={record}/><p>{record.note}</p><a href={record.source} target="_blank" rel="noreferrer">Official monitoring source ↗</a></div>
 </article>)}</div>
 <p className="connected-record-note">Links provide regional conservation context, not proof of co-location or shared ownership. Source dates and coverage govern every measurement. Marketplace listings are demonstrations.</p>
 </section>;
}
