import fs from 'node:fs';
const path='app/destination-navigation.tsx';let s=fs.readFileSync(path,'utf8');
s=s.replace('export function DestinationMenus({onSubjects,onHelp}:{onSubjects:()=>void;onHelp:()=>void})','export function DestinationMenus({onHelp}:{onHelp:()=>void})');
s=s.replace('Object.entries(menus).map(([id,m])=><div','Object.entries({archive:{...menus.archive,groups:[{title:"Archive",links:[["Browse entries","?view=archive"],["Map","?view=map"],["Marketplace","?view=marketplace"],["Conservation News","?view=news"]]},{title:"Explore",links:[["Compare subjects","?view=archive#ar-lineup"],["Sources & evidence","?view=news#news-evidence"]]},{title:"Keep exploring",links:[["Investigation journal","?view=archive#ar-journal"],["Newsletter & digest","?view=news#news-digest"]]}]}}).map(([id,m])=><div');
s=s.replace('<button onMouseEnter={()=>setActive(null)} onClick={onSubjects}>Subjects</button>','<a href="?view=workshop" onMouseEnter={()=>setActive(null)}>Workshop</a><a href="?view=social" onMouseEnter={()=>setActive(null)}>Network</a>');
// The dropdown uses the same nested archive structure as the header.
s=s.replace("menus[active].groups.map((g,i)","[{title:'Archive',links:[['Browse entries','?view=archive'],['Map','?view=map'],['Marketplace','?view=marketplace'],['Conservation News','?view=news']]},...menus.archive.groups.slice(1)].map((g,i)");
fs.writeFileSync(path,s);
const ref='app/reference-features.tsx';s=fs.readFileSync(ref,'utf8');
s=s.replace("onSubjects={()=>setPanel('explore')} ",'');
s=s.replace("['./','Home'],['?view=archive','Archive'],['?view=map','Map'],['?view=marketplace','Marketplace'],['?view=news','News & digest']","['./','Home'],['?view=archive','Archive'],['?view=workshop','Workshop'],['?view=social','Network']");
s=s.replace('<small>Blue crab · physical world</small>{sections.filter', '<small>Inside Archive</small><a href="?view=map">Map</a><a href="?view=marketplace">Marketplace</a><a href="?view=news">Conservation News</a>{sections.filter');
fs.writeFileSync(ref,s);
