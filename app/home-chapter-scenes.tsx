import {useEffect,useRef} from 'react';
import * as T from 'three';
import {MeshSurfaceSampler} from 'three/addons/math/MeshSurfaceSampler.js';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import './home-chapter-scenes.css';
import {createMineralTexture,makeStageEnvironment} from './home-scene-materials';

const chapters=[
 ['world','01','A living world','Coordinate / orbit / discover'],
 ['connections','02','Everything connects','Structure / relationship / system'],
 ['manifesto','03','Look beneath the surface','Observe / separate / understand'],
 ['discover','04','An archive taking shape','Collect / arrange / inspect'],
 ['perspectives','05','Change the lens','Focus / rotate / reconsider'],
 ['fieldnotes','06','Trace the evidence','Record / compare / verify'],
 ['expeditions','07','Give discovery a rhythm','Time / season / return'],
 ['fieldkit','08','Tools for looking closer','Assemble / examine / explore'],
 ['connect','09','Carry the connection forward','Gather / connect / continue'],
 ['home-ending','10','A new beginning','Return / explore / discover']
];
export default function HomeChapterScenes({paused}:{paused:boolean}){
 const host=useRef<HTMLDivElement>(null),pause=useRef(paused);pause.current=paused;
 useEffect(()=>{
  const container=host.current!;let renderer:T.WebGLRenderer;
  try{renderer=new T.WebGLRenderer({alpha:true,antialias:true,powerPreference:'high-performance'})}catch{return}
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.setClearColor(0,0);renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.2;container.appendChild(renderer.domElement);const pmrem=new T.PMREMGenerator(renderer),environmentRoom=new RoomEnvironment(),environment=pmrem.fromScene(environmentRoom,.04);environmentRoom.dispose();pmrem.dispose();
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');const slots:HTMLElement[]=[];
  const relief=createMineralTexture();
  const material=new T.MeshStandardMaterial({color:'#87917e',map:relief,metalness:.12,roughness:.72,bumpMap:relief,bumpScale:.2,envMap:environment.texture,envMapIntensity:.35,transparent:true});
  const edgeMaterial=new T.LineBasicMaterial({color:'#d5ee9e',transparent:true,opacity:.3});
  const resources:T.BufferGeometry[]=[];
  const scenes=chapters.flatMap(([id,number,title,subtitle],index)=>{
   const section=document.getElementById(id);if(!section)return [];
   const slot=document.createElement('div');slot.className='hc-stage';slot.dataset.chapter=id;
   const label=document.createElement('div');label.className='hc-caption';label.innerHTML=`<span>CHAPTER ${number} / PROCEDURAL STUDY</span><h3>${title}</h3><p>${subtitle}</p>`;
   const replay=document.createElement('button');replay.type='button';replay.className='hc-replay';replay.textContent='Replay assembly ↻';replay.setAttribute('aria-label',`Replay ${title}`);
   const annotation=document.createElement('div');annotation.className='hc-annotation';annotation.innerHTML=`<span>0${index+1} / FORM STUDY</span><i></i><span>MOVE POINTER TO INSPECT</span>`;slot.append(label,replay,annotation);section.prepend(slot);slots.push(slot);
   const scene=new T.Scene(),group=new T.Group();scene.add(group);const stageEnvironment=makeStageEnvironment(scene,index);scene.add(new T.HemisphereLight('#eff7db','#142317',.9));const light=new T.DirectionalLight('#e5ebdd',2.5);light.position.set(4,6,5);scene.add(light);
   const camera=new T.PerspectiveCamera(35,1,.1,80);camera.position.set(0,1.5,12);camera.lookAt(0,0,0);
   const meshes:T.Mesh[]=[];const meshMaterial=material.clone();const lines=edgeMaterial.clone();
   function add(geometry:T.BufferGeometry,x=0,y=0,z=0,scale=1){resources.push(geometry);const mesh=new T.Mesh(geometry,meshMaterial);mesh.position.set(x,y,z);mesh.scale.setScalar(scale);group.add(mesh);meshes.push(mesh);const edgeGeo=new T.EdgesGeometry(geometry,35);resources.push(edgeGeo);const edge=new T.LineSegments(edgeGeo,lines);mesh.add(edge);return mesh}
   if(index===0){add(new T.IcosahedronGeometry(2,3));for(let j=0;j<3;j++){const ring=add(new T.TorusGeometry(2.65,.018,6,120));ring.rotation.set(j*.8,.5+j*.6,0)}}
   if(index===1){for(let j=0;j<12;j++){const a=j*Math.PI/6;add(new T.IcosahedronGeometry(.35,1),Math.cos(a)*2,Math.sin(a)*2,Math.sin(a*2));}add(new T.TorusKnotGeometry(1.25,.05,180,8,2,3))}
   if(index===2){for(let j=0;j<7;j++){const shell=add(new T.SphereGeometry(1.8-j*.16,48,24,0,Math.PI*1.5),0,(j-3)*.28,0);shell.rotation.z=j*.12}}
   if(index===3){for(let j=0;j<27;j++)add(new RoundedBoxGeometry(.78,.78,.78,3,.065),(j%3-1)*1.05,(Math.floor(j/3)%3-1)*1.05,(Math.floor(j/9)-1)*1.05)}
   if(index===4){for(let j=0;j<6;j++){const lens=add(new T.TorusGeometry(1.8-j*.18,.1,16,100),0,0,(j-3)*.42);lens.rotation.y=j*.07}add(new T.SphereGeometry(1.1,48,24),0,0,-.1,.85)}
   if(index===5){for(let j=0;j<13;j++){const sheet=add(new T.BoxGeometry(2.6,.04,1.8,12,1,8),0,(j-6)*.14,0);sheet.rotation.y=(j-6)*.035}for(let j=0;j<9;j++)add(new T.IcosahedronGeometry(.075,1),-1.4+j*.35,1.4,0)}
   if(index===6){for(let j=0;j<4;j++){const orbit=add(new T.TorusGeometry(1+j*.43,.035,8,100));orbit.rotation.x=.5+j*.25}for(let j=0;j<12;j++){const a=j*Math.PI/6;add(new T.SphereGeometry(.1,12,8),Math.cos(a)*2.5,Math.sin(a)*2.5,0)}}
   if(index===7){add(new T.CylinderGeometry(.7,.7,2.3,48),0,0,0);for(let j=0;j<5;j++)add(new T.TorusGeometry(.78,.08,12,80),0,(j-2)*.65,0).rotation.x=Math.PI/2;add(new T.ConeGeometry(.7,.65,48),0,1.8,0)}
   if(index===8){add(new T.TorusKnotGeometry(1.4,.22,200,24,3,2));for(let j=0;j<8;j++){const a=j*Math.PI/4;add(new T.IcosahedronGeometry(.15,1),Math.cos(a)*2.5,Math.sin(a)*2.5,0)}}
   if(index===9){for(let j=0;j<6;j++){const ring=add(new T.TorusGeometry(.6+j*.35,.12,12,100),0,0,-j*.25);ring.rotation.y=j*.1}}
   group.updateMatrixWorld(true);let seed=79+index;const random=()=>{seed=(seed*16807)%2147483647;return seed/2147483647};
   const count=innerWidth<700?4500:11000,points=new Float32Array(count*3),scatter=new Float32Array(count*3);const samplers=meshes.map(m=>(new MeshSurfaceSampler(m) as MeshSurfaceSampler & {setRandomGenerator:(fn:()=>number)=>MeshSurfaceSampler}).setRandomGenerator(random).build());const vector=new T.Vector3();
   for(let j=0;j<count;j++){const m=j%meshes.length;samplers[m].sample(vector);vector.applyMatrix4(meshes[m].matrixWorld);points.set(vector.toArray(),j*3);scatter.set([(random()-.5)*12,(random()-.5)*9,(random()-.5)*8],j*3)}
   const geo=new T.BufferGeometry();resources.push(geo);geo.setAttribute('position',new T.BufferAttribute(points,3));geo.setAttribute('scatter',new T.BufferAttribute(scatter,3));
   const shader=new T.ShaderMaterial({transparent:true,depthWrite:false,blending:T.AdditiveBlending,uniforms:{assembly:{value:0},time:{value:0}},vertexShader:`attribute vec3 scatter;uniform float assembly,time;varying float opacity;void main(){float wave=sin(position.y*2.-assembly*9.)*(1.-assembly);vec3 p=mix(scatter,position,assembly);p.x+=wave*.8;p.y+=sin(time+scatter.x)*.08*(1.-assembly);vec4 v=modelViewMatrix*vec4(p,1.);gl_Position=projectionMatrix*v;gl_PointSize=clamp(20./max(1.,-v.z),1.,3.);opacity=.16+.84*(1.-smoothstep(.75,1.,assembly));}`,fragmentShader:`varying float opacity;void main(){float r=length(gl_PointCoord-.5);if(r>.5)discard;gl_FragColor=vec4(.84,.93,.62,(1.-r*2.)*opacity);}`});
   const cloud=new T.Points(geo,shader);scene.add(cloud);
   const waveGeo=new T.RingGeometry(1,1.012,128);resources.push(waveGeo);const waveMaterial=new T.MeshBasicMaterial({color:'#d5ee9e',side:T.DoubleSide,transparent:true,opacity:.2});const wave=new T.Mesh(waveGeo,waveMaterial);wave.rotation.x=-Math.PI/2;wave.position.y=-2.3;scene.add(wave);
   const bases=meshes.map(m=>m.position.clone());const item={slot,scene,stageEnvironment,camera,group,meshes,bases,meshMaterial,lines,shader,cloud,wave,waveMaterial,start:0,entered:false,pointer:0,replay:()=>{item.start=performance.now();item.entered=true}};replay.addEventListener('click',item.replay);slot.addEventListener('pointermove',event=>{const r=slot.getBoundingClientRect();item.pointer=(event.clientX-r.left)/r.width-.5});slot.addEventListener('pointerleave',()=>{item.pointer=0});return [item];
  });
  let frame=0,last=0;const resize=()=>renderer.setSize(innerWidth,innerHeight);resize();addEventListener('resize',resize);
  function draw(now:number){frame=requestAnimationFrame(draw);if(document.hidden||now-last<30)return;last=now;renderer.setScissorTest(false);renderer.clear();renderer.setScissorTest(true);const still=pause.current||reduced.matches;
   for(const s of scenes){const r=s.slot.getBoundingClientRect();if(r.width<1||r.height<1||r.bottom<0||r.top>innerHeight)continue;if(!s.entered){s.entered=true;s.start=now}const exit=still?1:T.MathUtils.smoothstep(r.bottom,0,Math.min(280,innerHeight*.3));const progress=still?1:Math.min(exit,Math.min(1,(now-s.start)/2600));s.slot.dataset.phase=progress<.2?'wireframe':progress<.8?'assembling':'resolved';
    s.stageEnvironment.dust.rotation.y=still?0:now*.000018;s.shader.uniforms.assembly.value=progress;s.shader.uniforms.time.value=now*.001;s.meshMaterial.opacity=T.MathUtils.smoothstep(progress,.45,1);s.lines.opacity=(1-T.MathUtils.smoothstep(progress,.6,1))*.65;const spread=still?0:(1-T.MathUtils.smoothstep(progress,.25,1))*.65;s.meshes.forEach((mesh,i)=>{mesh.position.copy(s.bases[i]).multiplyScalar(1+spread);mesh.position.y+=spread*Math.sin(i*1.7)});
    const rotation=still?.25:Math.sin(now*.00015)*.23+(r.top/innerHeight)*.15+s.pointer*.5;s.group.rotation.y=rotation;s.cloud.rotation.y=rotation;s.group.rotation.x=.12;s.cloud.rotation.x=.12;
    const pulse=still?1:progress;s.wave.scale.setScalar(1+pulse*5);s.waveMaterial.opacity=still?0:(1-pulse)*.25;const visualHeight=Math.max(1,r.height-140),visualBottom=r.top+visualHeight;s.camera.aspect=r.width/visualHeight;s.camera.updateProjectionMatrix();
    if(visualBottom>0){renderer.setViewport(r.left,innerHeight-visualBottom,r.width,visualHeight);renderer.setScissor(Math.max(0,r.left),Math.max(0,innerHeight-visualBottom),Math.min(r.width,innerWidth),Math.max(0,Math.min(visualBottom,innerHeight)-Math.max(r.top,0)));renderer.render(s.scene,s.camera);}
   }
  }frame=requestAnimationFrame(draw);
  return()=>{cancelAnimationFrame(frame);removeEventListener('resize',resize);slots.forEach(s=>s.remove());scenes.forEach(s=>{s.stageEnvironment.dispose();s.meshMaterial.dispose();s.lines.dispose();s.shader.dispose();s.waveMaterial.dispose()});resources.forEach(g=>g.dispose());environment.dispose();relief.dispose();material.dispose();edgeMaterial.dispose();renderer.dispose();renderer.domElement.remove()};
 },[]);
 return <div className="hc-renderer" ref={host} aria-hidden="true"/>;
}
