"use client";
import {useCallback,useEffect,useMemo,useRef,useState} from 'react';
import {RefreshCw,ArrowUpRight,Download,Database} from 'lucide-react';
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue} from '@/components/ui/select';
import {Table,TableBody,TableCell,TableHead,TableHeader,TableRow} from '@/components/ui/table';
import snapshot from './conservation-snapshot.json';
import {buildRecords,type BayRecord} from './chesapeake-data';
import {refreshStaticStations} from '../lib/conservation-client';
import {formatMetric,latest,isStale,type ConservationData,type ConservationMetric,type Observation} from '../lib/conservation-types';

const HOSTED = false;
const BASE_SNAPSHOT = snapshot as ConservationData;
const interval = 15 * 60 * 1000;
export function useConservation() {
  const [data,setData]=useState(BASE_SNAPSHOT),[busy,setBusy]=useState(false),[error,setError]=useState(''),[attempt,setAttempt]=useState<string|null>(null);
  const current=useRef(data),pending=useRef(false),lastAttempt=useRef(0);
  const refresh=useCallback(async(force=false)=>{
    if(pending.current||(!force&&Date.now()-lastAttempt.current<interval))return;
    pending.current=true;lastAttempt.current=Date.now();setBusy(true);setAttempt(new Date().toISOString());
    try {
      let next:ConservationData;
      if(HOSTED){
        const response=await fetch('/api/conservation',{cache:'no-store',signal:AbortSignal.timeout(70000)});
        if(!response.ok)throw new Error(`Refresh unavailable (${response.status})`);
        next=await response.json();
      }else{
        let saved=current.current;
        try{
          const response=await fetch(new URL('conservation-data.json',window.location.href),{cache:'no-store',signal:AbortSignal.timeout(15000)});
          if(!response.ok)throw new Error('Snapshot unavailable');
          const imported=await response.json();
          if(imported.schemaVersion!==1||!imported.metrics||!imported.sources)throw new Error('Invalid snapshot');
          saved=imported;
        }catch{/* The bundled, dated snapshot remains usable offline. */}
        next=await refreshStaticStations(saved);
      }
      if(next.schemaVersion!==1||!next.metrics||!next.sources)throw new Error('Invalid provider response');
      current.current=next;setData(next);setError('');
    }catch(e){setError(`${e instanceof Error?e.message:'Refresh unavailable'}. Showing the last loaded data with its original observation dates.`);}
    finally{pending.current=false;setBusy(false);}
  },[]);
  useEffect(()=>{void refresh();const check=()=>{if(document.visibilityState==='visible')void refresh()};const timer=setInterval(check,interval);document.addEventListener('visibilitychange',check);return()=>{clearInterval(timer);document.removeEventListener('visibilitychange',check)}},[refresh]);
  const records=useMemo(()=>buildRecords(data),[data,attempt]);
  return {data,records,busy,error,attempt,refresh};
}
export function dateLabel(date?:string){
  if(!date)return 'No observation date';
  if(date.length<=7)return date;
  return new Date(date).toLocaleString('en-GB',{timeZone:'UTC',day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'})+' UTC';
}
export function RecordStamp({record}:{record:BayRecord}){
  return <span className="record-stamp">{record.metrics[0]?.label} · <time>{dateLabel(record.observation?.date)}</time><span>{record.metrics[0]?.scope}</span></span>;
}
export function DataStatus({state}:{state:ReturnType<typeof useConservation>}){
  const failures=Object.values(state.data.sources).filter(s=>s.state==='error').length;
  return <section className="data-status" aria-label="Data freshness"><div className="data-status-line"><div><Database size={18}/><strong>Real observations. Clearly dated.</strong><span>{state.busy?'Checking providers…':state.error?'Refresh unavailable':failures?`${failures} source refreshes unavailable`:'Source data loaded'}</span></div><button className="secondary refresh-button" disabled={state.busy} onClick={()=>void state.refresh(true)}><RefreshCw size={15} className={state.busy?'refreshing':''}/>{state.busy?'Refreshing…':'Refresh data'}</button></div><p>Station feeds refresh when you visit, return to the tab, and every 15 minutes while visible. Population and habitat surveys update when providers publish new assessments.</p>{state.error&&<p role="status" className="data-warning">{state.error}</p>}<details><summary>Sources, update schedule and data coverage</summary><p>History begins in 2000 where published. Observation year, preliminary status, spatial scope and missing coverage remain attached to each metric. These indicators do not assign an IUCN category or certify ecosystem health.</p><p>{HOSTED?'Annual source releases are checked on visits, with up to 24-hour upstream caching. PDF report content is cached for seven days.':'On GitHub Pages, annual sources use the saved snapshot. Annual snapshots update when the maintainer runs the import script and publishes a rebuild; NOAA readings refresh directly in your browser.'} Last import/refresh: {dateLabel(state.data.generatedAt)}. {state.attempt&&`Last browser attempt: ${dateLabel(state.attempt)}.`}</p><div className="source-list">{Object.entries(state.data.sources).map(([id,s])=><div key={id}><a href={s.url} target="_blank" rel="noreferrer">{s.name}<ArrowUpRight size={13}/></a><small>{s.state==='error'?'Refresh failed · retained history':s.state==='snapshot'?'Saved snapshot':'Loaded'} · last successful load {dateLabel(s.lastSuccessAt||undefined)}</small>{s.state==='error'&&<p>{s.message}</p>}</div>)}</div></details></section>;
}
function chartTime(date:string){return Date.parse(date.length===4?date+'-07-01':date.length===7?date+'-15':date);}
export function HistoryChart({metric,series=metric.series,compact=false}:{metric:ConservationMetric;series?:Observation[];compact?:boolean}){
  const valid=series.filter(o=>o.value!=null);
  if(!valid.length)return <p className="subnote">No values published/imported for this selection.</p>;
  const min=Math.min(...valid.map(o=>o.value!)),max=Math.max(...valid.map(o=>o.value!)),range=Math.max(max-min,.1),lo=min-range*.1,hi=max+range*.1;
  const times=series.map(o=>chartTime(o.date)),first=Math.min(...times),last=Math.max(...times);
  const x=(o:Observation)=>last===first?210:45+(chartTime(o.date)-first)/(last-first)*360;
  const y=(v:number)=>150-(v-lo)/(hi-lo)*125;
  const paths:string[][]=[];let part:string[]=[],previous:Observation|undefined;
  for(const o of series){
    const gap=previous&&chartTime(o.date)-chartTime(previous.date)>(metric.cadence==='Annual'?370:metric.cadence==='Monthly'?32:1)*86400000;
    const partial=o.quality==='Partial survey';
    if(o.value==null||gap||partial){if(part.length)paths.push(part);part=[];}
    if(o.value!=null&&!partial)part.push(`${x(o)},${y(o.value)}`);
    previous=o;
  }
  if(part.length)paths.push(part);
  return <figure className={compact?'metric-chart compact':'metric-chart'}><svg viewBox="0 0 430 190" role="img" aria-label={`${metric.label}, ${series[0].date} to ${series.at(-1)?.date}. ${valid.length} observations; exact values in the data table.`}><line x1="45" y1="150" x2="405" y2="150" stroke="#49614e"/><line x1="45" y1="25" x2="45" y2="150" stroke="#49614e"/>{[min,max].map((v,i)=><g key={i}><text x="38" y={y(v)+4} textAnchor="end">{formatMetric(v,metric.precision)}</text><line x1="45" y1={y(v)} x2="405" y2={y(v)} stroke="#304737" strokeDasharray="3 4"/></g>)}{paths.map((p,i)=><polyline key={i} points={p.join(' ')} fill="none" stroke="#c5e99a" strokeWidth="2"/>)}{valid.map(o=><circle key={o.date} cx={x(o)} cy={y(o.value!)} r={compact?2:3} fill={o.quality==='Preliminary'||o.quality==='Partial survey'?'#e9c48a':'#c5e99a'}><title>{o.date}: {formatMetric(o.value,metric.precision)} {metric.unit} · {o.quality}</title></circle>)}<text x="45" y="179">{series[0].date.slice(0,10)}</text><text x="405" y="179" textAnchor="end">{series.at(-1)?.date.slice(0,10)}</text></svg>{!compact&&<figcaption>{metric.unit} · amber: preliminary / partial · gaps are not interpolated</figcaption>}</figure>;
}
function csvCell(value:unknown){return '"'+String(value??'').replaceAll('"','""')+'"';}
export function MetricHistory({record,data}:{record:BayRecord;data:ConservationData}){
  const [id,setId]=useState(record.type==='Asset'?'monthly_mean':record.metrics[0]?.id),[year,setYear]=useState('All years');
  const metric=record.metrics.find(m=>m.id===id)||record.metrics[0];
  if(!metric)return <p>No validated metrics imported.</p>;
  const feed=metric.cadence==='Station feed',years=Array.from({length:Math.max(1,new Date().getUTCFullYear()-1999)},(_,i)=>String(2000+i));
  const filtered=metric.series.filter(o=>year==='All years'||o.date.startsWith(year));
  const periods=metric.cadence==='Annual'?(year==='All years'?years:[year]):year==='All years'?Array.from({length:(new Date().getUTCFullYear()-2000)*12+new Date().getUTCMonth()+1},(_,i)=>`${2000+Math.floor(i/12)}-${String(i%12+1).padStart(2,'0')}`):Array.from({length:year===String(new Date().getUTCFullYear())?new Date().getUTCMonth()+1:12},(_,i)=>`${year}-${String(i+1).padStart(2,'0')}`);
  const expected:Observation[]=feed?filtered:periods.map(date=>metric.series.find(o=>o.date===date)||{date,value:null,source:'',quality:'No published/imported data'});
  const exportCsv=()=>{
    const rows=[['record','metric','period_UTC_or_survey_year','value','unit','quality','scope','source','note'],...expected.map(o=>[record.name,metric.label,o.date,o.value,metric.unit,o.quality,metric.scope,o.sourceUrl||data.sources[o.source]?.url||'',o.note||''])];
    const blob=new Blob([rows.map(r=>r.map(csvCell).join(',')).join('\r\n')],{type:'text/csv;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=`${record.id}-${metric.id}-${year.replaceAll(' ','-')}.csv`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  };
  return <section className="metric-history"><h3>Conservation metrics</h3><div className="metric-summaries">{record.metrics.map(m=>{const o=latest(m);return <button key={m.id} className={m.id===metric.id?'selected':''} onClick={()=>{setId(m.id);setYear('All years')}}><span>{m.label}</span><strong>{formatMetric(o?.value,m.precision)} <small>{m.unit}</small></strong><small>{dateLabel(o?.date)} · {m.cadence==='Station feed'&&isStale(o)?'Older reading · ':''}{o?.quality}</small></button>})}</div><h3>{metric.label}</h3><p className="subnote">{metric.scope}</p><p className="metric-definition">{metric.definition}</p><div className="history-controls">{!feed&&<Select value={year} onValueChange={setYear}><SelectTrigger aria-label="History year"><SelectValue/></SelectTrigger><SelectContent>{['All years',...years.slice().reverse()].map(v=><SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent></Select>}<button className="text-link" onClick={exportCsv}><Download size={14}/>Export CSV</button></div><HistoryChart metric={metric} series={expected}/><p className="subnote">{feed?'Latest provider observation. Choose monthly mean sea level above for history since 2000.':`${filtered.filter(o=>o.value!=null).length} numeric observations · ${expected.filter(o=>o.value==null).length} missing periods. No values are invented for gaps.`}</p><div className="observation-table"><Table><TableHeader><TableRow><TableHead>Period</TableHead><TableHead>Value</TableHead><TableHead>Quality / source</TableHead></TableRow></TableHeader><TableBody>{expected.slice().reverse().map(o=><TableRow key={o.date}><TableCell>{dateLabel(o.date)}</TableCell><TableCell>{formatMetric(o.value,metric.precision)}</TableCell><TableCell>{data.sources[o.source]?<a href={o.sourceUrl||data.sources[o.source].url} target="_blank" rel="noreferrer">{o.quality} ↗</a>:o.quality}{o.note&&<small>{o.note}</small>}</TableCell></TableRow>)}</TableBody></Table></div><p className="subnote">Table values use {metric.unit}. Sources retain their own sampling methods and uncertainty. A fetch date is not an observation date.</p>{record.stationMetadata&&<p className="insight">Station established: {record.stationMetadata.established}. Position: {record.lat.toFixed(4)}° N, {Math.abs(record.lon).toFixed(4)}° W. Operator: NOAA CO-OPS. Battery / maintenance condition: not published.</p>}</section>;
}
