import {useState} from 'react';
import {type BayRecord} from './chesapeake-data';
import {formatMetric} from '../lib/conservation-types';
import {Slider} from '@/components/ui/slider';
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue} from '@/components/ui/select';

export function ArchiveGraphic({record}:{record:BayRecord}) {
  const [metricId,setMetricId]=useState(record.metrics.find(m=>m.series.length>1)?.id||record.metrics[0]?.id);
  const [cursor,setCursor]=useState<number|null>(null);
  const metric=record.metrics.find(m=>m.id===metricId);
  if(!metric)return <p>No validated observations are available for this record.</p>;
  const series=metric.series, index=Math.min(cursor??series.length-1,series.length-1), observation=series[index];
  const values=series.flatMap(o=>o.value===null?[]:[o.value]), low=Math.min(...values), high=Math.max(...values), span=high-low||1;
  const x=(i:number)=>55+i/Math.max(1,series.length-1)*610, y=(v:number)=>200-(v-low)/span*155;
  return <figure className="archive-graphic"><Select value={metricId} onValueChange={id=>{setMetricId(id);setCursor(null)}}><SelectTrigger aria-label="Graphic indicator"><SelectValue/></SelectTrigger><SelectContent>{record.metrics.map(m=><SelectItem key={m.id} value={m.id}>{m.label}</SelectItem>)}</SelectContent></Select><p>{metric.scope}</p><svg viewBox="0 0 710 250" role="img" aria-label={`${record.name}: ${metric.label}. Select an observation using the controls below.`}>
    {[0,.5,1].map(t=><g key={t}><line x1="55" x2="665" y1={200-t*155} y2={200-t*155} stroke="var(--border)"/><text x="48" y={205-t*155} textAnchor="end">{values.length?formatMetric(low+t*(high-low),metric.precision):'—'}</text></g>)}
    {series.map((o,i)=>o.value===null?null:<g key={o.date}>{i>0&&series[i-1].value!==null&&<line x1={x(i-1)} y1={y(series[i-1].value!)} x2={x(i)} y2={y(o.value)} stroke="var(--primary)" strokeWidth="2"/>}<circle cx={x(i)} cy={y(o.value)} r={i===index?6:3} fill={i===index?'var(--foreground)':'var(--primary)'} onPointerEnter={()=>setCursor(i)} onClick={()=>setCursor(i)}><title>{o.date}: {o.value} {metric.unit} · {o.quality}</title></circle></g>)}
    {observation&&<line x1={x(index)} x2={x(index)} y1="30" y2="207" stroke="var(--muted-foreground)" strokeDasharray="4 4"/>}<text x="55" y="235">{series[0]?.date}</text><text x="665" y="235" textAnchor="end">{series.at(-1)?.date}</text>
  </svg><div className="graphic-readout" aria-live="polite"><strong>{observation?.date||'No observations'} · {formatMetric(observation?.value,metric.precision)} {metric.unit}</strong><span>{observation?.quality}{observation?.note?` · ${observation.note}`:''}</span></div>{series.length>1&&<div className="graphic-controls"><button aria-label="Previous observation" disabled={index<=0} onClick={()=>setCursor(index-1)}>←</button><Slider aria-label="Observation date" min={0} max={series.length-1} step={1} value={[Math.max(0,index)]} onValueChange={v=>setCursor(v[0])}/><button aria-label="Next observation" disabled={index>=series.length-1} onClick={()=>setCursor(index+1)}>→</button></div>}<figcaption>Select an indicator, then hover over a point or use the date slider and arrow buttons. Gaps represent missing observations; lines connect consecutive imported periods. {metric.unit}. {metric.definition}</figcaption></figure>;
}
