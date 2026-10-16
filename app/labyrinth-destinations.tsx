import {useEffect,useState} from 'react';
import {ArrowUpRight,BookOpen,FlaskConical,Users,Compass,Layers,MessageCircle} from 'lucide-react';
import './labyrinth-destinations.css';
export default function LabyrinthDestinations(){
 const social=new URLSearchParams(location.search).get('view')==='social';
 const key=social?'labyrinth-community-draft':'labyrinth-workshop-notebook';
 const [note,setNote]=useState(()=>{try{return localStorage.getItem(key)||''}catch{return''}}),[status,setStatus]=useState('');
 useEffect(()=>{document.title=(social?'Social platform':'Workshop')+' | Labyrinth'},[social]);
 const cards=social?[
  {icon:Users,title:'People & organizations',text:'Explore how an archive subject connects to people, institutions and conservation interests.',href:'/?entry=SP-001#crab-profiles'},
  {icon:BookOpen,title:'Shared subjects',text:'Choose an archive record as the starting point for a question, observation or discussion.',href:'/?view=archive'},
  {icon:FlaskConical,title:'Work worth sharing',text:'Develop an investigation in the workshop before sharing its evidence and findings.',href:'/?view=workshop'}
 ]:[
  {icon:Layers,title:'Inspect a model',text:'Study structures, components and spatial relationships in the archive’s model collections.',href:'/?entry=SP-001#crab-category-modeling'},
  {icon:Compass,title:'Explore an environment',text:'Use the terrain workspace to investigate places, records and environmental measurements.',href:'/?view=map'},
  {icon:BookOpen,title:'Follow the evidence',text:'Start with a source-backed archive subject and record the questions you want to investigate.',href:'/?view=archive'}
 ];
 function save(){try{localStorage.setItem(key,note);setStatus('Saved on this device.')}catch{setStatus('Storage unavailable. Copy your text before leaving.')}}
 return <div className="ld-page"><nav className="ld-nav"><a href="/">LABYRINTH</a><div><a href="/?view=archive">Archive</a><a href="/?view=workshop" aria-current={!social?'page':undefined}>Workshop</a><a href="/?view=social" aria-current={social?'page':undefined}>Social</a></div></nav><main className="ld-main"><header className="ld-hero"><span>{social?'CONNECT / EXCHANGE / COLLABORATE':'LEARN / EXPERIMENT / CREATE'}</span><h1>{social?'Discover together.':'Turn curiosity into practice.'}</h1><p>{social?'Connect people, ideas and evidence around the world you are exploring.':'A place to investigate subjects, develop ideas and record what you learn.'}</p></header><section className="ld-grid" aria-label={social?'Community pathways':'Workshop pathways'}>{cards.map(c=><a href={c.href} className="ld-card" key={c.title}><c.icon size={36}/><h2>{c.title}</h2><p>{c.text}</p><span>Explore <ArrowUpRight size={18}/></span></a>)}</section><section className="ld-notebook"><div>{social?<MessageCircle/>:<FlaskConical/>}<h2>{social?'Draft a discussion':'Your investigation notebook'}</h2><p>{social?'Prepare a question, observation or idea. Drafts stay on this device; they are not published.':'Write a question, hypothesis, method and observations. Your notes stay on this device.'}</p></div><label><span>{social?'Discussion draft':'Investigation notes'}</span><textarea value={note} onChange={e=>{setNote(e.target.value);setStatus('Unsaved changes')}} placeholder={social?'What did you discover? What would you like to discuss?':'Question → Evidence → Method → Observations → Next steps'}/></label><button onClick={save}>Save locally</button><span role="status">{status}</span></section><p className="ld-status">{social?'Community preview: live profiles, publishing and messaging are not connected.':'Workshop landing page: linked archive tools and local notes are available; a standalone simulation or training engine is not connected.'}</p></main></div>
}
