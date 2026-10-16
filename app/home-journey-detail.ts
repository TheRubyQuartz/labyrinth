import * as T from 'three';
import land from './crab-world-land.json';

// Geographic outlines and instrument markings are geometry, not flat UI panels.
export function addJourneyDetail(index:number,group:T.Group,geometries:T.BufferGeometry[],materials:T.Material[]){
 const ink=new T.LineBasicMaterial({color:'#cbd8ba',transparent:true,opacity:.65});materials.push(ink);
 const line=(points:T.Vector3[])=>{const g=new T.BufferGeometry().setFromPoints(points);geometries.push(g);group.add(new T.Line(g,ink))};
 if(index===1){
  const project=(lon:number,lat:number,r=2.83)=>{const a=lon*Math.PI/180,b=lat*Math.PI/180;return new T.Vector3(r*Math.cos(b)*Math.sin(a),r*Math.sin(b),r*Math.cos(b)*Math.cos(a))};
  for(const polygon of land)line(polygon.map(p=>project(p[0],p[1])));
  for(let lat=-60;lat<=60;lat+=30)line(Array.from({length:181},(_,i)=>project(i*2-180,lat,2.82)));
  for(let lon=-180;lon<180;lon+=30)line(Array.from({length:91},(_,i)=>project(lon,i*2-90,2.82)));
 }
 if([2,6,7,9].includes(index))for(let i=0;i<120;i++){const a=i/120*Math.PI*2,r=index===7?1.03:3.25;line([new T.Vector3(Math.cos(a)*r,Math.sin(a)*r,0),new T.Vector3(Math.cos(a)*(r+(i%10===0?.16:.06)),Math.sin(a)*(r+(i%10===0?.16:.06)),0)])}
 if(index===5)for(let j=0;j<12;j++)line([new T.Vector3(-1.35,1.37,-.9+j*.14),new T.Vector3(j%3===0?.55:1.3,1.37,-.9+j*.14)]);
 return ink;
}
