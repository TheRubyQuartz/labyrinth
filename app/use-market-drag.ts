import {useEffect} from 'react';
/** Mouse dragging complements native touch, trackpad, scrollbar and arrow scrolling. */
export function useMarketDrag(){useEffect(()=>{
 const rails=Array.from(document.querySelectorAll<HTMLElement>('.xr-products,.edu-rail,.market-category-rail'));
 const cleanup=rails.map(rail=>{let startX=0,startY=0,left=0,down=false,moved=false;
 const downHandler=(e:PointerEvent)=>{if(e.pointerType!=='mouse'||e.button!==0)return;startX=e.clientX;startY=e.clientY;left=rail.scrollLeft;down=true;moved=false};
 const move=(e:PointerEvent)=>{if(!down)return;const dx=e.clientX-startX;if(!moved&&(Math.abs(dx)<7||Math.abs(dx)<Math.abs(e.clientY-startY)))return;moved=true;rail.classList.add('is-dragging');rail.setPointerCapture(e.pointerId);rail.scrollLeft=left-dx;e.preventDefault()};
 const up=()=>{down=false;rail.classList.remove('is-dragging')};
 const click=(e:MouseEvent)=>{if(moved){e.preventDefault();e.stopPropagation();moved=false}};
 const drag=(e:DragEvent)=>e.preventDefault();
 rail.addEventListener('pointerdown',downHandler);rail.addEventListener('pointermove',move);rail.addEventListener('pointerup',up);rail.addEventListener('pointercancel',up);rail.addEventListener('click',click,true);rail.addEventListener('dragstart',drag);
 return()=>{rail.removeEventListener('pointerdown',downHandler);rail.removeEventListener('pointermove',move);rail.removeEventListener('pointerup',up);rail.removeEventListener('pointercancel',up);rail.removeEventListener('click',click,true);rail.removeEventListener('dragstart',drag)};
 });return()=>cleanup.forEach(fn=>fn());
 },[])}
