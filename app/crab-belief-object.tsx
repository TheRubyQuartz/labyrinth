import {useState} from 'react';

/** The museum's actual object, not a generated substitute for historical evidence. */
export function CrabBeliefObject(){
 const [zoom,setZoom]=useState(1),[failed,setFailed]=useState(false);
 const [position,setPosition]=useState({x:50,y:50});
 return <figure className="belief-object">
 <div className="belief-object-stage" tabIndex={0} role="group" aria-label="Inspect the Moche vessel. Use plus and minus to zoom; arrow keys to pan."
 onPointerMove={e=>{if(zoom===1)return;const r=e.currentTarget.getBoundingClientRect();setPosition({x:(e.clientX-r.left)/r.width*100,y:(e.clientY-r.top)/r.height*100})}}
 onKeyDown={e=>{if(['+','=','-','ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home'].includes(e.key))e.preventDefault();if(e.key==='+'||e.key==='=')setZoom(z=>Math.min(3,z+.25));if(e.key==='-')setZoom(z=>Math.max(1,z-.25));if(e.key==='Home'){setZoom(1);setPosition({x:50,y:50})}if(e.key.startsWith('Arrow'))setPosition(p=>({x:Math.max(0,Math.min(100,p.x+(e.key==='ArrowRight'?10:e.key==='ArrowLeft'?-10:0))),y:Math.max(0,Math.min(100,p.y+(e.key==='ArrowDown'?10:e.key==='ArrowUp'?-10:0)))}))}}>
 {failed?<p>The museum image is unavailable. The object record and its original description remain below.</p>:<img loading="lazy" src="https://art.seattleartmuseum.org/internal/media/dispatcher/104568/preview" onError={()=>setFailed(true)} alt="Moche stirrup-spout vessel depicting a fanged supernatural figure with a crab body" style={{transform:`scale(${zoom})`,transformOrigin:`${position.x}% ${position.y}%`}}/>}
 </div>
 <div className="belief-object-toolbar"><span>OBJECT STUDY / {Math.round(zoom*100)}%</span><button aria-label="Zoom out of vessel" disabled={zoom===1} onClick={()=>setZoom(z=>Math.max(1,z-.5))}>−</button><button aria-label="Zoom into vessel" disabled={zoom===3} onClick={()=>setZoom(z=>Math.min(3,z+.5))}>+</button><button onClick={()=>{setZoom(1);setPosition({x:50,y:50})}}>Reset</button></div>
 <figcaption><span className="experience-eyebrow">ca. AD 500–750 · MOCHE · PERU</span><strong>Stirrup spout vessel: fanged deity with crab body</strong><span>Reduction ware · 22.9 × 15.2 cm · Seattle Art Museum, 77.18</span><small>Photo: Elizabeth Mann · Margaret E. Fuller Purchase Fund. Image served by the museum.</small><a href="https://art.seattleartmuseum.org/objects/23561/" target="_blank" rel="noreferrer">Object record &amp; provenance ↗</a></figcaption>
 </figure>
}
