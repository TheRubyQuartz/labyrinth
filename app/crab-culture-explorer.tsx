import {useEffect,useId,useRef,useState} from 'react';
import type {ReactNode} from 'react';
import works from './crab-culture-selections.json';
import './crab-culture-explorer.css';
import {CultureObjectMedia,cultureDates} from './crab-culture-media';
import {CrabObjectJournal} from './crab-object-journal';
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
 const [compare,setCompare]=useState(false),[other,setOther]=useState(1);
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
 <CultureObjectMedia title={work.title}/>
 <div className="culture-work-copy"><p className="culture-role">{(roles[work.title]?.[1]||'')}</p><h5>{work.title}</h5><p className="culture-work-tradition">{work.tradition}</p>{work.description&&<p className="culture-description">{work.description}</p>}{work.content}
 <div className="culture-work-actions"><a href={work.url} target="_blank" rel="noreferrer">Explore source <span aria-hidden="true">↗</span><span className="culture-sr-only"> for {work.title}</span></a><button onClick={()=>save(work.title)} aria-label={'Save '+work.title} aria-pressed={saved.includes(work.title)}>{saved.includes(work.title)?'★ Saved':'☆ Save'}</button></div><CrabObjectJournal title={work.title}/></div>
 </article>)}</div></div>
 <section className="culture-time-comparison" aria-label={category+' through time'}><header><h5>Compare works through time</h5><button aria-expanded={compare} onClick={()=>setCompare(!compare)}>{compare?'Close comparison':'Compare two works'}</button></header><p>Compare depictions and interpretations. Creation dates, edition dates and undated traditions are kept distinct.</p><div className="culture-date-rail">{entries.map((work,i)=>({work,i,date:cultureDates[work.title]})).sort((a,b)=>(a.date?.year??Infinity)-(b.date?.year??Infinity)).map(({work,i,date})=><button key={work.title} aria-pressed={index===i} onClick={()=>{setIndex(i);setReadAll(false)}}><span>{date?.label||'Undated in this record'}</span><strong>{work.title}</strong></button>)}</div>{compare&&<><label>Compare selected work with<select value={other} onChange={e=>setOther(Number(e.target.value))}>{entries.map((work,i)=><option key={work.title} value={i}>{work.title}</option>)}</select></label><div className="culture-compare-pair">{[index,Math.min(other,entries.length-1)].map((n,col)=><article key={col}><span>{cultureDates[entries[n].title]?.label||'Date not established'}</span><h5>{entries[n].title}</h5><p>{entries[n].tradition}</p><p>{entries[n].description}</p><small>{cultureDates[entries[n].title]?.basis||'No date is inferred from the age of the tradition.'}</small><a href={entries[n].url} target="_blank" rel="noreferrer">Source for this work ↗</a></article>)}</div></>}</section>{notice&&<p role="status">{notice}</p>}
 </div>;
}
