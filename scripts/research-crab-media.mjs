// Read-only metadata research. Prints source-hosted media URLs; downloads no media.
const clean=s=>(s||'').replace(/<[^>]*>/g,'').replace(/&amp;/g,'&').replace(/\s+/g,' ').trim();
const categories=['Callinectes sapidus','Callinectes sapidus (illustrations)','Callinectes sapidus anatomy','Callinectes sapidus developmental stages'];
const result=[];
for(const category of categories){
 const url=new URL('https://commons.wikimedia.org/w/api.php');
 url.search=new URLSearchParams({action:'query',generator:'categorymembers',gcmtitle:'Category:'+category,gcmtype:'file',gcmlimit:'50',prop:'imageinfo',iiprop:'url|extmetadata',iiurlwidth:'960',format:'json'});
 const response=await fetch(url,{headers:{'User-Agent':'LabyrinthCrabArchive/1.0 (educational metadata inspection)'}});
 if(!response.ok)throw Error(response.status+' '+category);
 const data=await response.json();
 for(const p of Object.values(data.query?.pages||{})){const i=p.imageinfo?.[0];if(!i)continue;const m=i.extmetadata||{};result.push({title:p.title.replace(/^File:/,''),category,image:(i.thumburl||i.url).split('?')[0],original:i.url.split('?')[0],source:i.descriptionurl,description:clean(m.ImageDescription?.value),credit:clean(m.Artist?.value),license:clean(m.LicenseShortName?.value),licenseUrl:m.LicenseUrl?.value||'',date:clean(m.DateTimeOriginal?.value)})}
}
console.log(JSON.stringify(result));
