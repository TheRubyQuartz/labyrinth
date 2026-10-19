import * as T from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';

// Notre-Dame-inspired western facade: square bell towers, three portals and rose tracery.
// Surface 5/6 identifies hinged door leaves; 7 is the animated portal membrane.
export function buildPortalCathedral(save,originalBlocks){
 const parts=[],lines=[];let serial=0;
 // Photo-matched vertical bands: portals, Kings' Gallery, rose, open arcade, belfries.
 const bands=[[0,0],[3.52,2.7],[4.16,3.35],[5.72,5.25],[5.87,5.55],[7.8,8.05]];
 function facadeY(y){if(y<0)return y;for(let i=1;i<bands.length;i++)if(y<=bands[i][0]){const a=bands[i-1],b=bands[i];return a[1]+(y-a[0])/(b[0]-a[0])*(b[1]-a[1])}return 8.05+y-7.8}
 function part(g,pos=[0,0,0],surface=0,emission=.95){
  if(!g.index)g.setIndex(Array.from({length:g.attributes.position.count},(_,i)=>i));
  g.translate(...pos);const vertices=g.attributes.position;for(let i=0;i<vertices.count;i++)vertices.setY(i,facadeY(vertices.getY(i)));g.computeVertexNormals();g.scale(1.36,1.03,1.55);g.rotateY(-Math.PI/4);const center=new T.Vector3(pos[0]*1.36,facadeY(pos[1])*1.03,pos[2]*1.55).applyAxisAngle(new T.Vector3(0,1,0),-Math.PI/4),n=g.attributes.position.count;
  const originalEmission=g.attributes.emission;
  for(const key of Object.keys(g.attributes))if(!['position','normal','uv'].includes(key))g.deleteAttribute(key);
  if(!g.attributes.uv)g.setAttribute('uv',new T.Float32BufferAttribute(new Float32Array(n*2),2));
  const centr=[],rand=[],ids=[],surfaces=[],em=[];
  for(let i=0;i<n;i++){centr.push(...center.toArray());rand.push(.45+serial*.618% .5,.25+serial*.337%.5,.3+serial*.713%.6);ids.push(serial);surfaces.push(surface);em.push(surface===0&&originalEmission?originalEmission.getX(i):emission)}
  for(const [key,a,size]of [['centr',centr,3],['rand',rand,3],['batchId',ids,1],['surface',surfaces,1],['emission',em,1]])g.setAttribute(key,new T.Float32BufferAttribute(a,size));
  parts.push(g);const e=new T.EdgesGeometry(g,45);lines.push(...e.attributes.position.array);serial++;
 }
 let blockIndex=0;
 const sourceIds=[8,9,18,28,31,36];
 // Reuse the authored block meshes and their UV/emission data, not procedural boxes.
 const box=(w,h,d)=>{
  if(w<.18||h<.25||d<.2)return new RoundedBoxGeometry(w,h,d,1,Math.min(w,h,d)*.15);
  const g=originalBlocks[sourceIds[blockIndex++%sourceIds.length]].clone();
  g.computeBoundingBox();let center=g.boundingBox.getCenter(new T.Vector3());g.translate(-center.x,-center.y,-center.z);
  // Align the original curved wall block's longest horizontal principal axis with the course.
  let xx=0,zz=0,xz=0;const p=g.attributes.position;for(let i=0;i<p.count;i++){xx+=p.getX(i)**2;zz+=p.getZ(i)**2;xz+=p.getX(i)*p.getZ(i)}
  const angle=.5*Math.atan2(2*xz,xx-zz);g.rotateY(angle);g.computeBoundingBox();center=g.boundingBox.getCenter(new T.Vector3());const size=g.boundingBox.getSize(new T.Vector3());g.translate(-center.x,-center.y,-center.z);g.scale(w*1.24/size.x,h*1.2/size.y,d/size.z);return g;
 };
 function rib(points,r=.045,surface=2){const curve=new T.CatmullRomCurve3(points.map(p=>new T.Vector3(...p)));const g=new T.TubeGeometry(curve,24,r,6,false);part(g,[0,0,0],surface,surface===3?1:.85)}
 function arch(width,height,z,r=.06,surface=2){for(const side of [-1,1])rib([[side*width,0,z],[side*width,height*.5,z],[side*width*.77,height*.77,z],[side*width*.38,height*.94,z],[0,height,z]],r,surface)}
 // Solid staggered ashlar facade, with three recessed portals and a central rose.
 const course=.49;
 for(let row=0;row<12;row++)for(let col=0;col<13;col++){
  const x=(col-6)*.46,y=.245+row*course;
  const centerOpening=Math.abs(x)<1.03&&y<3.52-Math.max(0,Math.abs(x)-.2)*1.1;
  const sideOpening=Math.abs(Math.abs(x)-2.12)<.68&&y<3.05-Math.max(0,Math.abs(Math.abs(x)-2.12)-.2)*.8;
  const roseOpening=x*x+(y-4.85)**2<.72**2;
  if(centerOpening||sideOpening||roseOpening)continue;
  part(box(.455,.475,1.45),[x,y,-.345],0);
 }
 for(const side of [-1,1]){
  const x=side*2.12;
  // Two heavy square towers with paired, deeply inset belfry openings.
  for(let row=0;row<5;row++){
   const y=6.05+row*.34;
   for(const dx of [-.76,0,.76])part(box(dx===0?.19:.27,.328,1.7),[x+dx,y,-.48],0);
   for(const z of [-1.28,-.94,-.6])for(const dx of [-.69,.69])part(box(.3,.328,.33),[x+dx,y,z],0);
   for(let col=0;col<5;col++)part(box(.34,.328,.26),[x+(col-2)*.34,y,-1.38],0);
  }
  for(const dx of [-.38,.38]){
   part(box(.49,1.55,.035),[x+dx,6.75,-.8],1,.25);
   rib([[x+dx-.24,6.0,.39],[x+dx-.24,7.0,.39],[x+dx,7.37,.39],[x+dx+.24,7.0,.39],[x+dx+.24,6.,.39]],.055,0);
   for(const offset of [-.08,.08])part(box(.028,1.13,.03),[x+dx+offset,6.55,.43],2,.8);
  }
  for(const y of [5.87,7.65])part(box(1.92,.16,1.97),[x,y,-.48],0);
  for(let col=0;col<6;col++)part(box(.29,.22,1.86),[x+(col-2.5)*.3,7.8,-.48],0);
  // Strong vertical buttresses establish the facade's mass from foundation to roof.
  for(const dx of [-.86,.86])for(let row=0;row<20;row++)part(box(.28,.37,.55),[x+dx,.185+row*.375,.49],0);
  // Smaller side portals, with nested archivolts and solid inset doors.
  part(box(1.3,2.95,.1),[x,1.475,-.15],1,.35);
  for(let layer=0;layer<3;layer++){
   const w=.67+layer*.065,h=3.05+layer*.09;
   rib([[x-w,0,.5+layer*.05],[x-w,1.65,.5+layer*.05],[x-w*.65,h-.25,.5+layer*.05],[x,h,.5+layer*.05],[x+w*.65,h-.25,.5+layer*.05],[x+w,1.65,.5+layer*.05],[x+w,0,.5+layer*.05]],.065,layer===1?2:0);
  }
  for(let j=0;j<5;j++)part(box(.025,2.05,.04),[x+(j-2)*.16,1.04,.04],2,.65);
 }
 // The horizontal Gallery of Kings and upper openwork arcade.
 // Side lancets and quatrefoils flank the rose, as in both supplied facade references.
 for(const side of [-1,1]){
  const x=side*2.12;
  for(const offset of [-.24,.24]){
   part(box(.32,.72,.06),[x+offset,4.64,.68],1,.3);
   rib([[x+offset-.18,4.27,.77],[x+offset-.18,4.89,.77],[x+offset,5.12,.77],[x+offset+.18,4.89,.77],[x+offset+.18,4.27,.77]],.042,0);
  }
  for(let q=0;q<4;q++)part(new T.TorusGeometry(.085,.018,6,16),[x+Math.sin(q*Math.PI/2)*.065,5.27+Math.cos(q*Math.PI/2)*.065,.73],0);
  for(let i=0;i<6;i++){const xx=x+(i-2.5)*.25;part(box(.043,.43,.16),[xx,5.46,.7],0);rib([[xx-.1,5.58,.7],[xx,5.72,.7],[xx+.1,5.58,.7]],.025,0)}
 }
 for(const y of [3.69,4.16,5.72])part(box(6.15,.13,1.62),[0,y,-.08],0);
 for(let i=0;i<28;i++){
  const x=(i-13.5)*.21;
  part(new T.CylinderGeometry(.04,.065,.27,8),[x,3.91,.77],0,.92);
  part(new T.SphereGeometry(.057,8,6),[x,4.075,.77],0,.92);
  part(box(.025,.4,.06),[x+.115,3.94,.74],2,.8);
 }
 for(let i=0;i<13;i++){
  const x=(i-6)*.2;part(new T.CylinderGeometry(.027,.035,.43,8),[x,5.47,.52],0,.9);
  rib([[x-.095,5.58,.52],[x,5.72,.52],[x+.095,5.58,.52]],.025,2);
 }
 // Deep central rose with layered radial stone and luminous stained-glass tracery.
 part(new T.CylinderGeometry(.72,.72,.12,64).rotateX(Math.PI/2),[0,4.85,.17],1,.5);
 for(const radius of [.73,.64,.36,.13])part(new T.TorusGeometry(radius,.035,8,64),[0,4.85,.38],radius===.64?3:0,.95);
 for(let i=0;i<24;i++){const a=i*Math.PI/12;rib([[Math.sin(a)*.14,4.85+Math.cos(a)*.14,.4],[Math.sin(a+.05)*.4,4.85+Math.cos(a+.05)*.4,.4],[Math.sin(a)*.65,4.85+Math.cos(a)*.65,.4]],.018,i%3===0?3:2)}
 // Deep pointed portal surround: concentric illuminated archivolts and runic studs.
 for(let i=0;i<5;i++)arch(1.02+i*.085,3.52+i*.105,.65-i*.075,.052,i%2?3:2);
 for(const side of [-1,1])for(let i=0;i<10;i++)part(new T.OctahedronGeometry(.052),[side*1.19,.22+i*.27,.69],3,1);
 const shape=new T.Shape();shape.moveTo(-1,0);shape.lineTo(1,0);shape.lineTo(1,2.15);shape.bezierCurveTo(.98,2.7,.45,3.3,0,3.52);shape.bezierCurveTo(-.45,3.3,-.98,2.7,-1,2.15);shape.closePath();
 const portal=new T.ShapeGeometry(shape,40);const uv=[];for(let i=0;i<portal.attributes.position.count;i++)uv.push((portal.attributes.position.getX(i)+1)/2,portal.attributes.position.getY(i)/3.52);portal.setAttribute('uv',new T.Float32BufferAttribute(uv,2));part(portal,[0,0,.12],7,1);
 // Each decorated door is a single rigid leaf, so it swings around its own jamb.
 for(const side of [-1,1]){
  const door=new T.Shape();door.moveTo(0,0);door.lineTo(side*.99,0);door.lineTo(side*.99,2.12);door.bezierCurveTo(side*.94,2.68,side*.42,3.29,0,3.5);door.closePath();
  const pieces=[new T.ExtrudeGeometry(door,{depth:.10,bevelEnabled:true,bevelThickness:.02,bevelSize:.018,bevelSegments:2,steps:1,curveSegments:20}).toNonIndexed()];
  for(let j=0;j<5;j++){const x=side*(.1+j*.18),height=3.35-Math.abs(x)*1.12;pieces.push(new T.BoxGeometry(.028,height,.055).translate(x,height/2,.15).toNonIndexed());}
  for(const y of [.35,.95,1.55,2.05])pieces.push(new T.BoxGeometry(.9,.04,.065).translate(side*.49,y,.16).toNonIndexed());
  part(mergeGeometries(pieces),[0,0,.75],side<0?5:6,.95);
 }
 for(let i=0;i<5;i++)part(box(2.35+i*.22,.12,.48),[0,-.06-i*.1,1.0+i*.25],0,.65);
 // The building continues behind its west front, rather than reading as a flat screen.
 for(const side of [-1,1])for(let row=0;row<10;row++)for(let col=0;col<7;col++)part(box(.42,.48,.48),[side*2.7,.24+row*.48,-1.15-col*.47],0);
 for(const side of [-1,1])for(let col=0;col<5;col++)rib([[side*2.72,4.9,-1.6-col*.55],[side*3.1,4.4,-1.6-col*.55],[side*3.3,3.1,-1.6-col*.55]],.10,0);
 save('cathedral',mergeGeometries(parts));const wire=new T.BufferGeometry();wire.setAttribute('position',new T.Float32BufferAttribute(lines,3));wire.setAttribute('color',new T.Float32BufferAttribute(lines.map(()=>.7),3));wire.setAttribute('centr',new T.Float32BufferAttribute(lines,3));save('cathedral-wire',wire);
 return serial;
}
