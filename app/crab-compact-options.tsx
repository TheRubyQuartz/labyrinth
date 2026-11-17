import {Children,Fragment,isValidElement,useState} from 'react';
import type {ReactNode} from 'react';
import './crab-compact-options.css';
function items(children:ReactNode):ReactNode[]{return Children.toArray(children).flatMap(c=>isValidElement(c)&&c.type===Fragment?items((c.props as {children:ReactNode}).children):[c])}
/** Keep values mounted while progressively revealing small groups of controls. */
export function CrabCompactOptions({children,label='More options'}:{children:ReactNode;label?:string}){
 const list=items(children),[page,setPage]=useState(0);const pages=Math.ceil(list.length/3),current=Math.min(page,Math.max(0,pages-1));
 if(list.length<=3)return <>{children}</>;
 return <>{list.map((child,i)=><div className="crab-compact-option" hidden={Math.floor(i/3)!==current} key={isValidElement(child)?child.key||i:i}>{child}</div>)}<div className="crab-compact-pager">{current>0&&<button type="button" onClick={()=>setPage(current-1)}>← Previous options</button>}<span>{current*3+1}–{Math.min(current*3+3,list.length)} of {list.length}</span><button type="button" onClick={()=>setPage(current===pages-1?0:current+1)}>{current===pages-1?'Back to first options':label+' →'}</button></div></>;
}
