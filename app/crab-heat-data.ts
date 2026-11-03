import {populationRows} from './crab-population';
import capture from './crab-fishstat-capture.json';
const country:Record<number,[string,string]>={8:['Albania','ALB'],170:['Colombia','COL'],191:['Croatia','HRV'],192:['Cuba','CUB'],218:['Ecuador','ECU'],380:['Italy','ITA'],484:['Mexico','MEX'],558:['Nicaragua','NIC'],620:['Portugal','PRT'],724:['Spain','ESP'],792:['Türkiye','TUR'],840:['United States','USA'],862:['Venezuela','VEN']};
const grouped=new Map<string,{year:number;country:number;value:number;flags:Set<string>;areas:Set<number>}>();
for(const row of capture.rows){const [year,area,id,value]=row.slice(0,4).map(Number),flag=String(row[4]),key=id+'-'+year;const item=grouped.get(key)||{year,country:id,value:0,flags:new Set<string>(),areas:new Set<number>()};item.value+=value;item.flags.add(flag);item.areas.add(area);grouped.set(key,item)}
export const harvestRecords:HeatRecord[]=[...grouped.values()].map(r=>({region:country[r.country][0],iso:country[r.country][1],year:r.year,metric:'Harvest',value:Math.round(r.value*1000)/1000,unit:'tonnes live weight',source:capture.source,estimated:r.flags.has('I')||r.flags.has('E'),note:`FAO 2026 capture edition · Callinectes sapidus (CRB). ${[...r.flags].map(f=>capture.status[f as keyof typeof capture.status]).join('; ')}. FAO fishing areas: ${[...r.areas].join(', ')}. Reporting-country total, not catch-location density. Missing years are not zero; classification changes can affect comparisons.`}));
export type HeatMetric='Harvest'|'Imports'|'Exports'|'Population'|'Consumption';
export type HeatRecord={estimated?:boolean;region:string;iso:string;year:number;metric:HeatMetric;value:number;unit:string;source:string;note:string};
const trade='https://apps.fas.usda.gov/newgainapi/api/Report/DownloadReportByFileName?fileName=A+Booming+Venezuelan+Seafood+Industry_Caracas_Venezuela_VE2022-0020.pdf';
export const heatRecords:HeatRecord[]=[
 ...harvestRecords,
 ...([2016,2017,2018,2019,2020,2021].map((year,i):HeatRecord=>({region:'Venezuela',iso:'VEN',year,metric:'Exports',value:[1674,2363,2899,2916,2457,2726][i],unit:'tonnes',source:trade,note:'Venezuelan blue-crab exports to the United States only; not worldwide exports from every country.'}))),
 ...(populationRows.map(([year,,,,total]):HeatRecord=>({region:'Chesapeake Bay',iso:'CHES',year,metric:'Population',value:total,unit:'million crabs',source:'https://dnr.maryland.gov/fisheries/Pages/blue-crab/dredge.aspx',note:'Winter Dredge Survey total abundance for the whole bay. Regional marker, not within-bay density.'})))
];
export function selectHeatRecords(metric:HeatMetric,year:number){return heatRecords.filter(r=>r.metric===metric&&r.year===year)}
