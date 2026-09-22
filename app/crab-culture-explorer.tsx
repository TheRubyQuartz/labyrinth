import {useEffect,useId,useRef,useState} from 'react';
import type {ReactNode} from 'react';
import works from './crab-culture-selections.json';
import './crab-culture-explorer.css';
const roles:Record<string,[string,string]>={
'Two Crabs':['Painting','The animal as subject'],
'Crustaceans':['Painting','Observation and repetition'],
'Box in the Form of a Crab':['Decorative arts','Anatomy becomes an object'],
'Rookwood crab-decorated dish':['Ceramics','A motif across cultures'],
'Battle of the Monkey & the Crab':['Folktale','The crab as protagonist'],
'Karkinos and the Hydra':['Classical myth','From heroic conflict to the stars'],
'The Crane and the Crab':['Teaching story','Discernment against deception'],
'The Time Machine':['Scientific romance','Life beyond humanity'],
'The Young Crab & His Mother':['Fable','Teaching by example'],
'The Crab and the Fox':['Fable','Leaving familiar ground']};
type Additional={title:string;tradition:string;url:string;content:ReactNode};
export function CrabCultureSelections({category,additional=[]}:{category:string;additional?:Additional[]}){
 const entries:{title:string;tradition:string;url:string;description?:string;content?:ReactNode}[]=works.filter(w=>w.category===category).map(w=>({...w}));
 for(const extra of additional){const match=entries.find(w=>w.title===extra.title);if(match)match.content=extra.content;else entries.push(extra)}
 const id=useId();
 const [index,setIndex]=useState(0),[readAll,setReadAll]=useState(false),[notice,setNotice]=useState('');
 const container=useRef<HTMLDivElement>(null);
 useEffect(()=>{function reveal(event?:Event){let target='';try{target=event?.type==='crab-navigate'?(event as CustomEvent<string>).detail:decodeURIComponent(location.hash.slice(1))}catch{return}const element=document.getElementById(target),panel=element?.closest('.culture-work');if(panel&&container.current?.contains(panel)){const panels=Array.from(container.current.querySelectorAll('.culture-work'));setIndex(panels.indexOf(panel))}}reveal();window.addEventListener('hashchange',reveal);window.addEventListener('crab-navigate',reveal);return()=>{window.removeEventListener('hashchange',reveal);window.removeEventListener('crab-navigate',reveal)}},[]);
 const buttons=useRef<(HTMLButtonElement|null)[]>([]);
 const [saved,setSaved]=useState<string[]>(()=>{try{const v=JSON.parse(localStorage.getItem('crab-culture-reading-'+category)||'[]');return Array.isArray(v)?v.filter(x=>typeof x==='string'):[]}catch{return []}});
 function save(title:string){const next=saved.includes(title)?saved.filter(x=>x!==title):[...saved,title];setSaved(next);try{localStorage.setItem('crab-culture-reading-'+category,JSON.stringify(next));setNotice('')}catch{setNotice('Saved for this visit only. Browser storage is unavailable.')}}
 function move(next:number){setIndex(next);buttons.current[next]?.focus()}
 return <div ref={container} className={'culture-explorer culture-'+category.toLowerCase()}>
 <div className="culture-view-switch"><span>{entries.length} works</span><button aria-pressed={readAll} onClick={()=>setReadAll(!readAll)}>{readAll?'Gallery view':'Read all works'} <span aria-hidden="true">{readAll?'▦':'☷'}</span></button></div>
 <div className={readAll?'culture-layout reading-all':'culture-layout'}>
 {!readAll&&<div className="culture-navigation" role="tablist" aria-label={category+' works'} aria-orientation="vertical">
 {entries.map((work,i)=><button ref={el=>{buttons.current[i]=el}} key={work.title} role="tab" id={id+'-tab-'+i} aria-controls={id+'-panel-'+i} aria-selected={i===index} tabIndex={i===index?0:-1} onClick={()=>setIndex(i)} onKeyDown={e=>{let n=index;if(e.key==='ArrowDown')n=(index+1)%entries.length;else if(e.key==='ArrowUp')n=(index+entries.length-1)%entries.length;else if(e.key==='Home')n=0;else if(e.key==='End')n=entries.length-1;else return;e.preventDefault();move(n)}}>
 <span className="culture-nav-number">{String(i+1).padStart(2,'0')}</span><span><strong>{work.title}</strong><small>{(roles[work.title]?.[0]||category)}</small></span><span className="culture-nav-arrow" aria-hidden="true">↗</span></button>)}
 </div>}
 <div className="culture-stage">{entries.map((work,i)=><article hidden={!readAll&&index!==i} className="culture-work" key={work.title} id={id+'-panel-'+i} role={readAll?undefined:'tabpanel'} aria-labelledby={readAll?undefined:id+'-tab-'+i} tabIndex={readAll?undefined:0}>
 <div className="culture-art-band" aria-hidden="true"><span>{String(i+1).padStart(2,'0')}</span><svg viewBox="0 0 400 160" fill="none"><ellipse cx="255" cy="83" rx="48" ry="31"/><path d="M217 65L195 40L174 48L169 22L190 29L195 40M292 65L314 40L335 48L340 22L319 29L314 40M209 79L182 71L155 83M207 88L176 91L151 108M215 101L190 114L178 137M301 79L328 71L355 83M303 88L334 91L359 108M295 101L320 114L332 137M240 54L235 43M270 54L275 43"/><circle cx="235" cy="42" r="3"/><circle cx="275" cy="42" r="3"/><path className="culture-orbit" d="M110 145Q150 0 310 10T390 140M100 100Q240 155 380 30"/></svg><span className="culture-band-type">{(roles[work.title]?.[0]||category)}</span></div>
 <div className="culture-work-copy"><p className="culture-role">{(roles[work.title]?.[1]||'')}</p><h5>{work.title}</h5><p className="culture-work-tradition">{work.tradition}</p>{work.description&&<p className="culture-description">{work.description}</p>}{work.content}
 <div className="culture-work-actions"><a href={work.url} target="_blank" rel="noreferrer">Explore source <span aria-hidden="true">↗</span><span className="culture-sr-only"> for {work.title}</span></a><button onClick={()=>save(work.title)} aria-label={'Save '+work.title} aria-pressed={saved.includes(work.title)}>{saved.includes(work.title)?'★ Saved':'☆ Save'}</button></div></div>
 </article>)}</div></div>{notice&&<p role="status">{notice}</p>}
 </div>;
}
