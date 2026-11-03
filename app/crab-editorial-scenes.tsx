import {useId,useState} from 'react';
import type {CrabRecord} from './crab-collections';
import {CrabMediaThumbnail,CrabRecordMedia} from './crab-record-media';
import {catalogPeriod} from './crab-section-workflows';
import './crab-editorial-scenes.css';

function Animal({x,y,scale=1}:{x:number;y:number;scale?:number}){return <g transform={`translate(${x} ${y}) scale(${scale})`} fill="currentColor" stroke="currentColor" strokeWidth="3"><path d="M-55 0Q-40-35 0-30Q40-35 55 0L70 5 48 12Q0 40-48 12L-70 5Z"/>{[-1,1].map(s=><g key={s} transform={`scale(${s} 1)`}>{[0,1,2].map(i=><path key={i} d={`M${30+i*5} ${8+i*5}l${25+i*2} ${15+i*6} 16 19`} fill="none"/>)}<path d="M35-12 60-35 68-60 80-52 73-33 94-44 93-25 69-17 45 2"/><ellipse cx="63" cy="49" rx="17" ry="7" transform="rotate(35 63 49)"/></g>)}<circle cx="-20" cy="-28" r="4" fill="#dff9ff"/><circle cx="20" cy="-28" r="4" fill="#dff9ff"/></g>}

/** Editorial illustration only: not an observed event, track, or quantitative habitat model. */
export function CrabEditorialScene({survival=false,topic}:{survival?:boolean;topic:string}){
 const id=useId().replace(/:/g,'');const [motion,M]=useState(false);
 if(!survival)return <figure className={'crab-editorial-scene society-produced-scene '+(motion?'scene-moving':'')}><div className="society-scene-image"><img src={import.meta.env.BASE_URL+'media/editorial/society-estuary-v1.png'} alt="AI-generated editorial illustration of two blue crabs beneath an estuary working waterfront and crab boat"/><div className="society-light-layer" aria-hidden="true"/></div><figcaption><strong>{topic}</strong><span>AI-generated editorial illustration · not a photograph, recorded event or anatomical reference.</span><button aria-pressed={motion} onClick={()=>M(!motion)}>{motion?'Pause scene':'Animate ambient light'}</button></figcaption></figure>;
 return <figure className={'crab-editorial-scene '+(motion?'scene-moving':'')}>
 <svg viewBox="0 0 900 650" role="img" aria-label={survival?'Illustrated submerged refuge: crab, vegetation, sediment and open water':'Illustrated coastal community: working boat above two crabs beneath the water'}>
 <defs><linearGradient id={id} x2="0" y2="1"><stop stopColor={survival?'#123c40':'#354953'}/><stop offset=".4" stopColor="#123747"/><stop offset="1" stopColor="#030e19"/></linearGradient><radialGradient id={id+'light'}><stop stopColor="#b9e3d1" stopOpacity=".3"/><stop offset="1" stopColor="#b9e3d1" stopOpacity="0"/></radialGradient><pattern id={id+'sand'} width="43" height="29" patternUnits="userSpaceOnUse"><path d="M0 20Q20 10 43 20" stroke="#d9d4aa" strokeOpacity=".14" fill="none"/></pattern></defs>
 <rect width="900" height="650" fill={`url(#${id})`}/><ellipse cx="330" cy="200" rx="600" ry="430" fill={`url(#${id}light)`}/>
 <g opacity=".12" fill="#d9f4ed"><path d="M190 0 100 600 330 600 240 0Z"/><path d="M400 0 420 600 530 600 430 0Z"/></g>
 {!survival&&<g fill="#26383e" stroke="#93b5be" strokeWidth="2"><path d="M0 155 150 120 250 150 370 130 500 160 690 125 900 155V190H0Z" stroke="none"/><g className="scene-boat"><path d="M530 155H790L750 204H585Z" fill="#b4ced1"/><path d="M600 155V100H690V155M635 100V70H700V155" fill="#3b5c68"/><path d="M660 70V35L745 110M733 110V340" fill="none"/><path d="M710 340H760V375H710Z" fill="none"/></g><path d="M0 206Q150 185 300 206T600 206T900 206" fill="none" strokeOpacity=".5"/></g>}
 <path d="M0 535Q200 475 420 540T900 510V650H0Z" fill="#253c3c"/><path d="M0 535Q200 475 420 540T900 510V650H0Z" fill={`url(#${id}sand)`}/>
 <g className="scene-grass" fill="none" stroke="#729b87" strokeWidth="5" opacity=".7">{Array.from({length:24},(_,i)=>{const x=30+i*13;return <path key={i} d={`M${x} 580Q${x-30} ${410-i%4*25} ${x+15} ${300+i%5*35}`}/>})}</g>
 <g color="#87afbb"><Animal x={survival?355:450} y={520} scale={1.25}/></g>{!survival&&<g color="#557f91"><Animal x={650} y={475} scale={.8}/></g>}
 {Array.from({length:35},(_,i)=><circle className="scene-particle" key={i} cx={(i*173)%900} cy={240+(i*61)%300} r={i%3+1} fill="#bbd9da" opacity=".22" style={{animationDelay:`${-i*.7}s`}}/>)}
 <text x="35" y="45" fill="#d9e9ed" fontSize="14" letterSpacing="4">{survival?'REFUGE / EXPOSURE':'ABOVE / BELOW THE WATER'}</text>
 </svg><figcaption><strong>{topic}</strong><span>Editorial illustration · not a field observation or measured reconstruction.</span><button aria-pressed={motion} onClick={()=>M(!motion)}>{motion?'Pause scene':'Animate water & vegetation'}</button></figcaption></figure>
}

export function CrabScreeningRoom({records,onChoose}:{records:CrabRecord[];onChoose:(index:number)=>void}){
 const films=records.map((r,i)=>({r,i})).filter(({r})=>r.media&&['youtube','vimeo'].includes(r.media.type));
 const [active,S]=useState(0);if(!films.length)return null;const {r,i}=films[Math.min(active,films.length-1)];
 return <section className="crab-screening-room"><header><span>BLUE CRAB / SCREENING ROOM</span><h4>Watch the subject.<br/>Follow the story.</h4><p>Published films, not live tracking. Select a screening; its date and source stay beside the player.</p></header><div className="screening-layout"><div><CrabRecordMedia key={r.title} record={r}/><h5>{r.title}</h5><p>{r.description}</p><small>{catalogPeriod(r)?.label||'Publication date not stated'} · {r.credit}</small><button onClick={()=>onChoose(i)}>Study this film & record observations →</button></div><nav aria-label="Film programme">{films.map(({r},index)=><button key={r.title} aria-pressed={index===active} onClick={()=>S(index)}><CrabMediaThumbnail record={r}/><span><small>SCREENING {String(index+1).padStart(2,'0')}</small><strong>{r.title}</strong><em>{r.focus}</em></span></button>)}</nav></div></section>
}
