import {lazy,Suspense,useEffect,useRef,useState} from 'react';
import './home-igloo.css';
const Scene=lazy(()=>import('./igloo-scene'));
export const connectionRecords=[
 {name:'Blue crab',kind:'SPECIES',id:'SP-001',text:'A species is a starting point, not an isolated fact. Explore the blue crab’s anatomy, behavior, habitat and relationships in its full archive profile.'},
 {name:'Underwater habitat',kind:'HABITAT',id:'HB-001',text:'Habitat gives a species context. Follow the archive into the underwater environments that provide shelter, feeding grounds and space to grow.'},
 {name:'Field observations',kind:'OBSERVATION',id:'AS-001',text:'Monitoring connects a place to a record of change. Explore the field assets behind environmental observations and the evidence they collect.'}
];
export default function ConnectionSequence({paused=false}:{paused?:boolean}){
 const root=useRef<HTMLElement>(null),dialog=useRef<HTMLDialogElement>(null),[progress,setProgress]=useState(0),[manual,setManual]=useState(false),[selected,setSelected]=useState<number|null>(null),[wire,setWire]=useState(false),[reset,setReset]=useState(0),[ready,setReady]=useState(false);
 useEffect(()=>{const el=root.current!;const observer=new IntersectionObserver(([e])=>{if(e.isIntersecting)setReady(true)},{rootMargin:'600px'});observer.observe(el);return()=>observer.disconnect()},[]);
 useEffect(()=>{if(manual||paused)return;let frame=0;const update=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{const r=root.current!.getBoundingClientRect();setProgress(Math.max(0,Math.min(1,-r.top/(r.height-innerHeight))))})};update();addEventListener('scroll',update,{passive:true});addEventListener('resize',update);return()=>{cancelAnimationFrame(frame);removeEventListener('scroll',update);removeEventListener('resize',update)}},[manual,paused]);
 useEffect(()=>{if(selected!==null)dialog.current?.showModal();else dialog.current?.close()},[selected]);
 const phase=progress<.3?0:progress<.68?1:2;
 return <section ref={root} className="li-sequence" id="connections" aria-label="Explore archive connections"><div className="li-sticky">
 <div className="li-stage">{ready&&<Suspense fallback={<p className="li-loading">Opening the archive…</p>}><Scene progress={progress} paused={paused} wire={wire} reset={reset} onSelect={setSelected}/></Suspense>}</div>
 <div className="li-top"><span>LABYRINTH / CONNECTIONS</span><a href="?view=archive">Open archive ↗</a></div>
 <div className="li-story" aria-live="polite"><span>0{phase+1} / 03</span><h2>{['Every detail.','Part of a whole.','A world of connections.'][phase]}</h2><p>{['Look closer. A record begins with one subject.','Separate the layers. See how evidence fits together.','Follow a species into its habitat and the observations around it.'][phase]}</p></div>
 <div className="li-records">{connectionRecords.map((r,i)=><button key={r.id} onClick={()=>setSelected(i)}><small>0{i+1} / {r.kind}</small><span>{r.name} <b>↗</b></span></button>)}</div>
 <div className="li-controls"><div><button aria-pressed={wire} onClick={()=>setWire(!wire)}>Structure {wire?'on':'off'}</button><button onClick={()=>setReset(v=>v+1)}>Reset view</button><button aria-pressed={!manual} onClick={()=>setManual(!manual)}>{manual?'Resume scroll':'Manual control'}</button></div><label>ASSEMBLY<input aria-label="Connection sequence" type="range" min="0" max="100" value={Math.round(progress*100)} onChange={e=>{setManual(true);setProgress(+e.target.value/100)}}/><output>{Math.round(progress*100)}%</output></label><span>DRAG TO ROTATE · SELECT A RECORD</span></div>
 <dialog ref={dialog} className="li-dialog" onCancel={e=>{e.preventDefault();setSelected(null)}} aria-labelledby="li-record-title"><button className="li-close" onClick={()=>setSelected(null)} aria-label="Close connection">×</button>{selected!==null&&<><p className="li-kicker">{connectionRecords[selected].kind} / {connectionRecords[selected].id}</p><h2 id="li-record-title">{connectionRecords[selected].name}</h2><p>{connectionRecords[selected].text}</p><a href={'?entry='+connectionRecords[selected].id}>Read the full record ↗</a><div className="li-related">{connectionRecords.map((r,i)=>i!==selected&&<button key={r.id} onClick={()=>setSelected(i)}>{r.name} →</button>)}</div></>}</dialog>
 </div></section>
}
