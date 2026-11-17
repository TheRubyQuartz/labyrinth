import {useEffect,useState} from 'react';
import type {CrabRecord} from './crab-collections';
import {catalogPeriod} from './crab-section-workflows';
import {CrabImageComparison} from './crab-image-comparison';
import './crab-art-study.css';

const lenses=[
 {title:'Composition',terms:'Visual Language · Storytelling · Illustration',prompt:'Follow the crab’s placement in this particular work. Where do the claws lead your eye? Does the body dominate the frame, or share it with its surroundings?'},
 {title:'Color & value',terms:'Coloring Theory · Painting',prompt:'Compare the crab with its background. Switch to grayscale to separate light–dark contrast from hue; this is a viewing aid, not a modification to the source artwork.'},
 {title:'Form & material',terms:'Drawing · Sculpting · Materials',prompt:'Inspect the carapace, claws and limb arrangement. Separate the artist’s material and surface treatment from biological anatomy; the species attribution below remains authoritative.'}
];
export function CrabArtStudy({records}:{records:CrabRecord[]}){
 const images=records.filter(r=>r.media?.type==='image');
 const [index,I]=useState(()=>Math.max(0,images.findIndex(r=>r.title==='Callinectes sapidus, the blue crab'))),[lens,L]=useState(0),[grid,G]=useState(false),[gray,V]=useState(false),[zoom,Z]=useState(1),[compare,C]=useState(false),[other,O]=useState(0),[error,E]=useState(false),[note,N]=useState(''),[saved,S]=useState('');
 const r=images[index];
 useEffect(()=>{try{N(r?localStorage.getItem('crab-art-study:'+r.title)||'':'')}catch{N('')}},[r?.title]);
 if(!r)return <p>No credited artwork images are available in this collection.</p>;
 function choose(i:number){I(i);if(other===i)O(i===0?1:0);Z(1);E(false);S('');try{N(localStorage.getItem('crab-art-study:'+images[i].title)||'')}catch{N('')}}
 return <section className="crab-art-study" aria-label="Crab imagery visual study"><header><small>BLUE CRAB ARCHIVE / COMPARATIVE CRAB IMAGERY</small><h3>{r.title}</h3><p>{r.scope||'Species attribution not stated'}. Cultural depictions are not automatically blue-crab specimens.</p></header>
 <label>Artwork<select value={index} onChange={e=>choose(+e.target.value)}>{images.map((x,i)=><option value={i} key={x.title}>{x.title}</option>)}</select></label>
 <div className="art-study-lenses" aria-label="Visual study topic">{lenses.map((x,i)=><button key={x.title} aria-pressed={lens===i} onClick={()=>{L(i);G(false);V(false)}}>{x.title}</button>)}</div>
 <figure><div className={'art-study-image'+(grid?' has-grid':'')}><img src={r.media!.url} alt={r.title} style={{filter:gray?'grayscale(1)':'none',transform:`scale(${zoom})`}} onError={()=>E(true)}/>{grid&&<svg viewBox="0 0 600 400" preserveAspectRatio="none" aria-label="Composition thirds overlay"><path d="M200 0V400M400 0V400M0 133H600M0 267H600"/></svg>}</div><figcaption>{catalogPeriod(r)?.label||'Date not stated'} · {r.credit}</figcaption></figure>
 {error&&<p role="alert">This source image could not load. Open the credited source below; no substitute image has been inserted.</p>}
 <div className="art-study-actions">{lens===0?<button aria-pressed={grid} onClick={()=>G(!grid)}>Composition grid</button>:lens===1?<button aria-pressed={gray} onClick={()=>V(!gray)}>Grayscale study</button>:<label>Inspect surface<input type="range" min="1" max="2.5" step=".1" value={zoom} onChange={e=>Z(+e.target.value)}/></label>}<button aria-expanded={compare} onClick={()=>C(!compare)}>Compare another crab depiction</button></div>
 <p>{lenses[lens].prompt}</p><a href={r.source} target="_blank" rel="noreferrer">View this work’s source ↗</a>
 {compare&&<div><label>Second work<select value={Math.min(other,images.length-1)} onChange={e=>O(+e.target.value)}>{images.map((x,i)=><option key={x.title} value={i} disabled={i===index}>{x.title}</option>)}</select></label><CrabImageComparison key={r.title+other} a={r} b={images[Math.min(other,images.length-1)]}/></div>}
 <details><summary>Record an interpretation of this work</summary><label>Your visual observation<textarea value={note} onChange={e=>N(e.target.value)} placeholder="Describe a specific feature visible in this artwork—not a biological claim."/></label><button onClick={()=>{try{localStorage.setItem('crab-art-study:'+r.title,note);S('Saved on this device.')}catch{S('Storage unavailable; copy your note before leaving.')}}}>Save for this artwork</button><p role="status">{saved}</p></details>
 <details><summary>Reference topics covered here</summary><p>{lenses[lens].terms}. This studies the selected crab artwork. It does not claim to implement every discipline in the reference line.</p></details>
 </section>
}
