import fs from 'node:fs';
const csv=fs.readFileSync('.practice-qa/blue-crab-global.csv','utf8');
const rows=[];let row=[],field='',quoted=false;
for(let i=0;i<csv.length;i++){const c=csv[i];if(c==='"'){if(quoted&&csv[i+1]==='"'){field+='"';i++}else quoted=!quoted}else if(c===','&&!quoted){row.push(field);field=''}else if(c==='\n'&&!quoted){row.push(field.replace(/\r$/,''));rows.push(row);row=[];field=''}else field+=c}
const header=rows.shift();const records=rows.filter(r=>r.length===header.length).map(r=>Object.fromEntries(header.map((h,i)=>[h,r[i]])));
const points=records.map(r=>[Number(r.recordID),Number(r.decimalLongitude),Number(r.decimalLatitude),r.year==='NA'?null:Number(r.year),r.status,r.country,r.source,r.sourceID,r.noteID,r.month==='NA'?null:Number(r.month),r.day==='NA'?null:Number(r.day)]);
if(points.length!==40388||points.some(p=>!Number.isFinite(p[1])||!Number.isFinite(p[2])))throw Error('Dataset validation failed');
fs.mkdirSync('public/world-terrain',{recursive:true});
fs.writeFileSync('public/world-terrain/blue-crab-occurrences.json',JSON.stringify({title:'Mancinelli, Bardelli & Zenetos (2021): global occurrence database',doi:'https://doi.org/10.6084/m9.figshare.12896309',license:'CC0',note:'Published historical snapshot, not live telemetry. Includes source flags and note references; occurrence does not establish a movement route.',columns:['recordID','longitude','latitude','year','status','country','source','sourceID','noteID','month','day'],points}));
console.log(points.length+' records preserved');
