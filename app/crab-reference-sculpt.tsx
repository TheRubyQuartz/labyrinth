import {useEffect,useRef,useState} from 'react';
import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';

import {assemblies,createCrabExplosion} from './crab-exploded-view';
export function CrabReferenceSculpt(){
 const [spread,setSpread]=useState(0),[playing,setPlaying]=useState(false),[selected,setSelected]=useState(-1),[isolate,setIsolate]=useState(false),[ready,setReady]=useState(false);
 const animation=useRef({progress:0,direction:0,selected:-1,isolate:false});
 function scrub(value:number){animation.current.progress=value;animation.current.direction=0;setPlaying(false);setSpread(value)}
 const host=useRef<HTMLDivElement>(null);
 const api=useRef<{view:(name:string)=>void;zoom:(factor:number)=>void;wire:(on:boolean)=>void;focus:()=>void}|null>(null);
 const [status,setStatus]=useState('Loading saved sculpt…'),[wire,setWire]=useState(false);
 useEffect(()=>{
  const el=host.current;if(!el)return;
  let dead=false,frame=0;let explosion:ReturnType<typeof createCrabExplosion>|undefined;let previous=performance.now(),lastUI=0,framing=1;
  const geometry=new Set<THREE.BufferGeometry>(),materials=new Set<THREE.Material>(),textures=new Set<THREE.Texture>();
  const release=()=>{geometry.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());textures.forEach(t=>t.dispose())};
  let renderer:THREE.WebGLRenderer;
  try{renderer=new THREE.WebGLRenderer({antialias:true})}catch{setStatus('3D rendering is unavailable in this browser.');return}
  renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.15;
  el.appendChild(renderer.domElement);renderer.domElement.setAttribute('aria-label','Crab reconstruction: drag to rotate, scroll to zoom');
  const scene=new THREE.Scene();scene.background=new THREE.Color('#11171c');
  const camera=new THREE.PerspectiveCamera(35,1,.01,100);
  const controls=new OrbitControls(camera,renderer.domElement);controls.enableDamping=true;controls.minDistance=1.5;controls.maxDistance=15;
  scene.add(new THREE.HemisphereLight(0xdceaff,0x28221b,1.8));
  for(const [color,intensity,position] of [[0xe5efff,3,[3,5,5]],[0xffd590,3.5,[-4,3,-3]],[0xffffff,1,[0,0,5]]] as const){const light=new THREE.DirectionalLight(color,intensity);light.position.set(position[0],position[1],position[2]);scene.add(light)}
  let flight:{from:THREE.Vector3;to:THREE.Vector3;targetFrom:THREE.Vector3;targetTo:THREE.Vector3;start:number}|null=null;
  const travel=(to:THREE.Vector3,target=new THREE.Vector3())=>{if(matchMedia('(prefers-reduced-motion: reduce)').matches){camera.position.copy(to);controls.target.copy(target);controls.update();return}flight={from:camera.position.clone(),to,targetFrom:controls.target.clone(),targetTo:target,start:performance.now()}};
  const view=(name:string)=>{const poses:Record<string,[number,number,number]>={Review:[3,2.6,7],Front:[0,1,8],Back:[0,2,-8],Top:[0,8,.01],Side:[8,1,0],Underside:[0,-8,2]};travel(new THREE.Vector3(...(poses[name]||poses.Review)).multiplyScalar(framing))};camera.position.set(3,2.6,7);controls.update();
  const cancelFlight=()=>{flight=null};controls.addEventListener('start',cancelFlight);
  new GLTFLoader().load(import.meta.env.BASE_URL+'models/crab-mouth-v001/crab.glb',gltf=>{
   gltf.scene.traverse(o=>{if(o instanceof THREE.Mesh){geometry.add(o.geometry);for(const m of Array.isArray(o.material)?o.material:[o.material]){materials.add(m);for(const value of Object.values(m))if(value instanceof THREE.Texture)textures.add(value)}}});
   if(dead){release();return}
   const box=new THREE.Box3().setFromObject(gltf.scene),size=box.getSize(new THREE.Vector3());
   gltf.scene.position.sub(box.getCenter(new THREE.Vector3()));explosion=createCrabExplosion(gltf.scene);setReady(true);const group=new THREE.Group();group.add(gltf.scene);group.scale.setScalar(5/Math.max(size.x,size.y,size.z));scene.add(group);
   setStatus('Saved reconstruction · mouth refinement 001 · drag to rotate, scroll to zoom');
  },undefined,()=>{if(!dead)setStatus('The saved sculpt could not load. Reload to try again.')});
  api.current={view,zoom(f){travel(camera.position.clone().sub(controls.target).multiplyScalar(f).clampLength(1.5,15).add(controls.target),controls.target.clone())},wire(on){materials.forEach(m=>{if(m instanceof THREE.MeshStandardMaterial)m.wireframe=on})},focus(){if(!explosion)return;const box=new THREE.Box3();for(const mesh of explosion.meshes)if(mesh.visible&&(animation.current.selected<0||mesh.userData.assembly===animation.current.selected))box.expandByObject(mesh);if(box.isEmpty())return;const target=box.getCenter(new THREE.Vector3()),radius=box.getSize(new THREE.Vector3()).length()/2,distance=THREE.MathUtils.clamp(radius/Math.sin(THREE.MathUtils.degToRad(camera.fov/2))*1.12,1.5,15);travel(camera.position.clone().sub(controls.target).normalize().multiplyScalar(distance).add(target),target)}};
  const resize=()=>{const w=el.clientWidth,h=el.clientHeight;if(!w||!h)return;renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix()};
  const observer=new ResizeObserver(resize);observer.observe(el);resize();
  const raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2();let down=[0,0];
  const onDown=(e:PointerEvent)=>{flight=null;down=[e.clientX,e.clientY]};
  const onUp=(e:PointerEvent)=>{if(!explosion||Math.hypot(e.clientX-down[0],e.clientY-down[1])>5)return;const rect=renderer.domElement.getBoundingClientRect();pointer.set((e.clientX-rect.left)/rect.width*2-1,-(e.clientY-rect.top)/rect.height*2+1);raycaster.setFromCamera(pointer,camera);const hit=raycaster.intersectObjects(explosion.meshes.filter(m=>m.visible))[0];if(hit){const id=hit.object.userData.assembly;animation.current.selected=id;setSelected(id)}};
  renderer.domElement.addEventListener('pointerdown',onDown);renderer.domElement.addEventListener('pointerup',onUp);
  let visible=true;const visibility=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting});visibility.observe(el);
  const draw=(now=performance.now())=>{const dt=Math.min((now-previous)/1000,.05);previous=now;if(!visible||document.hidden){frame=requestAnimationFrame(draw);return}const a=animation.current;if(a.direction&&!document.body.classList.contains('crab-motion-paused')){a.progress=THREE.MathUtils.clamp(a.progress+a.direction*dt/5,0,1);if(a.progress===0||a.progress===1){a.direction=0;setPlaying(false);setSpread(a.progress)}if(now-lastUI>65){setSpread(a.progress);lastUI=now}}const nextFraming=1+a.progress*.85;camera.position.sub(controls.target).multiplyScalar(nextFraming/framing).add(controls.target);framing=nextFraming;explosion?.update(a.progress,a.selected,a.isolate);if(flight){const t=Math.min(1,(now-flight.start)/850),ease=t*t*(3-2*t);camera.position.lerpVectors(flight.from,flight.to,ease);controls.target.lerpVectors(flight.targetFrom,flight.targetTo,ease);if(t===1)flight=null}controls.update();renderer.render(scene,camera);frame=requestAnimationFrame(draw)};draw();
  return()=>{dead=true;cancelAnimationFrame(frame);observer.disconnect();visibility.disconnect();controls.dispose();explosion?.dispose();renderer.domElement.removeEventListener('pointerdown',onDown);renderer.domElement.removeEventListener('pointerup',onUp);release();renderer.dispose();renderer.domElement.remove();api.current=null};
 },[]);
 return <section className="crab-specimen"><header><span className="crab-collection-eyebrow">REFERENCE SCULPT · MOUTH REFINEMENT 001</span><h3>Crab sculpture</h3></header><div ref={host} className="crab-sculpt-stage" style={{height:'min(68vh,720px)',minHeight:360,width:'100%',touchAction:'none'}}/><p role="status">{status}</p><div className="crab-specimen-controls" aria-label="Crab disassembly controls"><h4>Take the sculpture apart</h4><p>Separate the modeled assemblies, inspect each group, then reassemble. This is an exploded sculpt—not a scan of internal organs.</p><label style={{display:'flex',gap:12,alignItems:'center',width:'100%'}}>Assembled <input aria-label="Disassembly progress" style={{flex:1}} type="range" min="0" max="100" value={Math.round(spread*100)} disabled={!ready} onChange={e=>scrub(Number(e.target.value)/100)}/> Exploded · {Math.round(spread*100)}%</label><div><button disabled={!ready} onClick={()=>{if(playing){animation.current.direction=0;setPlaying(false)}else{animation.current.direction=spread>=1?-1:1;setPlaying(true)}}}>{playing?'Pause':spread>=1?'Reassemble':'Disassemble'}</button><button disabled={!ready} onClick={()=>{animation.current.direction=-1;setPlaying(true)}}>Reverse</button><button onClick={()=>{scrub(0);animation.current.selected=-1;animation.current.isolate=false;setSelected(-1);setIsolate(false);api.current?.view('Review')}}>Reset</button></div><label>Inspect assembly <select value={selected} onChange={e=>{const id=Number(e.target.value);setSelected(id);animation.current.selected=id}}><option value="-1">All assemblies</option>{assemblies.map((name,id)=><option value={id} key={name}>{name}</option>)}</select></label><label><input type="checkbox" checked={isolate} disabled={selected<0} onChange={e=>{setIsolate(e.target.checked);animation.current.isolate=e.target.checked}}/> Show selected assembly only</label><p aria-live="polite">{selected>=0?assemblies[selected]:'Click a modeled part to select its assembly.'}</p></div><div className="crab-specimen-controls"><div role="group" aria-label="Sculpt viewpoints">{['Review','Front','Back','Top','Side','Underside'].map(v=><button key={v} onClick={()=>api.current?.view(v)}>{v}</button>)}<button disabled={!ready} onClick={()=>api.current?.focus()}>Frame selected part</button><button onClick={()=>api.current?.zoom(.8)}>＋ Zoom</button><button onClick={()=>api.current?.zoom(1.25)}>− Zoom</button></div><label><input type="checkbox" checked={wire} onChange={e=>{setWire(e.target.checked);api.current?.wire(e.target.checked)}}/> Surface mesh</label></div><p className="crab-media-caption">Reference-based fantasy crab reconstruction, not a biological specimen or the original production mesh. <a href="https://lawrencebl.artstation.com/projects/YG9vv6" target="_blank" rel="noreferrer">Sculpt reference: Lawrence Blackman ↗</a></p></section>;
}
