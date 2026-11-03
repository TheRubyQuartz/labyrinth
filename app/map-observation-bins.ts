// Angular aggregation expresses sampling intensity, never animal abundance.
export function binObservations(rows: readonly (readonly unknown[])[], degrees:number){
 const bins=new Map<string,{lon:number;lat:number;count:number;native:number;introduced:number}>();
 for(const p of rows){const lon=Number(p[1]),lat=Number(p[2]);if(!Number.isFinite(lon)||!Number.isFinite(lat)||Math.abs(lat)>90||Math.abs(lon)>180)continue;
 const x=Math.min(Math.ceil(360/degrees)-1,Math.floor((lon+180)/degrees)),y=Math.min(Math.ceil(180/degrees)-1,Math.floor((lat+90)/degrees));const key=`${x}/${y}`;
 const b=bins.get(key)||{lon:-180+(x+.5)*degrees,lat:-90+(y+.5)*degrees,count:0,native:0,introduced:0};b.count++;if(p[4]==='NAT')b.native++;else b.introduced++;bins.set(key,b)}return [...bins.values()];
}
