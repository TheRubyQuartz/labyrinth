"use client";
import {activityPhases,ecologySources,type ActivityPhase} from './ecology-data';
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue} from '@/components/ui/select';
import {Slider} from '@/components/ui/slider';
import {Switch} from '@/components/ui/switch';
export type ActivitySelection={speciesId:string;month:number;scale:string};
export const monthNames=['January','February','March','April','May','June','July','August','September','October','November','December'];
export function activityWindow(selection:ActivitySelection){
 const m=selection.month;
 if(selection.scale==='recent')return [(m+10)%12,(m+11)%12,m];
 if(selection.scale==='seasonal'){const start=Math.floor(((m+1)%12)/3)*3-1;return [0,1,2].map(i=>(start+i+12)%12);}
 return [m];
}
export function mappedPhases(selection:ActivitySelection){return (activityPhases[selection.speciesId]||[]).filter(p=>p.months.some(m=>activityWindow(selection).includes(m)));}
// These points position explanatory labels, not observed animals or habitat boundaries.
const crabAnchors:Record<string,[number,number]>={winter:[-76.34,39.04],spring:[-76.35,38.83],mating:[-76.35,38.60],spawn:[-76.27,37.86],larvae:[-75.96,37.86],autumn:[-76.12,38.30]};
const oysterAnchors:Record<string,[number,number]>={resident:[-76.29,38.76],spawn:[-76.36,38.60],larvae:[-76.12,38.67],recovery:[-76.22,38.90]};
export type ActivityHit={x:number;y:number;id:string};
export function drawActivities(c:CanvasRenderingContext2D,project:(lon:number,lat:number,z:number)=>{x:number;y:number},selection:ActivitySelection,phases:ActivityPhase[],highlight:string):ActivityHit[]{
 const hits:ActivityHit[]=[];c.save();
 phases.forEach((phase,i)=>{
  const anchor=(selection.speciesId==='SP-001'?crabAnchors:oysterAnchors)[phase.id];if(!anchor)return;
  const p=project(anchor[0],anchor[1],0),active=phase.id===highlight;
  c.setLineDash([4,5]);c.strokeStyle=active?'#fff4c2':'#80e7f2';c.fillStyle='#70d6e522';c.lineWidth=active?2.5:1.5;c.beginPath();c.ellipse(p.x,p.y,26,17,0,0,Math.PI*2);c.fill();c.stroke();c.setLineDash([]);
  c.fillStyle=active?'#fff4c2':'#9beaf1';c.beginPath();c.arc(p.x,p.y,11,0,Math.PI*2);c.fill();c.font='bold 11px Arial';c.textAlign='center';c.fillStyle='#10292b';c.fillText('A'+(i+1),p.x,p.y+4);
  if(selection.speciesId==='SP-001'&&(phase.id==='spawn'||phase.id==='larvae')){
   const south=project(anchor[0],anchor[1]-.07,0);const angle=Math.atan2(south.y-p.y,south.x-p.x);
   c.strokeStyle='#9beaf1';c.lineWidth=2;c.beginPath();c.moveTo(p.x,p.y+13);c.lineTo(south.x,south.y);c.moveTo(south.x-9*Math.cos(angle-.5),south.y-9*Math.sin(angle-.5));c.lineTo(south.x,south.y);c.lineTo(south.x-9*Math.cos(angle+.5),south.y-9*Math.sin(angle+.5));c.stroke();
  }
  hits.push({x:p.x,y:p.y,id:phase.id});
 });c.restore();return hits;
}
export function MapActivityControls({selection,onChange,enabled,onToggle,phases,highlight,onHighlight,onFit,onProfile,exploring}:{selection:ActivitySelection;onChange:(s:ActivitySelection)=>void;enabled:boolean;onToggle:(v:boolean)=>void;phases:ActivityPhase[];highlight:string;onHighlight:(id:string)=>void;onFit:()=>void;onProfile:()=>void;exploring:boolean}){
 const chosen=phases.find(p=>p.id===highlight)||phases[0];
 return <section className="map-activity-panel" aria-label="Species activity map layer"><div className="activity-map-heading"><h3>Movement & activity</h3><label><Switch checked={enabled} onCheckedChange={onToggle} aria-label="Show seasonal activity on map"/>Show on map</label></div><div className="activity-map-selects"><Select value={selection.speciesId} onValueChange={speciesId=>onChange({...selection,speciesId})}><SelectTrigger aria-label="Activity species"><SelectValue/></SelectTrigger><SelectContent><SelectItem value="SP-001">Blue crab</SelectItem><SelectItem value="SP-002">Eastern oyster</SelectItem></SelectContent></Select><Select value={selection.scale} onValueChange={scale=>onChange({...selection,scale,month:scale==='recent'?new Date().getMonth():selection.month})}><SelectTrigger aria-label="Activity time scale"><SelectValue/></SelectTrigger><SelectContent><SelectItem value="recent">Recent · last 3 months</SelectItem><SelectItem value="monthly">Monthly</SelectItem><SelectItem value="seasonal">Seasonal</SelectItem></SelectContent></Select><button onClick={onFit} className="secondary">Fit activity view</button><button onClick={onProfile} className="text-link">Open species calendar ↗</button></div><p className="activity-period">{activityWindow(selection).map(m=>monthNames[m]).join(' · ')} <span>Typical activity, not sightings</span></p>{selection.scale!=='recent'&&<Slider min={0} max={11} step={1} value={[selection.month]} onValueChange={v=>onChange({...selection,month:v[0]})} aria-label="Activity calendar month"/>}<p className="ecology-note">Dashed cyan callouts (A1–A{phases.length}) indicate broad activity context, not surveyed ranges. Select a callout or its label below. {!exploring?'Overlays are hidden while inspecting or measuring; choose Explore to show them.':''}</p>{enabled&&<><div className="activity-map-keys">{phases.map((phase,i)=><button key={phase.id} aria-pressed={chosen?.id===phase.id} onClick={()=>onHighlight(phase.id)}><b>A{i+1}</b>{phase.title}</button>)}</div>{chosen&&<div className="activity-map-description" aria-live="polite"><strong>{chosen.title}</strong><p>{chosen.region} · {chosen.text}</p><a href={ecologySources[chosen.source].url} target="_blank" rel="noreferrer">Life-history source ↗</a></div>}</>}<p className="ecology-note">{selection.speciesId==='SP-001'?'Southern arrows mean lower-Bay/coastal context continues beyond this Maryland terrain extent. They do not depict a measured route. Winter shelter also occurs farther down-Bay.':'Oyster callouts use the Harris Creek exploration area as an illustration. Adults stay attached; spawning and larval dispersal occur across suitable Bay reefs. Callouts do not locate a measured larval plume.'} This calendar is independent of the historical assessment year below.</p></section>;
}
