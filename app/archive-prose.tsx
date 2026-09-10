import {useRef,useState} from 'react';
import {List} from 'lucide-react';
import {Sheet,SheetTrigger,SheetContent,SheetHeader,SheetTitle,SheetDescription} from '@/components/ui/sheet';
import {MergedCrabArticle,MergedCrabContents} from './crab-merged';
import {FullCrabReferences} from './crab-full';
import content from './archive-articles.json';

type Section={id:string;title:string;paragraphs:string[];sources:string[];children:Section[]};
const articles:Record<string,Section[]>=content.articles;
const references:Record<string,{title:string;url:string}>=content.references;
const flatten=(sections:Section[]):Section[]=>sections.flatMap(section=>[section,...flatten(section.children)]);
const sourcesFor=(id:string)=>Array.from(new Set(flatten(articles[id]||[]).flatMap(section=>section.sources)));
const anchor=(id:string)=>'article-'+id;

export function ArticleContents({id}:{id:string}){
  const [open,setOpen]=useState(false);
  const destination=useRef<string|null>(null);
  function link(target:string,label:string){return <a href={'#'+target} onClick={e=>{e.preventDefault();destination.current=target;setOpen(false)}}>{label}</a>}
  function links(sections:Section[]){return <ul>{sections.map(section=><li key={section.id}>{section.children.length?<details open><summary>{link(anchor(section.id),section.title)}</summary>{links(section.children)}</details>:link(anchor(section.id),section.title)}</li>)}</ul>}
  return <Sheet open={open} onOpenChange={setOpen}><SheetTrigger className="contents-trigger"><List size={18}/>Contents</SheetTrigger><SheetContent side="left" className="contents-panel" onCloseAutoFocus={e=>{if(destination.current){e.preventDefault();const target=destination.current;destination.current=null;window.history.replaceState({},'',window.location.pathname+window.location.search+'#'+target);const element=document.getElementById(target);if(element){element.tabIndex=-1;element.focus({preventScroll:true});element.scrollIntoView({block:'start'})}}}}><SheetHeader><SheetTitle>Contents</SheetTitle><SheetDescription>Jump to a section. Use the arrows to expand or collapse subsections.</SheetDescription></SheetHeader><nav className="article-toc" aria-label="Article contents">{link('article-title','(Top)')}{id==='SP-001'?<MergedCrabContents link={link}/>:links(articles[id]||[])}<ul><li>{link('interactive','Interactive graphic')}</li><li>{link('ecology','Ecological context')}</li><li>{link('assessments','Assessments')}</li><li>{link('history','Measurements & history')}</li></ul><div className="contents-end">{link('article-see-also','See also')}{link('article-references','References')}{link('article-external-links','External links')}</div></nav></SheetContent></Sheet>;
}

export function ArticleProse({id}:{id:string}){
 const sources=sourcesFor(id);
 function section(item:Section,depth:number){
  const Heading=depth===0?'h2':depth===1?'h3':'h4';
  return <section key={item.id} id={anchor(item.id)}><Heading>{item.title}</Heading>{item.paragraphs.map((p,i)=><p key={i}>{p}{i===item.paragraphs.length-1&&item.sources.map(source=><sup key={source}><a aria-label={'Reference: '+references[source].title} href={'#reference-'+source}>[{sources.indexOf(source)+1}]</a></sup>)}</p>)}{item.children.map(child=>section(child,depth+1))}</section>
 }
 return id==='SP-001'?<MergedCrabArticle/>:<div className="article-prose">{(articles[id]||[]).map(item=>section(item,0))}</div>;
}

export function ArticleReferences({id}:{id:string}){
 const sources=sourcesFor(id);
 return <section id="article-references" className="article-references"><h2>References</h2>{id==='SP-001'&&<><FullCrabReferences/><h3>Blue crab profile and archive references</h3></>}<ol>{sources.map(source=><li id={'reference-'+source} key={source}><a href={references[source].url} target="_blank" rel="noreferrer">{references[source].title} ↗</a></li>)}</ol>{id==='SP-001'&&<p className="subnote">Natural-history and cultural text adapted and condensed from the user-supplied Wikipedia articles <a href={references.crab.url}>Crab</a> and <a href={references.blue.url}>Callinectes sapidus</a>, by Wikipedia contributors. This adapted prose is available under <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>; wording, organization and archive context have been changed. Historical examples are distinguished from the dated monitoring data.</p>}<p className="subnote">Article research reviewed 10 September 2026. Descriptive text is editorial; live readings and imported survey values retain their own observation dates. Interpretations of archive scope describe the data presented here.</p><h2 id="article-external-links">External links</h2><p>Use the references above for the full background accounts and methods. Observation-level source links and downloadable data remain in Measurements & history.</p><a href="#history">Go to measurements and source data ↑</a></section>;
}
