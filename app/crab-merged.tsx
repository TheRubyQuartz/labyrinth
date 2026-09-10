import type {ReactNode} from 'react';
import merged from './crab-merged.json';
import profiles from './archive-articles.json';
type Paragraph={text:string;origin:string;sources:string[]};
type Section={id:string;title:string;paragraphs:Paragraph[];children:Section[]};
const sections:Section[]=merged.sections;
const refs:Record<string,{title:string;url:string}>=profiles.references;
const collect=(ss:{sources:string[];children:any[]}[]):string[]=>ss.flatMap(s=>[...s.sources,...collect(s.children)]);
const sourceIds=Array.from(new Set(collect(profiles.articles['SP-001'])));
export function MergedCrabContents({link}:{link:(target:string,label:string)=>ReactNode}){
 const render=(ss:Section[]):ReactNode=><ul>{ss.map(s=><li key={s.id}>{s.children.length?<details open><summary>{link(s.id,s.title)}</summary>{render(s.children)}</details>:link(s.id,s.title)}</li>)}</ul>;
 return render(sections);
}
export function MergedCrabArticle(){
 function paragraph(p:Paragraph,i:number){const text=p.origin==='general'?p.text.split(/(\[\d+\])/g).map((part,j)=>/^\[\d+\]$/.test(part)?<sup key={j}><a href={'#crab-reference-'+part.slice(1,-1)} aria-label={'Crab reference '+part.slice(1,-1)}>{part}</a></sup>:part):p.text;return <p className="crab-original-paragraph" key={i}>{text}{p.sources.map(source=><sup key={source}><a href={'#reference-'+source} aria-label={refs[source].title}>[{sourceIds.indexOf(source)+1}]</a></sup>)}</p>}
 function section(s:Section,depth:number):ReactNode{const Heading=depth===0?'h2':depth===1?'h3':depth===2?'h4':'h5';return <section id={s.id} key={s.id}><Heading>{s.title}</Heading>{s.paragraphs.map(paragraph)}{s.children.map(child=>section(child,depth+1))}</section>}
 return <div className="article-prose full-crab">{merged.intro.map(paragraph)}{sections.map(s=>section(s,0))}</div>;
}
