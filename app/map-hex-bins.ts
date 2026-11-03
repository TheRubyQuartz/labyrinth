// Web-Mercator hexagons are a visualization grid, not equal-area population density.
const R=6378137,rad=Math.PI/180;
const unproject=(x:number,y:number):[number,number]=>[x/R/rad,(2*Math.atan(Math.exp(y/R))-Math.PI/2)/rad];
export function hexBins(rows:readonly (readonly unknown[])[],size=100000){
 const bins=new Map<string,{x:number;y:number;count:number;ring:[number,number][]}>();
 for(const p of rows){const lon=Number(p[1]),lat=Number(p[2]);if(!Number.isFinite(lon)||!Number.isFinite(lat)||Math.abs(lat)>85||Math.abs(lon)>180)continue;
 const x=R*lon*rad,y=R*Math.log(Math.tan(Math.PI/4+lat*rad/2)),q=(Math.sqrt(3)/3*x-y/3)/size,s=2*y/3/size;
 let a=Math.round(q),b=Math.round(-q-s),c=Math.round(s);const da=Math.abs(a-q),db=Math.abs(b+q+s),dc=Math.abs(c-s);if(da>db&&da>dc)a=-b-c;else if(db>dc)b=-a-c;else c=-a-b;
 const key=`${a}:${c}`;let bin=bins.get(key);if(!bin){const cx=size*Math.sqrt(3)*(a+c/2),cy=size*1.5*c;bin={x:cx,y:cy,count:0,ring:Array.from({length:6},(_,i)=>unproject(cx+size*Math.cos((60*i-30)*rad),cy+size*Math.sin((60*i-30)*rad)))};bins.set(key,bin)}bin.count++;
 }return [...bins.values()];
}
