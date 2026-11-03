import {lazy,Suspense,useMemo,useState} from 'react';
import type {BayRecord} from './chesapeake-data';
import type {ActivitySelection} from './map-activity';
import {DeferredMapBoundary} from './deferred-map-boundary';
const Terrain=lazy(()=>import('./global-map'));
export function SubjectMap({record}:{record:BayRecord}){
 const records=useMemo(()=>[record],[record]);
 const [selected,setSelected]=useState<string|null>(null);
 const [activity,setActivity]=useState<ActivitySelection>({speciesId:record.id,month:new Date().getMonth(),scale:'monthly'});
 return <div className="crab-movement-map xr-view-map"><DeferredMapBoundary onReturn={()=>{location.href='?view=archive'}}><Suspense fallback={<p role="status">Loading {record.name} map…</p>}><Terrain records={records} selected={selected} onSelect={r=>setSelected(r.id)} activity={activity} onActivityChange={setActivity} onOpenCalendar={()=>document.getElementById(record.id==='SP-001'?'movement-calendar':'history')?.scrollIntoView({block:'start'})}/></Suspense></DeferredMapBoundary></div>;
}
