import {useEffect} from 'react';

/** Scroll position drives separate depth layers; native scrolling is never intercepted. */
export function useHomeScrollMotion(paused:boolean,revision:number){
 useEffect(()=>{
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const specs:[string,string,number,number][]=[
   ['.lh-orb','.lh-hero',.18,95],
   ['.lh-hero-copy','.lh-hero',.065,38],
   ['.lh-sequence>h2','.lh-sequence',.045,24],
   ['.lh-essay-photo img','.lh-essay-photo',.09,30],
   ['.lh-two-paths img','.lh-two-paths',.085,35],
   ['.lh-perspective-image','.lh-perspectives',.13,70],
   ['.lh-market-art','.lh-market-feature',.06,28],
  ];
  const layers=specs.flatMap(([selector,anchor,speed,limit])=>Array.from(document.querySelectorAll<HTMLElement>(selector)).map(el=>({el,anchor:el.closest(anchor)!,speed,limit})));
  let frame=0;
  const update=()=>{frame=0;const still=paused||reduced.matches;const vh=innerHeight;
   for(const layer of layers){const r=layer.anchor.getBoundingClientRect();const delta=vh/2-(r.top+r.height/2);const y=still?0:Math.max(-layer.limit,Math.min(layer.limit,delta*layer.speed));layer.el.style.setProperty('--scroll-y',`${y.toFixed(2)}px`)}
  };
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(update)};
  addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);reduced.addEventListener('change',schedule);schedule();
  return()=>{cancelAnimationFrame(frame);removeEventListener('scroll',schedule);removeEventListener('resize',schedule);reduced.removeEventListener('change',schedule);layers.forEach(({el})=>el.style.removeProperty('--scroll-y'))};
 },[paused,revision]);
}
