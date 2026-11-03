import {useEffect, useRef, useState} from 'react';

type Route = {id:string; from:string; to:string; a:number[]; b:number[]; family:string};

/** Normalized illustration only: source data contains no timed vehicle positions. */
export function CrabRoutePlayback({viewer,C,routes}:{viewer:any;C:any;routes:Route[]}) {
 const [target,setTarget]=useState('all');
 const [progress,setProgress]=useState(0);
 const [playing,setPlaying]=useState(false);
 const [speed,setSpeed]=useState(1);
 const [reverse,setReverse]=useState(false);
 const [loop,setLoop]=useState(false);
 const progressRef=useRef(0);
 const tracks=useRef<any[]>([]);
 const routeKey=routes.map(r=>r.id).join('|');
 const activeTarget=routes.some(r=>r.id===target)?target:'all';
 const ready=!!viewer && !!C && routes.length>0;

 function paint(value:number) {
  if(!viewer || viewer.isDestroyed()) return;
  for(const t of tracks.current) {
   const scaled=value*100, index=Math.floor(scaled);
   const head=t.at(value);
   t.marker.position=head;
   // Preserve the whole route as context; reveal the travelled part above it.
   t.trail.show=value>0;
   t.trail.polyline.positions=[...t.positions.slice(0,index+1),head];
  }
  viewer.scene.requestRender();
 }
 function seek(value:number) {
  const bounded=Math.max(0,Math.min(1,value));
  progressRef.current=bounded;
  setProgress(bounded);
  paint(bounded);
 }

 useEffect(()=>{
  if(!viewer || !C || viewer.isDestroyed()) return;
  const entities:any[]=[];
  tracks.current=routes.filter(r=>activeTarget==='all'||r.id===activeTarget).map(r=>{
   const geodesic=new C.EllipsoidGeodesic(C.Cartographic.fromDegrees(...r.a),C.Cartographic.fromDegrees(...r.b));
   const height=Math.min(1600000,geodesic.surfaceDistance*(r.family==='Air'?.18:.06));
   const at=(p:number)=>{const point=geodesic.interpolateUsingFraction(p);return C.Cartesian3.fromRadians(point.longitude,point.latitude,3200+Math.sin(Math.PI*p)*height)};
   const positions=Array.from({length:101},(_,i)=>at(i/100));
   const color=C.Color.fromCssColorString(r.family==='Air'?'#d4aaff':r.family==='Sea'?'#75d6ff':'#ffba74');
   const marker=viewer.entities.add({id:'route-playhead-'+r.id,name:r.from+' → '+r.to,position:at(progressRef.current),point:{pixelSize:12,color,outlineColor:C.Color.WHITE,outlineWidth:2}});
   const trail=viewer.entities.add({id:'route-progress-'+r.id,show:false,polyline:{positions:positions.slice(0,2),width:5,arcType:C.ArcType.NONE,material:color}});
   entities.push(marker,trail);
   return {marker,trail,positions,at};
  });
  paint(progressRef.current);
  return ()=>{tracks.current=[];if(!viewer.isDestroyed()){entities.forEach(e=>viewer.entities.remove(e));viewer.scene.requestRender()}};
 },[viewer,C,routeKey,activeTarget]);

 useEffect(()=>{
  if(!playing || !ready) return;
  let frame=0,last=0,lastReadout=0;
  const tick=(time:number)=>{
   // Do not jump to the end after returning from a background tab.
   const dt=last?Math.min((time-last)/1000,.1):0; last=time;
   let value=progressRef.current+dt*speed/12*(reverse?-1:1);
   const ended=reverse?value<=0:value>=1;
   if(ended) value=loop?(reverse?1:0):(reverse?0:1);
   progressRef.current=value; paint(value);
   if(time-lastReadout>80 || ended){setProgress(value);lastReadout=time}
   if(ended&&!loop){setPlaying(false);return}
   frame=requestAnimationFrame(tick);
  };
  frame=requestAnimationFrame(tick);
  return ()=>cancelAnimationFrame(frame);
 },[playing,ready,speed,reverse,loop,viewer,C,routeKey,activeTarget]);

 function toggle() {
  if(!playing && (reverse?progressRef.current<=0:progressRef.current>=1)) seek(reverse?1:0);
  setPlaying(v=>!v);
 }
 return <section className="gm-route-playback" aria-label="Route animation controls">
  <h4>Route playback</h4>
  <label>Animate<select value={activeTarget} disabled={!ready} onChange={e=>{setTarget(e.target.value);setPlaying(false);seek(0)}}>
   <option value="all">All visible routes ({routes.length})</option>
   {routes.map(r=><option key={r.id} value={r.id}>{r.from} → {r.to}</option>)}
  </select></label>
  <div className="gm-playback-buttons">
   <button disabled={!ready} onClick={()=>{setPlaying(false);seek(0)}} aria-label="Go to route start">Start</button>
   <button disabled={!ready} onClick={()=>{setPlaying(false);seek(progressRef.current-.05)}} aria-label="Step backward five percent">−5%</button>
   <button disabled={!ready} onClick={toggle}>{playing?'Pause':'Play'}</button>
   <button disabled={!ready} onClick={()=>{setPlaying(false);seek(progressRef.current+.05)}} aria-label="Step forward five percent">+5%</button>
   <button disabled={!ready} onClick={()=>{setPlaying(false);seek(1)}} aria-label="Go to route end">End</button>
  </div>
  <label>Journey progress · {Math.round(progress*100)}%
   <input aria-label="Route journey progress" type="range" min="0" max="1000" step="1" value={Math.round(progress*1000)} disabled={!ready} onChange={e=>{setPlaying(false);seek(Number(e.target.value)/1000)}}/>
  </label>
  <div className="gm-playback-settings">
   <label>Speed<select value={speed} onChange={e=>setSpeed(Number(e.target.value))}>{[.25,.5,1,2,4].map(v=><option key={v} value={v}>{v}×</option>)}</select></label>
   <label><input type="checkbox" checked={reverse} onChange={e=>setReverse(e.target.checked)}/> Reverse</label>
   <label><input type="checkbox" checked={loop} onChange={e=>setLoop(e.target.checked)}/> Loop</label>
  </div>
  <small>Illustrative journey progress—not live tracking or recorded travel time. 1× plays a route in 12 seconds. Drag the timeline either way; arrow keys fine-tune it.</small>
 </section>;
}
