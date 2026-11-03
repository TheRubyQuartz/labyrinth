import * as THREE from 'three';
import {Line2} from 'three/examples/jsm/lines/Line2.js';
import {LineGeometry} from 'three/examples/jsm/lines/LineGeometry.js';
import {LineMaterial} from 'three/examples/jsm/lines/LineMaterial.js';

// The homepage's original exported geometry and shader factory, not a Cesium texture substitute.
export async function mountHomepageMapGlobe(viewer:any,C:any){
 const base=`${import.meta.env.BASE_URL}reference/igloo-complete/`;
 const {createHomepageGlobe}=await import(/* @vite-ignore */`${base}homepage-globe.js`);
 const [meta,buffer]=await Promise.all([fetch(base+'labyrinth/globe.json').then(r=>r.json()),fetch(base+'labyrinth/globe.bin').then(r=>r.arrayBuffer())]);
 if(viewer.isDestroyed())return ()=>{};
 const geometry=new THREE.BufferGeometry();
 for(const [name,a] of Object.entries(meta.attributes) as [string,any][])geometry.setAttribute(name,new THREE.BufferAttribute(new Float32Array(buffer,a.offset,a.length),a.itemSize));
 geometry.setIndex(new THREE.BufferAttribute(new Uint32Array(buffer,meta.index.offset,meta.index.length),1));
 const loader=new THREE.TextureLoader(),textures:THREE.Texture[]=[];
 const shared=await createHomepageGlobe({Mesh:THREE.Mesh,Material:THREE.ShaderMaterial,Color:THREE.Color,geometry:{load:async()=>geometry},textures:{load:(path:string,space:string)=>{const t=loader.load(base+'assets/images/'+path);t.colorSpace=space==='srgb'?THREE.SRGBColorSpace:THREE.NoColorSpace;textures.push(t);return t}}});
 if(viewer.isDestroyed()){geometry.dispose();textures.forEach(t=>t.dispose());return ()=>{}}
 const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));
 renderer.domElement.className='gm-homepage-globe';renderer.domElement.setAttribute('aria-hidden','true');
 Object.assign(renderer.domElement.style,{position:'absolute',inset:'0',width:'100%',height:'100%',pointerEvents:'none'});
 viewer.canvas.parentElement.append(renderer.domElement);
 const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera();scene.add(shared.earth,shared.atmosphere);
 const overlays=new THREE.Group();scene.add(overlays);let dirty=true;
 const conversion=2/6378137;
 const point=(p:any)=>new THREE.Vector3(p.x*conversion,p.z*conversion,-p.y*conversion);
 const releaseOverlays=()=>{overlays.traverse((o:any)=>{o.geometry?.dispose();o.material?.dispose()});overlays.clear()};
 const rebuild=()=>{releaseOverlays();const now=C.JulianDate.now();for(const e of viewer.entities.values){
  const positions=e.polyline?.positions?.getValue(now);if(positions){const color=e.polyline.material?.color?.getValue(now);const material=new LineMaterial({color:color?new THREE.Color(color.red,color.green,color.blue).getHex():0xe9bd73,linewidth:Math.max(4,e.polyline.width?.getValue(now)||4)});material.resolution.set(viewer.canvas.clientWidth,viewer.canvas.clientHeight);const line=new Line2(new LineGeometry().setPositions(positions.flatMap((p:any,i:number)=>{const v=point(p);const lift=String(e.id).startsWith('route-')?Math.sin(Math.PI*i/(positions.length-1))*.18:0;return v.setLength(v.length()+.047+lift).toArray()})),material);overlays.add(line)}
  const p=e.position?.getValue(now);if(p&&e.point){const c=e.point.color?.getValue(now);const dot=new THREE.Mesh(new THREE.SphereGeometry(.009,8,6),new THREE.MeshBasicMaterial({color:c?new THREE.Color(c.red,c.green,c.blue):'#e9bd73'}));dot.position.copy(point(p));dot.position.setLength(Math.max(dot.position.length(),2.048));overlays.add(dot)}
 }const sightings=viewer.__crabOccurrences||[];if(sightings.length){const positions:number[]=[],colors:number[]=[];for(const p of sightings){const v=point(C.Cartesian3.fromDegrees(p[1],p[2]));positions.push(...v.setLength(2.048).toArray());colors.push(...new THREE.Color(p[4]==='NAT'?'#84dce7':'#efb46d').toArray())}const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));g.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));overlays.add(new THREE.Points(g,new THREE.PointsMaterial({size:3,sizeAttenuation:false,vertexColors:true})))}dirty=false};
 const evidenceChanged=()=>{dirty=true};window.addEventListener('labyrinth-crab-evidence',evidenceChanged);
 const changed=viewer.entities.collectionChanged.addEventListener(()=>{dirty=true;viewer.scene.requestRender()});
 const render=()=>{if(viewer.isDestroyed())return;// Seamlessly reveal streamed terrain at regional scales; retain the homepage scene at world scale.
  const altitude=viewer.camera.positionCartographic.height;const blend=Math.max(0,Math.min(1,(altitude-250000)/1750000));renderer.domElement.style.opacity=String(blend*blend*(3-2*blend));if(!blend)return;shared.earth.material.uniforms.reliefScale.value=Math.min(.045,Math.max(.0001,altitude*conversion*.05));shared.atmosphere.visible=altitude>500000;
  const width=viewer.canvas.clientWidth,height=viewer.canvas.clientHeight;if(renderer.domElement.width!==Math.round(width*renderer.getPixelRatio())||renderer.domElement.height!==Math.round(height*renderer.getPixelRatio()))renderer.setSize(width,height,false);
  camera.fov=THREE.MathUtils.radToDeg(viewer.camera.frustum.fovy);camera.aspect=width/height;camera.near=.00001;camera.far=100;camera.position.copy(point(viewer.camera.positionWC));const d=viewer.camera.directionWC,u=viewer.camera.upWC;camera.up.set(u.x,u.z,-u.y);camera.lookAt(camera.position.clone().add(new THREE.Vector3(d.x,d.z,-d.y)));camera.updateProjectionMatrix();if(dirty)rebuild();renderer.render(scene,camera);
 };
 const frame=viewer.scene.postRender.addEventListener(render);
 // Textures finish asynchronously; continue drawing during their upload.
 const timer=setInterval(()=>{if(!viewer.isDestroyed())viewer.scene.requestRender()},500);
 return ()=>{clearInterval(timer);window.removeEventListener('labyrinth-crab-evidence',evidenceChanged);frame();changed();releaseOverlays();shared.earth.material.dispose();shared.atmosphere.material.dispose();geometry.dispose();textures.forEach(t=>t.dispose());renderer.dispose();renderer.domElement.remove()};
}
