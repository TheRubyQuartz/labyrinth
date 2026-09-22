import {useEffect,useRef,useState} from 'react';
import type {PointerEvent as PE} from 'react';
export type TimeWindow={young:number;size:number};
export function boundTime(w:TimeWindow):TimeWindow{const size=Math.min(520,Math.max(5,w.size));return {size,young:Math.max(0,Math.min(520-size,w.young))}}
export function zoomTime(w:TimeWindow,factor:number,u=.5):TimeWindow{const size=Math.min(520,Math.max(5,w.size*factor)),age=w.young+(1-u)*w.size;return boundTime({size,young:age-(1-u)*size})}
export function useEvolutionCamera(onSelect:(id:string)=>void,onInteract:()=>void,canvasWidth:number,left:number,span:number){
 const [view,setView]=useState<TimeWindow>({young:0,size:520});const current=useRef(view),target=useRef(view),flight=useRef(0),paint=useRef(0),points=useRef(new Map<number,number>());
 const callbacks=useRef({onSelect,onInteract});callbacks.current={onSelect,onInteract};
 const gesture=useRef<{x:number;distance:number;view:TimeWindow;width:number;left:number;moved:boolean;id?:string}|null>(null);
 function stop(){cancelAnimationFrame(flight.current);target.current=current.current}
 function direct(w:TimeWindow){current.current=boundTime(w);if(!paint.current)paint.current=requestAnimationFrame(()=>{paint.current=0;setView(current.current)})}
 function go(w:TimeWindow,animate=true){stop();const from=current.current,to=boundTime(w);target.current=to;if(!animate||matchMedia('(prefers-reduced-motion: reduce)').matches){direct(to);return}const start=performance.now();const step=(now:number)=>{const t=Math.min(1,(now-start)/360),k=t*t*(3-2*t);direct({young:from.young+(to.young-from.young)*k,size:from.size+(to.size-from.size)*k});if(t<1)flight.current=requestAnimationFrame(step)};flight.current=requestAnimationFrame(step)}
 function zoom(factor:number,u=.5){callbacks.current.onInteract();go(zoomTime(target.current,factor,u))}
 function center(){const p=[...points.current.values()];return {x:p.reduce((s,x)=>s+x,0)/p.length,distance:p.length>1?Math.abs(p[0]-p[1]):0}}
 function rebase(el:SVGSVGElement,id?:string,moved=false){const c=center(),rect=el.getBoundingClientRect();gesture.current={...c,view:current.current,width:rect.width*span/canvasWidth,left:rect.left+rect.width*left/canvasWidth,id,moved}}
 function down(e:PE<SVGSVGElement>){if(e.button!==0)return;callbacks.current.onInteract();stop();e.currentTarget.focus({preventScroll:true});e.currentTarget.setPointerCapture(e.pointerId);points.current.set(e.pointerId,e.clientX);rebase(e.currentTarget,(e.target as Element).closest('[data-node]')?.getAttribute('data-node')||undefined,points.current.size>1)}
 function move(e:PE<SVGSVGElement>){if(!points.current.has(e.pointerId)||!gesture.current)return;points.current.set(e.pointerId,e.clientX);const c=center(),g=gesture.current,dx=c.x-g.x;g.moved ||= Math.abs(dx)>4||points.current.size>1;if(!g.moved)return;const w=g.distance>0&&c.distance>0?zoomTime(g.view,g.distance/c.distance,(g.x-g.left)/g.width):g.view;direct({...w,young:w.young+dx/g.width*w.size});target.current=current.current}
 function up(e:PE<SVGSVGElement>){const g=gesture.current;points.current.delete(e.pointerId);if(e.currentTarget.hasPointerCapture(e.pointerId))e.currentTarget.releasePointerCapture(e.pointerId);if(points.current.size){rebase(e.currentTarget,undefined,true);return}gesture.current=null;if(g?.id&&!g.moved)callbacks.current.onSelect(g.id)}
 function cancel(){points.current.clear();gesture.current=null;stop()}
 useEffect(()=>()=>{cancelAnimationFrame(flight.current);cancelAnimationFrame(paint.current)},[]);
 return {view,go,zoom,handlers:{onPointerDown:down,onPointerMove:move,onPointerUp:up,onPointerCancel:cancel,onLostPointerCapture:(e:PE<SVGSVGElement>)=>{if(points.current.has(e.pointerId))cancel()},onDoubleClick:(e:React.MouseEvent<SVGSVGElement>)=>{const rect=e.currentTarget.getBoundingClientRect();zoom(e.shiftKey?2:.5,((e.clientX-rect.left)/rect.width*canvasWidth-left)/span)}}};
}
