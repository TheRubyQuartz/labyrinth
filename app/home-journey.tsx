import {lazy,Suspense,useEffect,useRef,useState} from 'react';
import {journeyChapters as chapters} from './home-journey-data';
import {JourneyAudio} from './home-journey-audio';
import {ExpeditionCalendar,StayConnected} from './home-lando';
import {records} from './chesapeake-data';
import './home-journey.css';
import './home-journey-functional.css';
import JourneyTools from './home-journey-tools';
const Stage=lazy(()=>import('./home-journey-stage'));
export type JourneyControl={target:number;paused:boolean;replay:number;ready:boolean;hover:boolean;zoom?:number;wire?:boolean;explode?:boolean};
export default function HomeJourney(){
 const control=useRef<JourneyControl>({target:0,paused:matchMedia('(prefers-reduced-motion: reduce)').matches,replay:0,ready:false,hover:false});
 const [ready,setReady]=useState(false),[failed,setFailed]=useState(false),[active,setActive]=useState(0),[phase,setPhase]=useState('loading'),[paused,setPaused]=useState(control.current.paused),[sound,setSound]=useState(false),[panel,setPanel]=useState(''),[audioError,setAudioError]=useState('');
 const dialog=useRef<HTMLDialogElement>(null),audio=useRef<JourneyAudio|null>(null),root=useRef<HTMLDivElement>(null),previousFocus=useRef<HTMLElement|null>(null),fallback=useRef(false);
 const [wire,setWire]=useState(false),[explode,setExplode]=useState(false);
 function move(value:number){control.current.target=Math.max(0,Math.min(chapters.length-1,value));if(fallback.current){setActive(Math.round(control.current.target));setPhase('active');root.current?.style.setProperty('--scene-visibility','1')}}
 useEffect(()=>{const oldOverflow=document.body.style.overflow;document.body.style.overflow='hidden';document.title='Labyrinth · A world of connections';audio.current=new JourneyAudio();let settle:ReturnType<typeof setTimeout>|undefined;let drag:{id:number;y:number;start:number}|null=null;
  const interactive=(target:EventTarget|null)=>(target as HTMLElement)?.closest('a,button,input,select,textarea,dialog,.hj-tools');
  let direction=0;
  const snap=()=>{clearTimeout(settle);settle=setTimeout(()=>move(direction>0?Math.ceil(control.current.target-.001):Math.floor(control.current.target+.001)),160)};
  const wheel=(e:WheelEvent)=>{if(document.querySelector('dialog[open]'))return;const target=e.target as HTMLElement,tools=target.closest('.hj-tools');if(target.closest('input,select,textarea'))return;if(tools&&((e.deltaY>0&&tools.scrollTop+tools.clientHeight<tools.scrollHeight-2)||(e.deltaY<0&&tools.scrollTop>2)))return;e.preventDefault();if(control.current.ready&&e.deltaY){const delta=e.deltaY*(e.deltaMode===1?16:e.deltaMode===2?innerHeight:1);direction=Math.sign(delta);move(control.current.target+Math.max(-320,Math.min(320,delta))/800);snap()}};
  const key=(e:KeyboardEvent)=>{if(dialog.current?.open||(e.target as HTMLElement).matches('input,button,a,select,textarea'))return;if(['ArrowDown','PageDown',' ','ArrowUp','PageUp','Home','End'].includes(e.key)){e.preventDefault();move(e.key==='Home'?0:e.key==='End'?chapters.length-1:Math.round(control.current.target)+(['ArrowUp','PageUp'].includes(e.key)?-1:1))}};
  const start=(e:PointerEvent)=>{if(e.button!==0||dialog.current?.open||interactive(e.target))return;clearTimeout(settle);drag={id:e.pointerId,y:e.clientY,start:control.current.target};root.current?.setPointerCapture(e.pointerId);root.current?.classList.add('hj-dragging')};
  const track=(e:PointerEvent)=>{if(!drag||e.pointerId!==drag.id)return;move(drag.start+(drag.y-e.clientY)/Math.min(600,innerHeight*.6))};
  const end=(e:PointerEvent)=>{if(!drag||e.pointerId!==drag.id)return;const delta=control.current.target-drag.start;move(Math.abs(delta)>.12?Math.round(drag.start)+Math.sign(delta):Math.round(drag.start));drag=null;root.current?.classList.remove('hj-dragging');if(root.current?.hasPointerCapture(e.pointerId))root.current.releasePointerCapture(e.pointerId)};
  addEventListener('wheel',wheel,{passive:false});addEventListener('keydown',key);addEventListener('pointerdown',start);addEventListener('pointermove',track);addEventListener('pointerup',end);addEventListener('pointercancel',end);return()=>{clearTimeout(settle);document.body.style.overflow=oldOverflow;removeEventListener('wheel',wheel);removeEventListener('keydown',key);removeEventListener('pointerdown',start);removeEventListener('pointermove',track);removeEventListener('pointerup',end);removeEventListener('pointercancel',end);audio.current?.dispose()};
 },[]);
 useEffect(()=>{if(!panel)return;previousFocus.current=document.activeElement as HTMLElement;dialog.current?.showModal();return()=>{dialog.current?.close();previousFocus.current?.focus()}},[panel]);
 const chapter=chapters[active];
 async function toggleSound(){if(sound){audio.current?.mute();setSound(false)}else{try{await audio.current?.enable();setSound(true);setAudioError('');audio.current?.effect('assemble')}catch{setAudioError('Audio unavailable in this browser.')}}}
 return <div className="hj" ref={root} data-scene={chapter.id} data-phase={phase}>
  <Suspense fallback={null}><Stage control={control} onReady={()=>{setReady(true);control.current.ready=true}} onFailure={()=>{fallback.current=true;setFailed(true);setReady(true);control.current.ready=true;setPhase('active');root.current?.style.setProperty('--scene-visibility','1')}} onFrame={(index,p,visibility)=>{setActive(index);setPhase(p);root.current?.style.setProperty('--scene-visibility',String(visibility))}} onEffect={kind=>audio.current?.effect(kind)}/></Suspense>
  {!ready&&<div className="hj-loading" role="status"><span>LABYRINTH</span><i/><small>Preparing the world</small></div>}
  <header className="hj-header"><a href="./" className="hj-brand">LABYRINTH<small>A WORLD OF CONNECTIONS</small></a><p>Nature. Knowledge. Context.<br/>Explore the connections<br/>that shape our world.</p></header>
  <div className="hj-hover-target" aria-hidden="true" onPointerEnter={()=>{control.current.hover=true}} onPointerLeave={()=>{control.current.hover=false}}/>
  <section className="hj-copy" aria-label={chapter.label} aria-live="polite" aria-hidden={phase!=='active'} inert={phase!=='active'} key={active}><small>{chapter.label}</small><h1>{chapter.title}</h1>{active!==0&&<><p>{chapter.text}</p><a href={chapter.href} onClick={e=>{if(chapter.href.startsWith('#')){e.preventDefault();setPanel(chapter.href.slice(1))}}}>{chapter.action} ↗</a></>}</section>
  {failed&&<p className="hj-fallback">3D is unavailable on this device. Use the chapter controls or open the Archive.</p>}
  {active>0&&<div className="hj-tools" inert={phase!=='active'} aria-hidden={phase!=='active'}><JourneyTools chapter={chapter.id}/></div>}
  {active>0&&<div className="hj-object-controls" aria-label="Sculpture inspection" inert={phase!=='active'}><button onClick={()=>{control.current.zoom=Math.max(.7,(control.current.zoom||1)-.1)}} aria-label="Zoom in">＋</button><button onClick={()=>{control.current.zoom=Math.min(1.4,(control.current.zoom||1)+.1)}} aria-label="Zoom out">−</button><button aria-pressed={wire} onClick={()=>{control.current.wire=!wire;setWire(!wire)}}>Wireframe</button><button aria-pressed={explode} onClick={()=>{control.current.explode=!explode;setExplode(!explode)}}>Separate</button></div>}
  <nav className="hj-chapters" aria-label="Homepage chapters">{chapters.map((c,i)=><button key={c.id} aria-label={c.title} aria-current={active===i?'step':undefined} onClick={()=>move(i)}><span>{String(i+1).padStart(2,'0')}</span><i/></button>)}</nav>
  <footer className="hj-controls"><div><button onClick={toggleSound} aria-pressed={sound}>{sound?'Sound on':'Enable sound'}</button><button onClick={()=>{control.current.paused=!paused;setPaused(!paused)}} aria-pressed={paused}>{paused?'Enable motion':'Reduce motion'}</button><button onClick={()=>{control.current.replay++;move(0);audio.current?.effect('assemble')}}>Replay intro</button></div><span>{phase==='travel'?'TRAVELLING':`${String(active+1).padStart(2,'0')} / ${String(chapters.length).padStart(2,'0')}`} · SCROLL TO EXPLORE</span><button onClick={()=>setPanel('index')}>Explore / menu ＋</button></footer>
  {audioError&&<p className="hj-audio-error" role="status">{audioError}</p>}
  {panel&&<dialog ref={dialog} className="hj-dialog" onCancel={()=>setPanel('')}><button className="hj-close" onClick={()=>setPanel('')}>Close ×</button>{panel==='reading'?<div className="lh"><ExpeditionCalendar/></div>:panel==='interests'?<div className="lh"><StayConnected/></div>:<><h2>Choose your next discovery.</h2><div className="hj-index">{chapters.map((c,i)=><button key={c.id} onClick={()=>{move(i);setPanel('')}}>{c.label}<strong>{c.title}</strong></button>)}</div><h3>Open a destination</h3><nav>{['archive','map','marketplace','news'].map(v=><a href={'?view='+v} key={v}>{v} ↗</a>)}</nav><h3>Archive records</h3><div className="hj-index">{records.map(r=><a href={'?entry='+r.id} key={r.id}>{r.type}<strong>{r.name}</strong></a>)}</div></>}</dialog>}
 </div>
}
