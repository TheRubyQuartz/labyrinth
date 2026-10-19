// GIS heights remain in metres. Visual exaggeration is applied by the renderer only.
export async function createGlobalTerrain(C:any,status:(message:string)=>void){
 const response=await fetch(`${import.meta.env.BASE_URL}world-terrain/etopo1-degree.bin`);if(!response.ok)throw Error('NOAA fallback grid unavailable');
 const grid=new Int16Array(await response.arrayBuffer());const cache=new Map<string,Promise<Uint8ClampedArray>>();
 const polar=await Promise.all(['north','south'].map(async name=>{const r=await fetch(`${import.meta.env.BASE_URL}world-terrain/polar-${name}-5min.bin`);if(!r.ok)throw Error('Polar terrain grid unavailable');return new Int16Array(await r.arrayBuffer())}));
 function interpolate(data:Int16Array,width:number,height:number,x:number,y:number){x=Math.max(0,Math.min(width-1,x));y=Math.max(0,Math.min(height-1,y));const i=Math.min(width-2,Math.floor(x)),j=Math.min(height-2,Math.floor(y)),u=x-i,v=y-j;return data[j*width+i]*(1-u)*(1-v)+data[j*width+i+1]*u*(1-v)+data[(j+1)*width+i]*(1-u)*v+data[(j+1)*width+i+1]*u*v}
 const fallback=(lon:number,lat:number)=>lat>=80?interpolate(polar[0],4321,121,(lon+180)*12,(lat-80)*12):lat<=-80?interpolate(polar[1],4321,121,(lon+180)*12,(lat+90)*12):interpolate(grid,361,181,lon+180,lat+90);
 function pixels(z:number,x:number,y:number){const key=`${z}/${x}/${y}`;if(cache.has(key))return cache.get(key)!;const request=(async()=>{const r=await fetch(`https://elevation-tiles-prod.s3.amazonaws.com/terrarium/${key}.png`,{signal:AbortSignal.timeout(16000)});if(!r.ok)throw Error('Elevation tile unavailable');const bitmap=await createImageBitmap(await r.blob());const canvas=document.createElement('canvas');canvas.width=canvas.height=256;const ctx=canvas.getContext('2d',{willReadFrequently:true})!;ctx.drawImage(bitmap,0,0);bitmap.close();return ctx.getImageData(0,0,256,256).data})();cache.set(key,request);if(cache.size>140)cache.delete(cache.keys().next().value!);return request}
 const scheme=new C.GeographicTilingScheme();let warned=false;
 return new C.CustomHeightmapTerrainProvider({width:65,height:65,tilingScheme:scheme,credit:new C.Credit('Terrain: Mapzen / Tilezen, USGS, SRTM, ETOPO1 · NOAA polar relief'),callback:async(x:number,y:number,level:number)=>{
  const rect=scheme.tileXYToRectangle(x,y,level);const west=C.Math.toDegrees(rect.west),east=C.Math.toDegrees(rect.east),south=C.Math.toDegrees(rect.south),north=C.Math.toDegrees(rect.north);const out=new Float32Array(65*65);
  for(let j=0;j<65;j++)for(let i=0;i<65;i++)out[j*65+i]=fallback(west+(east-west)*i/64,north-(north-south)*j/64);
  if(level<2)return out;
  // NOAA's geographic grid covers both poles, outside Mercator tile coverage.
  if(south>=80||north<=-80)return out;
  const z=Math.max(0,Math.min(12,level+Math.floor(Math.log2(Math.max(.15,Math.cos((north+south)*Math.PI/360))))));const n=2**z;
  const locations:{key:string;px:number;py:number}[]=[];const requests=new Map<string,Promise<Uint8ClampedArray>>();
  for(let j=0;j<65;j++)for(let i=0;i<65;i++){const lon=west+(east-west)*i/64,lat=north-(north-south)*j/64;if(Math.abs(lat)>=80){locations.push({key:'polar',px:0,py:0});continue}const xx=Math.min(n-1e-8,Math.max(0,(lon+180)/360*n)),yy=Math.min(n-1e-8,Math.max(0,(1-Math.asinh(Math.tan(lat*Math.PI/180))/Math.PI)/2*n));const tx=Math.floor(xx),ty=Math.floor(yy),key=`${tx}/${ty}`;locations.push({key,px:Math.min(255,Math.floor((xx-tx)*256)),py:Math.min(255,Math.floor((yy-ty)*256))});if(!requests.has(key))requests.set(key,pixels(z,tx,ty))}
  const tiles=new Map<string,Uint8ClampedArray>();await Promise.all([...requests].map(async([key,p])=>{try{tiles.set(key,await p)}catch{if(!warned){status('Some elevation tiles are unavailable; affected areas use coarse NOAA fallback.');warned=true}}}));
  locations.forEach((p,i)=>{const data=tiles.get(p.key);if(data){const k=(p.py*256+p.px)*4;out[i]=data[k]*256+data[k+1]+data[k+2]/256-32768}});return out;
 }});
}
