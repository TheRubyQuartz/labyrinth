import {useEffect,useRef,useState} from 'react';
import './igloo-complete-home.css';

/** Isolated, locally served reference runtime. No remote site iframe or analytics. */
export default function IglooCompleteHome(){
 const [ready,setReady]=useState(false),[error,setError]=useState('');
 const frame=useRef<HTMLIFrameElement>(null),dialog=useRef<HTMLDialogElement>(null);
 useEffect(()=>{
  const title=document.title,overflow=document.body.style.overflow;
  document.title='Labyrinth — Interaction, training & exploration';document.body.style.overflow='hidden';
  const receive=(event:MessageEvent)=>{if(event.origin!==location.origin||event.source!==frame.current?.contentWindow||event.data?.source!=='labyrinth-igloo')return;if(event.data.type==='ready')setReady(true);if(event.data.type==='error')setError(event.data.message||'Scene initialization failed');if(event.data.type==='escape')dialog.current?.close()};
  addEventListener('message',receive);
  return()=>{document.title=title;document.body.style.overflow=overflow;removeEventListener('message',receive)};
 },[]);
 return <main className="ig-complete" data-scene-ready={ready}>
  <iframe ref={frame} src="./reference/igloo-complete/index.html" title="Labyrinth: glowing cathedral portal, exhibit gallery, interactive globe, destinations and reading calendar with journal" allow="autoplay; fullscreen"/>
  <button className="ig-labyrinth-access" onClick={()=>dialog.current?.showModal()} aria-haspopup="dialog">LABYRINTH <span>＋</span></button>
  {error&&!ready&&<aside className="ig-complete-error" role="alert">The 3D experience could not finish loading. <button onClick={()=>{setError('');if(frame.current)frame.current.src='./reference/igloo-complete/index.html?retry='+Date.now()}}>Retry</button><a href="?view=archive">Open archive</a></aside>}
  <dialog ref={dialog} className="ig-destination-dialog" onClick={event=>{if(event.target===dialog.current)dialog.current.close()}}>
   <div><header><h1>Explore Labyrinth</h1><button autoFocus onClick={()=>dialog.current?.close()} aria-label="Close destinations">×</button></header>
    <nav aria-label="Labyrinth destinations">{[['archive','Archive'],['workshop','Workshop'],['social','Social platform'],['map','World map'],['news','Conservation news'],['marketplace','Marketplace']].map(([view,label])=><a key={view} href={'?view='+view}>{label}<span>↗</span></a>)}</nav>
    <p>Labyrinth content and models, built on the attributed Igloo reference runtime. Original effects, audio and reference artwork belong to their respective creators.</p>
    <a className="ig-provenance" href="./reference/igloo-complete/provenance.json" target="_blank" rel="noreferrer">Asset provenance ↗</a>
   </div>
  </dialog>
 </main>;
}
