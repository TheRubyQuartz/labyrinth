export type ResearchView={from:string;to:string;topic:string;search:string;order:'oldest'|'newest';mode:'timeline'|'table'};
export const defaultResearchView:ResearchView={from:'',to:'',topic:'All topics',search:'',order:'oldest',mode:'timeline'};
export function normalizeResearchView(value:unknown):ResearchView{
 const v=value&&typeof value==='object'?value as Record<string,unknown>:{};
 const year=(x:unknown)=>typeof x==='string'&&/^[12]\d{3}$/.test(x)?x:'';
 return {from:year(v.from),to:year(v.to),topic:typeof v.topic==='string'?v.topic.slice(0,200):'All topics',search:typeof v.search==='string'?v.search.slice(0,500):'',order:v.order==='newest'?'newest':'oldest',mode:v.mode==='table'?'table':'timeline'};
}
export function researchViewFromParams(params:URLSearchParams):ResearchView{
 return normalizeResearchView({from:params.get('from-year'),to:params.get('to-year'),topic:params.get('topic'),search:params.get('evidence-query'),order:params.get('order'),mode:params.get('display')});
}
export function researchViewParams(view:ResearchView){return {'from-year':view.from,'to-year':view.to,topic:view.topic,'evidence-query':view.search,order:view.order,display:view.mode};}
