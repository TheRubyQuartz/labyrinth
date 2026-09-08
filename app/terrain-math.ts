export type GeoPoint = {lon:number;lat:number};
export type ElevationGrid = {width:number;height:number;bounds:number[];values:(number|null)[]};
const rad=Math.PI/180;
export function sampleElevation(grid:ElevationGrid,lon:number,lat:number):number|null{
 const [west,south,east,north]=grid.bounds;
 const x=(lon-west)/(east-west)*grid.width-.5,y=(north-lat)/(north-south)*grid.height-.5;
 if(x<0||y<0||x>grid.width-1||y>grid.height-1)return null;
 const i=Math.min(Math.floor(x),grid.width-2),j=Math.min(Math.floor(y),grid.height-2),u=x-i,v=y-j;
 const a=grid.values[j*grid.width+i],b=grid.values[j*grid.width+i+1],c=grid.values[(j+1)*grid.width+i],d=grid.values[(j+1)*grid.width+i+1];
 if(a===null||b===null||c===null||d===null)return null;
 return a*(1-u)*(1-v)+b*u*(1-v)+c*(1-u)*v+d*u*v;
}
export function distanceMeters(a:GeoPoint,b:GeoPoint){const lat=(b.lat-a.lat)*rad,lon=(b.lon-a.lon)*rad;const q=Math.sin(lat/2)**2+Math.cos(a.lat*rad)*Math.cos(b.lat*rad)*Math.sin(lon/2)**2;return 6371008.8*2*Math.atan2(Math.sqrt(q),Math.sqrt(Math.max(0,1-q)))}
export function pathDistance(points:GeoPoint[]){return points.reduce((sum,p,i)=>sum+(i?distanceMeters(points[i-1],p):0),0)}
export function areaMeters(points:GeoPoint[]){if(points.length<3)return 0;let sum=0;for(let i=0;i<points.length;i++){const a=points[i],b=points[(i+1)%points.length];sum+=(b.lon-a.lon)*rad*(2+Math.sin(a.lat*rad)+Math.sin(b.lat*rad))}return Math.abs(sum)*6371008.8**2/2}
export function isCrossed(points:GeoPoint[]){const cross=(a:GeoPoint,b:GeoPoint,c:GeoPoint)=>(b.lon-a.lon)*(c.lat-a.lat)-(b.lat-a.lat)*(c.lon-a.lon);const n=points.length;if(n<4)return false;for(let i=0;i<n;i++)for(let j=i+1;j<n;j++){if(j===i+1||(i===0&&j===n-1))continue;const a=points[i],b=points[(i+1)%n],c=points[j],d=points[(j+1)%n];if(cross(a,b,c)*cross(a,b,d)<0&&cross(c,d,a)*cross(c,d,b)<0)return true}return false}
export function profileSamples(grid:ElevationGrid,points:GeoPoint[]){const output:{distance:number;elevation:number|null}[]=[];let offset=0;for(let i=1;i<points.length;i++){const a=points[i-1],b=points[i],length=distanceMeters(a,b);for(let j=i===1?0:1;j<=24;j++){const t=j/24;output.push({distance:offset+length*t,elevation:sampleElevation(grid,a.lon+(b.lon-a.lon)*t,a.lat+(b.lat-a.lat)*t)})}offset+=length}return output}
