import {useEffect,useRef,useState} from 'react';
import * as T from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {EffectComposer} from 'three/addons/postprocessing/EffectComposer.js';
import {RenderPass} from 'three/addons/postprocessing/RenderPass.js';
import {UnrealBloomPass} from 'three/addons/postprocessing/UnrealBloomPass.js';
import {OutputPass} from 'three/addons/postprocessing/OutputPass.js';
import {IglooAudio as JourneyAudio} from './igloo-reference-audio';
import {createMist,createWindSnow} from './igloo-atmosphere';
import {createReferenceScene} from './igloo-reference-scene';
import {frostMaterial,roughen,relief,surfaceCloud,domeRadius,curvedIceBlock} from './igloo-surfaces';
import './igloo-home.css';
import './igloo-refinement.css';

const clamp=T.MathUtils.clamp;
const smooth=(a:number,b:number,x:number)=>T.MathUtils.smoothstep(x,a,b);
const chapters=['The beginning','A new world','The ecosystem','Beyond the surface','Keep exploring'];
export default function IglooHome(){
 const host=useRef<HTMLDivElement>(null),root=useRef<HTMLDivElement>(null),audio=useRef<JourneyAudio|null>(null);
 const [ready,setReady]=useState(false),[sound,setSound]=useState(false),[menu,setMenu]=useState(false),[error,setError]=useState(false);
 const settings=useRef({reduced:matchMedia('(prefers-reduced-motion: reduce)').matches});
 const [reduced,setReduced]=useState(settings.current.reduced);
 useEffect(()=>{
  const el=host.current!;let frame=0,disposed=false;const oldOverflow=document.body.style.overflow;
  document.body.style.overflow='auto';document.title='Igloo — interactive reconstruction';window.scrollTo(0,0);
  audio.current=new JourneyAudio();
  let renderer:T.WebGLRenderer;
  try{renderer=new T.WebGLRenderer({antialias:true,powerPreference:'high-performance'});}catch{setError(true);setReady(true);return()=>{document.body.style.overflow=oldOverflow}}
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.7));renderer.setSize(innerWidth,innerHeight);renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=.8;el.appendChild(renderer.domElement);
  const scene=new T.Scene();scene.background=new T.Color('#9b9faa');scene.fog=new T.FogExp2('#9b9faa',.023);
  const camera=new T.PerspectiveCamera(39,innerWidth/innerHeight,.1,180);
  const composer=new EffectComposer(renderer);composer.addPass(new RenderPass(scene,camera));const bloom=new UnrealBloomPass(new T.Vector2(innerWidth,innerHeight),.45,.7,1.05);composer.addPass(bloom);composer.addPass(new OutputPass());
  scene.add(new T.HemisphereLight('#f0f6ff','#303c52',1.25));const sun=new T.DirectionalLight('#effaff',3.5);sun.position.set(-8,12,3);scene.add(sun);const rim=new T.DirectionalLight('#9ccfff',3);rim.position.set(4,2,-6);scene.add(rim);
  renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);sun.shadow.camera.left=-12;sun.shadow.camera.right=12;sun.shadow.camera.top=12;sun.shadow.camera.bottom=-12;sun.shadow.bias=-.0004;sun.shadow.normalBias=.035;
  const geometries=new Set<T.BufferGeometry>(),materials=new Set<T.Material>();
  const geo=<G extends T.BufferGeometry>(g:G)=>{geometries.add(g);return g};
  const mat=<M extends T.Material>(m:M)=>{materials.add(m);return m};
  // Object-space micro-relief survives disassembly without sliding texture coordinates.
  const ice=mat(frostMaterial());
  const light=mat(new T.MeshStandardMaterial({color:'#e8faff',emissive:'#a4dcff',emissiveIntensity:2.6,roughness:.4}));
  const wireMat=mat(new T.MeshBasicMaterial({color:'#cfeaff',wireframe:true,transparent:true,opacity:0,depthWrite:false}));
  type Piece={mesh:T.Mesh;home:T.Vector3;rotation:T.Euler;seed:number};
  const groups=[new T.Group(),new T.Group(),new T.Group(),new T.Group(),new T.Group()];groups.forEach(g=>scene.add(g));
  const pieces:Piece[][]=groups.map(()=>[]);
  function piece(index:number,g:T.BufferGeometry,p:T.Vector3,r:T.Euler,m:T.Material=ice){const mesh=new T.Mesh(g,m);mesh.castShadow=true;mesh.receiveShadow=true;mesh.position.copy(p);mesh.rotation.copy(r);groups[index].add(mesh);pieces[index].push({mesh,home:p.clone(),rotation:r.clone(),seed:pieces[index].length*.731+index});return mesh}
  for(let row=0;row<6;row++){const y=.31+row*.59,radius=domeRadius(y),count=Math.max(6,Math.round(radius*5.8)),brick=geo(curvedIceBlock(y,.575,count));for(let j=0;j<count;j++){const a=j/count*Math.PI*2+(row%2)*Math.PI/count;if(row<3&&Math.abs(Math.atan2(Math.sin(a),Math.cos(a)))<.33)continue;piece(0,brick,new T.Vector3(Math.sin(a)*radius,y,Math.cos(a)*radius),new T.Euler(0,a,0))}}
  const crown=geo(curvedIceBlock(3.62,.29,5));for(let j=0;j<5;j++){const a=j/5*Math.PI*2;piece(0,crown,new T.Vector3(Math.sin(a)*domeRadius(3.62),3.62,Math.cos(a)*domeRadius(3.62)),new T.Euler(0,a,0))}
  piece(0,geo(new RoundedBoxGeometry(.45,.17,.45,4,.06)),new T.Vector3(0,3.78,0),new T.Euler());
  const archGeo=geo(new RoundedBoxGeometry(.55,.62,.95,3,.07));for(let i=0;i<9;i++){const a=i/8*Math.PI;piece(0,archGeo,new T.Vector3(Math.cos(a)*.95,.65+Math.sin(a)*1.2,3.1),new T.Euler(0,0,a-Math.PI/2))}
  const coreGeometry=geo(new T.LatheGeometry(Array.from({length:65},(_,i)=>{const y=i/64*3.79;return new T.Vector2(Math.max(.02,domeRadius(y)-.23),y)}),64));
  // Cut the glowing inner shell away behind the entrance; the doorway is a
  // dark recess, not the white light bulb of the previous iteration.
  const corePosition=coreGeometry.attributes.position,index=coreGeometry.index!,kept:number[]=[];
  for(let n=0;n<index.count;n+=3){let cx=0,cy=0,cz=0;for(let k=0;k<3;k++){const j=index.getX(n+k);cx+=corePosition.getX(j)/3;cy+=corePosition.getY(j)/3;cz+=corePosition.getZ(j)/3}if(!(Math.abs(cx)<.95&&cy<1.3&&cz>1.65))kept.push(index.getX(n),index.getX(n+1),index.getX(n+2))}coreGeometry.setIndex(kept);
  const core= new T.Mesh(coreGeometry,light);groups[0].add(core);
  const recessMat=mat(new T.MeshBasicMaterial({color:'#202936'})),entrance=new T.Shape();entrance.moveTo(-.68,-.7);entrance.lineTo(-.68,.32);entrance.quadraticCurveTo(-.68,1.12,0,1.12);entrance.quadraticCurveTo(.68,1.12,.68,.32);entrance.lineTo(.68,-.7);entrance.closePath();
  const recess=piece(0,geo(new T.ShapeGeometry(entrance,32)),new T.Vector3(0,.7,2.93),new T.Euler(),recessMat);recess.castShadow=false;
  // The subsequent scenes are distinct frozen forms, not repeated archive specimens.
  const crystalGeo=geo(new T.IcosahedronGeometry(1,2));
  const frozen=mat(new T.MeshPhysicalMaterial({color:'#acbdcf',roughness:.21,metalness:.06,transparent:true,opacity:.48,depthWrite:false,side:T.DoubleSide,clearcoat:1}));
  const frostWhite=mat(new T.MeshStandardMaterial({color:'#cbd6df',roughness:.91})),frostDark=mat(new T.MeshStandardMaterial({color:'#4c5b71',roughness:.8}));
  const sphere=geo(new T.SphereGeometry(1,40,28));
  const penguinBody=piece(1,sphere,new T.Vector3(0,-.5,0),new T.Euler(),frostDark);penguinBody.scale.set(1.15,1.62,.87);
  const belly=piece(1,sphere,new T.Vector3(0,-.58,.54),new T.Euler(),frostWhite);belly.scale.set(.91,1.29,.39);
  const head=piece(1,sphere,new T.Vector3(0,1.02,.02),new T.Euler(),frostDark);head.scale.set(.91,.83,.79);
  for(const side of [-1,1]){const face=piece(1,sphere,new T.Vector3(side*.32,1.05,.59),new T.Euler(),frostWhite);face.scale.set(.36,.4,.25);const eye=piece(1,sphere,new T.Vector3(side*.32,1.17,.81),new T.Euler(),frostDark);eye.scale.setScalar(.065);const wing=piece(1,sphere,new T.Vector3(side*1.08,-.35,0),new T.Euler(0,0,side*.3),frostDark);wing.scale.set(.3,1.01,.34)}
  const beak=piece(1,geo(new T.ConeGeometry(.22,.43,4)),new T.Vector3(0,.85,.94),new T.Euler(Math.PI/2,0,0),frostWhite);
  for(let i=0;i<28;i++){const a=i*2.39996,y=(i/27-.5)*5.5,rad=Math.sqrt(Math.max(0,1-(y/3.2)**2))*1.7;const mesh=piece(1,geo(roughen(new T.IcosahedronGeometry(1,2),.25,6)),new T.Vector3(Math.cos(a)*rad,y,Math.sin(a)*rad),new T.Euler(i*.2,a,i*.3),frozen);mesh.scale.set(.65,.9,.34)}
  const slab=geo(roughen(new RoundedBoxGeometry(3.6,5.2,.75,6,.22),.08,8));piece(2,slab,new T.Vector3(),new T.Euler(.1,-.3,-.18),frozen);
  const inset=piece(2,geo(new RoundedBoxGeometry(2.5,3.65,.12,3,.08)),new T.Vector3(0,0,.42),new T.Euler(.1,-.3,-.18),frostDark);
  // Structural letterform inside the second frozen exhibit.
  for(const [x,y,w,h] of [[-.5,0,.13,1.5],[0,.7,1.15,.13],[.5,.32,.13,.8],[0,-.05,1.1,.13],[.25,-.4,.13,.8]])piece(2,geo(new RoundedBoxGeometry(w,h,.09,2,.03)),new T.Vector3(x,y,.58),new T.Euler(.1,-.3,-.18),frostWhite);
  for(let i=0;i<90;i++){const a=i*2.4;const mesh=piece(2,crystalGeo,new T.Vector3(Math.cos(a)*1.85,Math.sin(a)*2.65,Math.sin(i)*.35),new T.Euler(i,i*.3,0));mesh.scale.setScalar(.13+.18*(.5+.5*Math.sin(i*5)))}
  for(let ring=0;ring<3;ring++){const r=1.6+ring*.63;for(let i=0;i<18;i++){const a=i/18*Math.PI*2;piece(3,geo(new T.TorusGeometry(r,.22,12,8,Math.PI*2/18*.9)),new T.Vector3(0,0,ring*.3),new T.Euler(0,0,a))}const halo=new T.Mesh(geo(new T.TorusGeometry(r-.13,.025,8,100)),light);halo.position.z=ring*.3;groups[3].add(halo)}
  for(let i=0;i<180;i++){const a=i*2.39996,y=1-2*i/179,r=Math.sqrt(1-y*y)*2.3;const mesh=piece(4,crystalGeo,new T.Vector3(Math.cos(a)*r,y*2.3,Math.sin(a)*r),new T.Euler(i,0,a));mesh.scale.setScalar(.17)}
  const wires:T.Mesh[]=[];for(const list of pieces)for(const p of list){const w=new T.Mesh(p.mesh.geometry,wireMat);p.mesh.add(w);wires.push(w)}
  const scaffold=new T.Group(),scaffoldMaterial=mat(new T.LineBasicMaterial({color:'#d7edff',transparent:true,opacity:0,depthWrite:false})),edgeCache=new Map<T.BufferGeometry,T.EdgesGeometry>();
  for(const p of pieces[0]){let edges=edgeCache.get(p.mesh.geometry);if(!edges){p.mesh.geometry.computeBoundingBox();const bounds=p.mesh.geometry.boundingBox!,size=bounds.getSize(new T.Vector3()),center=bounds.getCenter(new T.Vector3()),cage=new T.BoxGeometry(size.x,size.y,size.z);cage.translate(center.x,center.y,center.z);edges=geo(new T.EdgesGeometry(cage));cage.dispose();edgeCache.set(p.mesh.geometry,edges)}const line=new T.LineSegments(edges,scaffoldMaterial);line.position.copy(p.home);line.rotation.copy(p.rotation);line.scale.copy(p.mesh.scale);scaffold.add(line)}groups[0].add(scaffold);
  const clouds=pieces.map((list,i)=>{const cloud=surfaceCloud(list.map(p=>p.mesh),i);geo(cloud.geometry);mat(cloud.material);groups[i].add(cloud);return cloud});
  const traced=pieces[0].filter(p=>p.home.z>1.1&&p.home.y>1.3&&p.home.y<3.3).slice(0,6);
  const tracePositions=new Float32Array(Math.max(0,traced.length-1)*6),traceG=geo(new T.BufferGeometry());traceG.setAttribute('position',new T.BufferAttribute(tracePositions,3));const traceM=mat(new T.LineBasicMaterial({color:'#edf7ff',transparent:true,opacity:0,depthWrite:false}));const traceLines=new T.LineSegments(traceG,traceM);groups[0].add(traceLines);
  const labelTextures:T.CanvasTexture[]=[];const traceLabels=traced.map((p,i)=>{const canvas=document.createElement('canvas');canvas.width=64;canvas.height=32;const c=canvas.getContext('2d')!;c.font='18px monospace';c.fillStyle='#f1f8ff';c.textAlign='center';c.fillText(String(17+i*7),32,23);const texture=new T.CanvasTexture(canvas);labelTextures.push(texture);const material=mat(new T.SpriteMaterial({map:texture,transparent:true,opacity:0,depthWrite:false}));const sprite=new T.Sprite(material);sprite.scale.set(.28,.14,1);groups[0].add(sprite);return sprite});
  const terrainG=geo(new T.PlaneGeometry(140,140,320,320)),pos=terrainG.attributes.position;for(let i=0;i<pos.count;i++){const x=pos.getX(i),z=pos.getY(i),distance=Math.hypot(x,z);const mountain=Math.exp(-((x+16)**2+(z-26)**2)/160)*7+Math.exp(-((x-21)**2+(z-34)**2)/200)*8,banks=Math.exp(-((x+5.8)**2+(z+5)**2)/7)*1.8+Math.exp(-((x-5.8)**2+(z-1)**2)/9)*2;pos.setZ(i,(mountain+relief(x,z)*3.5)*smooth(3,13,distance)+banks+relief(x*4,z*4)*.12)}terrainG.computeVertexNormals();const terrain=new T.Mesh(terrainG,ice);terrain.rotation.x=-Math.PI/2;terrain.position.y=-.2;terrain.receiveShadow=true;scene.add(terrain);
  const windSnow=createWindSnow(),mist=createMist();scene.add(windSnow.points,mist.group);
  const gridVertices:number[]=[];for(let y=0;y<320;y+=4)for(let x=0;x<320;x+=4){const i=y*321+x;for(const j of [i+4,i+4*321]){gridVertices.push(pos.getX(i),pos.getY(i),pos.getZ(i),pos.getX(j),pos.getY(j),pos.getZ(j))}}const terrainGridGeometry=geo(new T.BufferGeometry());terrainGridGeometry.setAttribute('position',new T.Float32BufferAttribute(gridVertices,3));const terrainWireMaterial=mat(new T.LineBasicMaterial({color:'#d5e5f7',transparent:true,opacity:0,depthWrite:false})),terrainWire=new T.LineSegments(terrainGridGeometry,terrainWireMaterial);terrainWire.rotation.copy(terrain.rotation);terrainWire.position.copy(terrain.position);terrainWire.position.y+=.01;scene.add(terrainWire);
  const pointer=new T.Vector2(),follow=new T.Vector2();let pointerActive=false,drag:{y:number;scroll:number}|null=null;
  const move=(e:PointerEvent)=>{pointerActive=true;pointer.set(e.clientX/innerWidth*2-1,e.clientY/innerHeight*2-1);if(drag)window.scrollTo(0,drag.scroll+(drag.y-e.clientY)*2)};
  const down=(e:PointerEvent)=>{if(e.pointerType!=='mouse'||e.button||((e.target as HTMLElement).closest('a,button,dialog')))return;drag={y:e.clientY,scroll:scrollY};el.setPointerCapture?.(e.pointerId)};
  const up=()=>{drag=null};
  addEventListener('pointermove',move);el.addEventListener('pointerdown',down);addEventListener('pointerup',up);addEventListener('pointercancel',up);
  const resize=()=>{renderer.setSize(innerWidth,innerHeight);composer.setSize(innerWidth,innerHeight);camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix()};addEventListener('resize',resize);
  let reference:Awaited<ReturnType<typeof createReferenceScene>>|undefined;
  let current=0,last=performance.now(),start=last,lastChapter=0,hover=0,introCue=false;const look=new T.Vector3(),desired=new T.Vector3(),direction=new T.Vector3(),raycaster=new T.Raycaster();
  function tick(now:number){if(disposed)return;frame=requestAnimationFrame(tick);const dt=Math.min(.25,(now-last)/1000);last=now;const still=settings.current.reduced;const target=scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight)*4;current=still?target:T.MathUtils.damp(current,target,5,dt);follow.lerp(pointer,1-Math.exp(-dt*3));const elapsed=(now-start)/1000,intro=still?1:smooth(1.4,5.2,elapsed),cameraIntro=still?1:smooth(2.7,7,elapsed),chapter=Math.min(4,Math.round(current));if(chapter!==lastChapter){audio.current?.effect('travel');lastChapter=chapter}if(!introCue&&elapsed>2.4){introCue=true;audio.current?.effect('assemble')}root.current?.style.setProperty('--progress',String(current/4));root.current?.style.setProperty('--intro-ui',String(still?1:smooth(3.8,5.8,elapsed)));root.current?.setAttribute('data-opening-phase',elapsed<.7?'loading':elapsed<2?'wireframe':elapsed<5.2?'assembly':elapsed<7?'camera-settle':'ready');root.current?.setAttribute('data-chapter',String(chapter));ice.userData.reveal.value=still?1:smooth(1.8,3.6,elapsed);renderer.toneMappingExposure=.8+(still?0:Math.exp(-Math.pow((elapsed-2.45)/.13,2))*.13);
   const near=Math.abs(current-Math.round(current)),travel=smooth(.12,.48,near);
   raycaster.setFromCamera(new T.Vector2(pointer.x,-pointer.y),camera);const hit=pointerActive&&raycaster.intersectObjects(pieces[chapter].map(p=>p.mesh),false).length>0;hover=T.MathUtils.damp(hover,hit?1:0,3,dt);
   groups.forEach((group,i)=>{const distance=Math.abs(current-i),assembly=(1-smooth(.15,.72,distance))*(i===0?intro:1),spread=1-assembly;group.visible=distance<.95;group.position.y=i===0?0:2;group.rotation.y=(i===0?.28:Math.sin(now*.0001)*.12)+follow.x*.12*hover;group.rotation.x=i===0?0:follow.y*.065*hover;for(const p of pieces[i]){direction.copy(p.home).normalize();if(direction.lengthSq()<.01)direction.set(1,1,0).normalize();const breath=!still&&i===0?hover*smooth(.5,3.7,p.home.y)*(.39+.1*Math.sin(now*.0015+p.seed*.2)):0;p.mesh.visible=spread<.83;p.mesh.position.copy(p.home).addScaledVector(direction,spread*(5+Math.sin(p.seed)*2)+breath);p.mesh.position.y+=spread*Math.sin(p.seed*2)*3;p.mesh.rotation.copy(p.rotation);p.mesh.rotation.x+=spread*Math.sin(p.seed)*1.5+breath*Math.cos(p.seed)*.35;p.mesh.rotation.z+=spread*Math.cos(p.seed)*1.5+breath*Math.sin(p.seed)*.25}const uniforms=clouds[i].material.uniforms;uniforms.uSpread.value=spread;uniforms.uTime.value=still?0:now*.001;uniforms.uOpacity.value=Math.sin(spread*Math.PI)*.85;clouds[i].visible=spread>.015;group.scale.setScalar(.99+(!still?Math.sin(now*.0008)*.004:0))});
   traceM.opacity=hover*(1-smooth(.05,.35,current))*.65;traced.forEach((p,i)=>{const location=p.mesh.position.clone();location.z+=.4;traceLabels[i].position.copy(location);traceLabels[i].material.opacity=traceM.opacity;if(i<traced.length-1){location.toArray(tracePositions,i*6);const end=traced[i+1].mesh.position.clone();end.z+=.4;end.toArray(tracePositions,i*6+3)}});traceG.attributes.position.needsUpdate=true;
   scaffoldMaterial.opacity=still?0:smooth(.65,1.2,elapsed)*(1-smooth(2.3,4.4,elapsed))*.65;scaffold.visible=scaffoldMaterial.opacity>.001;terrainWireMaterial.opacity=scaffoldMaterial.opacity*.4;terrainWire.visible=scaffold.visible;wireMat.opacity=travel*.12;core.visible=current<.65&&intro>.6;light.emissiveIntensity=2.6*smooth(.6,1,intro);const coreSize=Math.max(.001,intro*(1-smooth(.1,.65,current)));core.scale.setScalar(coreSize);terrain.visible=current<.95;terrain.position.y=-.2-smooth(.15,.9,current)*32;terrainWire.position.y=terrain.position.y+.01;
   const mobile=innerWidth<700;const distance=(mobile?20:13.2)+(1-cameraIntro)*4;const angle=-.22+current*.12-(1-cameraIntro)*.15;desired.set(Math.sin(angle)*distance,4.3+travel*2.5+(1-cameraIntro)*1.2,Math.cos(angle)*distance);desired.x+=follow.x*.18;desired.y-=follow.y*.12;camera.position.copy(desired);look.set(0,T.MathUtils.lerp(1.3,1.7,smooth(0,1,current))+travel*1.8,0);camera.lookAt(look);windSnow.update(still?0:elapsed,still?.45:smooth(2,6,elapsed));mist.update(still?0:elapsed,still?1:smooth(1.5,4.5,elapsed));
   if(reference){
    groups[0].visible=false;terrain.visible=false;terrainWire.visible=false;
    mist.group.visible=current>=.95;windSnow.points.visible=current>=.95;
    reference.update(elapsed,current,dt,pointerActive?pointer:new T.Vector2(5,5),camera,still);
    renderer.toneMapping=current<.95?T.NoToneMapping:T.ACESFilmicToneMapping;
    renderer.toneMappingExposure=current<.95?1:.8;bloom.threshold=current<.95?.8:1.05;bloom.strength=current<.95?.08:.45;
    root.current?.setAttribute('data-reference-assets','loaded');
    if(current>=.95){camera.fov=39;camera.zoom=1;camera.updateProjectionMatrix()}
   }
   composer.render();
  }
  let readyTimer:ReturnType<typeof setTimeout>|undefined;
  camera.position.set(-4,5.5,18);camera.lookAt(0,1.3,0);groups.forEach((g,i)=>{g.visible=i===0});
  // Compile and prime post-processing behind the loading screen. Starting the
  // timeline before shader compilation skips the wireframe on slower GPUs.
  void createReferenceScene(renderer).then(async result=>{if(disposed){result.dispose();return}reference=result;scene.add(result.root);composer.insertPass(result.lutPass,1);groups[0].visible=false;terrain.visible=false;terrainWire.visible=false;mist.group.visible=false;await renderer.compileAsync(scene,camera);if(disposed)return;composer.render();start=performance.now();last=start;readyTimer=setTimeout(()=>setReady(true),650);frame=requestAnimationFrame(tick)}).catch(error=>{console.error('Opening scene initialization failed',error);if(!disposed){setError(true);setReady(true)}});
  return()=>{disposed=true;clearTimeout(readyTimer);cancelAnimationFrame(frame);removeEventListener('resize',resize);removeEventListener('pointermove',move);removeEventListener('pointerup',up);removeEventListener('pointercancel',up);el.removeEventListener('pointerdown',down);reference?.dispose();geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());labelTextures.forEach(t=>t.dispose());windSnow.dispose();mist.dispose();composer.dispose();renderer.dispose();renderer.domElement.remove();audio.current?.dispose();document.body.style.overflow=oldOverflow};
 },[]);
 const jump=(i:number)=>{scrollTo({top:i/4*(document.documentElement.scrollHeight-innerHeight),behavior:reduced?'instant':'smooth'});setMenu(false)};
 return <div className="ig-rebuild" ref={root} data-chapter="0"><div className="ig-scroll-space"/><div className="ig-fixed"><div className="ig-render" ref={host}/><div className="ig-atmosphere"/><header className="ig-header"><a className="ig-logo" href="./">IGLOO</a><p>A new world.<br/>Built from the ground up.<br/><small>INTERACTIVE RECONSTRUCTION</small></p></header>{!ready&&<div className="ig-loading">IGLOO<i/>LOADING EXPERIENCE</div>}{error&&<p className="ig-failure">3D is unavailable. <a href="?view=archive">Open the archive</a></p>}<div className="ig-label ig-label-one"><small>01 / EXPLORATION</small><h1>A new world.</h1></div><div className="ig-label ig-label-two"><small>02 / CONNECTION</small><h1>An expanding ecosystem.</h1></div><div className="ig-label ig-label-three"><small>03 / POSSIBILITY</small><h1>Beyond the surface.</h1></div><div className="ig-label ig-label-four"><small>04 / DISCOVERY</small><h1>Keep exploring.</h1><a href="?view=archive">ENTER LABYRINTH ↗</a></div><nav className="ig-nav" aria-label="Scene navigation">{chapters.map((c,i)=><button key={c} onClick={()=>jump(i)} aria-label={c}><span>{String(i+1).padStart(2,'0')}</span></button>)}</nav><footer className="ig-footer"><div><span>SCROLL TO EXPLORE ↓</span><button onClick={async()=>{if(sound)audio.current?.mute();else await audio.current?.enable();setSound(!sound)}} aria-pressed={sound}>{sound?'SOUND ON':'SOUND OFF'} ≋</button></div><button onClick={()=>{settings.current.reduced=!reduced;setReduced(!reduced)}}>{reduced?'ENABLE MOTION':'REDUCE MOTION'}</button><button onClick={()=>setMenu(!menu)}>MENU ＋</button></footer><div className="ig-progress"/>{menu&&<nav className="ig-menu" aria-label="Site menu"><button onClick={()=>setMenu(false)}>CLOSE ×</button>{chapters.map((c,i)=><button key={c} onClick={()=>jump(i)}>{c}</button>)}<hr/>{['archive','map','news','marketplace'].map(v=><a key={v} href={'?view='+v}>{v} ↗</a>)}</nav>}</div></div>
}
