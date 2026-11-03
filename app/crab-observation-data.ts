export type ChangeEntry={id:string;date:string;place:string;metric:string;value:string;unit:string;note:string;source:string;kind:string;method?:string};
export function isChangeEntry(value:unknown):value is ChangeEntry{
 if(!value||typeof value!=='object')return false;
 const r=value as Record<string,unknown>;
 if(!['id','date','place','metric','value','unit','note','source','kind'].every(k=>typeof r[k]==='string'))return false;
 const date=String(r.date);
 if(!/^\d{4}-\d{2}-\d{2}$/.test(date))return false;
 const parsed=new Date(date+'T00:00:00Z');
 return Number.isFinite(parsed.getTime())&&parsed.toISOString().slice(0,10)===date&&(r.method===undefined||typeof r.method==='string')&&(!String(r.value).trim()||Number.isFinite(Number(r.value)));
}
export function observationSeriesKey(r:ChangeEntry){return JSON.stringify([r.metric,r.unit,r.place,r.method||'',r.kind])}
export function comparableObservations(a:ChangeEntry,b:ChangeEntry){return !!a.place.trim()&&!!a.method?.trim()&&observationSeriesKey(a)===observationSeriesKey(b)&&[a,b].every(r=>r.value.trim()!==''&&Number.isFinite(Number(r.value)))}
export function readHistoryImport(input:unknown,section:string):ChangeEntry[]{
 if(!input||typeof input!=='object')throw Error('Choose an exported Labyrinth history file.');
 const data=input as {subject?:unknown;section?:unknown;records?:unknown};
 if(data.subject!=='Callinectes sapidus'||data.section!==section)throw Error('This history belongs to a different subject or section.');
 if(!Array.isArray(data.records)||data.records.length>5000||!data.records.every(isChangeEntry))throw Error('The file contains invalid records, dates, or values (maximum 5,000 records).');
 return data.records;
}
