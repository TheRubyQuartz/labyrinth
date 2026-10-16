import * as T from 'three';
import {KTX2Loader} from 'three/addons/loaders/KTX2Loader.js';
import {ShaderPass} from 'three/addons/postprocessing/ShaderPass.js';

// Reference assets and measured scene coordinates: see public/reference/igloo/provenance.json.
// This is a local reconstruction, not a claim of authorship of Igloo's artwork.
const base='./reference/igloo/';
const smooth=(a:number,b:number,x:number)=>T.MathUtils.smoothstep(x,a,b);
async function geometry(name:string){
 const [metadata,buffer]=await Promise.all([fetch(`${base}geometries/${name}.json`).then(r=>r.json()),fetch(`${base}geometries/${name}.bin`).then(r=>r.arrayBuffer())]);
 const result=new T.BufferGeometry();
 for(const [name,value]of Object.entries(metadata.attributes)){const a=value as {offset:number;bytes:number;itemSize:number};result.setAttribute(name,new T.BufferAttribute(new Float32Array(buffer,a.offset,a.bytes/4),a.itemSize))}
 if(metadata.index)result.setIndex(new T.BufferAttribute(new Uint32Array(buffer,metadata.index.offset,metadata.index.bytes/4),1));
 return result;
}
const common=`uniform float time; uniform float reveal; uniform float depart; uniform vec3 mouse;
 varying vec2 tex; varying vec3 world; varying vec3 local; varying float glow; varying float displacement;
 mat3 turn(vec3 a){vec3 s=sin(a),c=cos(a);return mat3(c.y*c.z,c.y*s.z,-s.y,s.x*s.y*c.z-c.x*s.z,s.x*s.y*s.z+c.x*c.z,s.x*c.y,c.x*s.y*c.z+s.x*s.z,c.x*s.y*s.z-s.x*c.z,c.x*c.y);}`;
const vertex=`${common}
 attribute vec3 centr; attribute vec3 rand; attribute float emission;attribute float batchId;uniform sampler2D stateMap;uniform float stateWidth;
 void main(){tex=uv;glow=emission;local=position;
 float idle=.1*(sin(-time*2.+centr.x)*.5+.5)*(cos(-time)*.5+.5)*mix(.5,2.,rand.z);
 float hover=(1.-smoothstep(1.,3.,distance(centr,mouse)))*(.5+.3*sin(time+rand.x*12.342)*rand.y);
 displacement=texture2D(stateMap,vec2((batchId+.5)/stateWidth,.5)).r;
 vec3 angle=cos(vec3(displacement*2.)+rand.zxy*30.)*displacement*.5+depart*rand*-1.5;
 vec3 p=turn(angle)*(position-centr)+centr*(1.+displacement+depart*smoothstep(.3,1.,centr.y)*rand.x*2.);
 world=(modelMatrix*vec4(p,1.)).xyz;gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);}`;
const iceFragment=`${common}
 uniform sampler2D togetherMap;uniform sampler2D apartMap;uniform sampler2D triangles;
 void main(){vec3 blue=vec3(.5,.7,1.);vec3 color=mix(texture2D(togetherMap,tex).rgb,texture2D(apartMap,tex).rgb+.05,clamp(displacement*5.,0.,1.));
 float edge=(1.-reveal)*5.5-.5;float scan=smoothstep(edge-.7,edge,world.y);if(reveal<.999){if(scan<.001)discard;color+=(1.-scan)*(1.+texture2D(triangles,tex*5.).r*4.)*blue;}
 color+=pow(glow,2.)*displacement*blue;vec3 light=pow(glow,8.)*blue*.5;
 color+=light*(sin(world.x-time+3.2)*.5+.5)+light*smoothstep(0.,2.,world.x*.5-world.z*.5);
 color+=(world.x*.1+.4)*.15*min(world.y+.5,1.);
 color=clamp(color,0.,1.);gl_FragColor=vec4(color,1.);}`;
const terrainVertex=`${common}void main(){tex=uv;local=position;world=(modelMatrix*vec4(position,1.)).xyz;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`;
const terrainFragment=`${common}
 uniform sampler2D map;uniform sampler2D wind;uniform sampler2D triangles;uniform sampler2D groundGlow;
 uniform float mountain;uniform float baseGround;uniform vec2 resolution;
 void main(){if(reveal<.001&&mountain<.5)discard;vec3 color=texture2D(map,tex).rgb;float radius=length(world.xz);float edge=reveal*38.;
 float alpha=(1.-smoothstep(.8,1.,length(local.xz)*.1085));
 float snow=texture2D(wind,world.xz*.15+vec2(-time*.15)).r*texture2D(wind,world.xz*.17+vec2(-time*.15)).r;
 color=mix(color,vec3(1.),clamp(snow*4.*(1.-clamp(local.y*.3+1.1,0.,1.))*(1.-mountain),0.,1.));
 color+=texture2D(groundGlow,tex).rgb*baseGround*(sin(local.x-time+3.2)*.5+.5)*color.r;
 if(reveal<.999){float wave=exp(-pow((radius-edge)/3.,2.));float mask=1.-smoothstep(edge-1.,edge+1.,radius);color+=wave*vec3(.3,.45,1.)*(1.+texture2D(triangles,world.xz*.25).r*3.);alpha*=max(mask,wave*.5);if(mountain>.5&&radius>36.)alpha=1.-smoothstep(.7,.9,length(local.xz)*.1085);}
 if(mountain>.5){float grad=pow((gl_FragCoord.x/resolution.x+gl_FragCoord.y/resolution.y)*.5,2.);vec3 fog=mix(vec3(.43,.47,.57),vec3(.64,.67,.77),grad);float distanceFog=clamp(distance(cameraPosition,world)*.005,0.,1.);color=mix(color,fog*1.1+smoothstep(.5,1.,color.r),clamp(.5-world.y*.05+distanceFog*.75,0.,1.));}
 gl_FragColor=vec4(clamp(color,0.,1.),alpha*(1.-depart));}`;

export async function createReferenceScene(renderer:T.WebGLRenderer){
 const loader=new KTX2Loader().setTranscoderPath('./reference/decoders/basis/').detectSupport(renderer);
 const textures:T.Texture[]=[],geometries:T.BufferGeometry[]=[],materials:T.Material[]=[];
 async function texture(name:string,repeat=false){const t=await loader.loadAsync(base+'images/'+name+'.ktx2');t.colorSpace=T.SRGBColorSpace;if(repeat)t.wrapS=t.wrapT=T.RepeatWrapping;textures.push(t);return t}
 const [igloo,ground,mountain,cage,outline,together,apart,groundColor,bareGround,mountainColor,triangles,wind,groundGlow,lut,introGeometry,patchGeometry,numbers]=await Promise.all([
  geometry('igloo'),geometry('ground'),geometry('mountain'),geometry('igloo/igloo_cage'),geometry('igloo/igloo_outline'),texture('igloo/igloo_color'),texture('igloo/igloo_exploded_color'),texture('igloo/ground_color'),texture('igloo/ground_sansigloo_color'),texture('igloo/mountain_color'),texture('igloo/triangles_tiling',true),texture('wind_noise',true),texture('igloo/ground_glow'),loader.loadAsync(base+'images/igloo/igloo_scene.ktx2'),geometry('intro_particles'),geometry('igloo/patch'),texture('igloo/numbers',true)]);
 geometries.push(igloo,ground,mountain,cage,outline,introGeometry,patchGeometry);textures.push(lut);lut.colorSpace=T.NoColorSpace;lut.minFilter=lut.magFilter=T.NearestFilter;
 const lutPass=new ShaderPass({uniforms:{tDiffuse:{value:null},lut:{value:lut},size:{value:lut.image.width},gradient:{value:0}},vertexShader:'varying vec2 tex;void main(){tex=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',fragmentShader:`
 precision highp sampler3D;varying vec2 tex;uniform sampler2D tDiffuse;uniform sampler3D lut;uniform float size;uniform float gradient;
 vec3 encode(vec3 c){return mix(1.055*pow(max(c,0.),vec3(1./2.4))-.055,c*12.92,lessThanEqual(c,vec3(.0031308)));}
 vec3 decode(vec3 c){return mix(pow((c+.055)/1.055,vec3(2.4)),c/12.92,lessThanEqual(c,vec3(.04045)));}
 void main(){vec3 inputColor=texture2D(tDiffuse,tex).rgb*mix(1.,.8+.1*(tex.x+tex.y),gradient);vec3 p=clamp(encode(inputColor),0.,1.)*(size-1.);vec3 origin=floor(p),f=fract(p);
 int hi=f.x>=f.y?(f.x>=f.z?0:2):(f.y>=f.z?1:2);int lo=f.x<=f.y?(f.x<=f.z?0:2):(f.y<=f.z?1:2);if(hi==lo)lo=(hi+1)%3;int mid=3-hi-lo;
 vec3 a=origin,b=a,c=a,d=a+1.;b[hi]+=1.;c[hi]+=1.;c[mid]+=1.;
 vec3 color=texture(lut,(a+.5)/size).rgb*(1.-f[hi])+texture(lut,(b+.5)/size).rgb*(f[hi]-f[mid])+texture(lut,(c+.5)/size).rgb*(f[mid]-f[lo])+texture(lut,(d+.5)/size).rgb*f[lo];gl_FragColor=vec4(decode(color),1.);}`});
 const root=new T.Group();root.name='Igloo asset-based opening';
 const time={value:0},reveal={value:0},depart={value:0},mouse={value:new T.Vector3(100,100,100)},resolution={value:new T.Vector2(innerWidth,innerHeight)};
 const shared={time,reveal,depart,mouse,resolution};
 const centers=new Map<number,{id:number;center:T.Vector3;random:T.Vector3;target:number;amount:number;position:T.Vector3}>();const ids=igloo.getAttribute('batchId'),centerAttribute=igloo.getAttribute('centr'),randomAttribute=igloo.getAttribute('rand');for(let i=0;i<ids.count;i++){const id=Math.round(ids.getX(i));if(!centers.has(id)){const center=new T.Vector3().fromBufferAttribute(centerAttribute,i);centers.set(id,{id,center,random:new T.Vector3().fromBufferAttribute(randomAttribute,i),target:0,amount:0,position:center.clone()})}}
 const stateWidth=Math.max(...centers.keys())+1,stateData=new Float32Array(stateWidth*4),stateMap=new T.DataTexture(stateData,stateWidth,1,T.RGBAFormat,T.FloatType);stateMap.needsUpdate=true;textures.push(stateMap);
 const ice=new T.ShaderMaterial({uniforms:{...shared,stateMap:{value:stateMap},stateWidth:{value:stateWidth},togetherMap:{value:together},apartMap:{value:apart},triangles:{value:triangles}},vertexShader:vertex,fragmentShader:iceFragment});materials.push(ice);
 const model=new T.Mesh(igloo,ice);model.frustumCulled=false;root.add(model);
 const terrainReveal={value:0};
 function terrain(g:T.BufferGeometry,map:T.Texture,p:number[],s:number[],r:number[],isMountain=0,isBase=0){const material=new T.ShaderMaterial({uniforms:{...shared,reveal:terrainReveal,map:{value:map},wind:{value:wind},triangles:{value:triangles},groundGlow:{value:groundGlow},mountain:{value:isMountain},baseGround:{value:isBase}},vertexShader:terrainVertex,fragmentShader:terrainFragment,transparent:true,depthWrite:true});materials.push(material);const mesh=new T.Mesh(g,material);mesh.position.fromArray(p);mesh.scale.fromArray(s);mesh.rotation.set(...r.map(n=>n*Math.PI/180) as [number,number,number]);mesh.renderOrder=isBase?2:1;root.add(mesh)}
 terrain(ground,groundColor,[0,0,0],[1,1,1],[0,0,0],0,1);
 for(const [p,s,r]of [
  [[-3.76,-.58,12.5],[.6,.6,.6],[-5.1,0,0]], [[-17.63,-.01,2],[1,1,1],[2.7,.8,0]], [[3.12,-.75,-1.02],[1.5,.66,1.5],[0,0,0]], [[6,.16,15.78],[1,1,1],[1.1,0,7]], [[16.06,.34,4],[1,1,1],[0,0,0]],
 ])terrain(ground,bareGround,p,s,r);
 terrain(patchGeometry,bareGround,[-9.34,-1.77,6.96],[7,7,7],[0,0,0]);
 terrain(patchGeometry,bareGround,[-8.82,-1.35,11.69],[8,8,8],[-5.5,-25.6,0]);
 for(const [p,s,r]of [
  [[59.53,-1,-11.84],[4,3.14,4],[4.1,-42.8,5]],[[1,-2.21,-23],[2,2,2],[3.5,30,0]],[[75,0,-90],[8,8,8],[3.2,-16.7,-2.6]],[[250,11.33,-133],[10,10,10],[13.2,20,5]],[[-25.22,-1.59,-53.05],[2.5,2.5,2.5],[3.5,25,0]],
 ])terrain(mountain,mountainColor,p,s,r,1);
 const wireMaterial=new T.LineBasicMaterial({color:'#a7b2d6',transparent:true,depthTest:false,depthWrite:false,opacity:0,blending:T.AdditiveBlending});materials.push(wireMaterial);
 const wire=new T.LineSegments(cage,wireMaterial);wire.renderOrder=999;root.add(wire);
 const outlineMaterial=new T.LineBasicMaterial({color:'#dbeaff',transparent:true,depthTest:false,depthWrite:false,opacity:0,blending:T.AdditiveBlending});materials.push(outlineMaterial);
 const contour=new T.LineSegments(outline,outlineMaterial);contour.renderOrder=999;root.add(contour);
 const introProgress={value:0},introAlpha={value:0};
 const introMaterial=new T.ShaderMaterial({uniforms:{progress:introProgress,alpha:introAlpha,numbers:{value:numbers},resolution},vertexShader:'uniform vec2 resolution;varying float radius;void main(){radius=length(position);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);gl_PointSize=resolution.y/100.;}',fragmentShader:'uniform sampler2D numbers;uniform float progress;uniform float alpha;varying float radius;void main(){float frame=clamp(floor(progress*48.-radius),0.,31.);vec2 uv=vec2(gl_PointCoord.x,(1.-gl_PointCoord.y+frame)/32.);float digit=texture2D(numbers,uv).r;float wave=exp(-pow((radius-progress*25.)/5.,2.));gl_FragColor=vec4(vec3(digit),wave*alpha*.5);}',transparent:true,depthTest:false,depthWrite:false,blending:T.AdditiveBlending});materials.push(introMaterial);const introParticles=new T.Points(introGeometry,introMaterial);introParticles.renderOrder=1000;introParticles.frustumCulled=false;root.add(introParticles);
 const connectionData=new Float32Array(5*6),connectionGeometry=new T.BufferGeometry();connectionGeometry.setAttribute('position',new T.BufferAttribute(connectionData,3));geometries.push(connectionGeometry);const connectionMaterial=new T.LineBasicMaterial({color:'white',transparent:true,opacity:0,depthTest:false,depthWrite:false});materials.push(connectionMaterial);const connections=new T.LineSegments(connectionGeometry,connectionMaterial);connections.frustumCulled=false;connections.renderOrder=999;root.add(connections);
 const labels=Array.from({length:5},(_,index)=>{const canvas=document.createElement('canvas');canvas.width=128;canvas.height=64;const context=canvas.getContext('2d')!;context.fillStyle='white';context.font='24px monospace';context.textAlign='center';context.fillText(String(19+index*11),64,25);context.font='24px monospace';context.fillText('+',64,55);const map=new T.CanvasTexture(canvas);textures.push(map);const material=new T.SpriteMaterial({map,transparent:true,opacity:0,depthTest:false,depthWrite:false});materials.push(material);const label=new T.Sprite(material);label.scale.set(.65,.325,1);label.renderOrder=1000;root.add(label);return label});
 const skyMaterial=new T.ShaderMaterial({uniforms:{resolution,phase:{value:0}},vertexShader:'varying vec2 screen;void main(){screen=uv;gl_Position=vec4(position.xy,1.,1.);}',fragmentShader:'varying vec2 screen;uniform float phase;void main(){float g=pow((screen.x+screen.y)*.5,2.);vec3 c=mix(vec3(.43,.47,.57),vec3(.64,.67,.77),g);gl_FragColor=vec4(mix(vec3(.45,.49,.58),c,phase),1.);}',depthTest:false,depthWrite:false});materials.push(skyMaterial);const skyGeo=new T.PlaneGeometry(2,2);geometries.push(skyGeo);const sky=new T.Mesh(skyGeo,skyMaterial);sky.frustumCulled=false;sky.renderOrder=-100;root.add(sky);
 const smokeGeo=new T.PlaneGeometry(20,5);geometries.push(smokeGeo);
 const smokeMaterial=new T.ShaderMaterial({uniforms:{time,alpha:{value:0},wind:{value:wind}},vertexShader:'varying vec2 tex;void main(){tex=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',fragmentShader:'varying vec2 tex;uniform sampler2D wind;uniform float time;uniform float alpha;void main(){vec2 u=tex*vec2(2.,1.);float t=time*.15;float n=texture2D(wind,u+vec2(-t,t*.4)).r*texture2D(wind,u*1.25+vec2(-t,.75)).r*texture2D(wind,u*.5+vec2(-t,-t*.35)).r;float a=n*8.*(1.-tex.y)*smoothstep(0.,.1,tex.y)*smoothstep(0.,.5,tex.x)*(1.-smoothstep(.8,1.,tex.x))*alpha;gl_FragColor=vec4(1.,1.,1.,a);}',transparent:true,depthWrite:false});materials.push(smokeMaterial);
 for(const p of [[-5,1.25,-10],[13.45,3,-4]]){const smoke=new T.Mesh(smokeGeo,smokeMaterial);smoke.position.fromArray(p);smoke.renderOrder=3;root.add(smoke)}
 // The reference uses sparse, rotating snowflakes in a 50 × 20 × 50 volume,
 // not a dense screen-space star field. Motion is evaluated in world space.
 const snowGeometry=new T.InstancedBufferGeometry();const flake=new T.PlaneGeometry(.075,.15);snowGeometry.index=flake.index;snowGeometry.attributes=flake.attributes;const seeds=new Float32Array(1200*4);let seed=82741;const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296};for(let i=0;i<1200;i++){seeds.set([random()*50-25,random()*20-10,random()*50-25,random()],i*4)}snowGeometry.setAttribute('seed',new T.InstancedBufferAttribute(seeds,4));snowGeometry.instanceCount=1200;geometries.push(snowGeometry);
 const snowMaterial=new T.ShaderMaterial({uniforms:{time,alpha:{value:0}},vertexShader:`attribute vec4 seed;uniform float time;varying vec2 tex;varying float fade;void main(){tex=uv;float a=time*(.75+seed.w*.5)+seed.w*6.283;vec2 q=mat2(cos(a),sin(a),-sin(a),cos(a))*position.xy;vec3 drift=vec3(1.35+sin(time*.2+seed.w*15.6547)*.4, -1.08-fract(seed.w*31.342)*.65,1.35)*time;vec3 center=mod(seed.xyz+drift+vec3(25.,10.,25.),vec3(50.,20.,50.))-vec3(25.,10.,25.);vec4 view=modelViewMatrix*vec4(center,1.);view.xy+=q;fade=smoothstep(0.,3.,-view.z)*(1.-smoothstep(25.,55.,-view.z));gl_Position=projectionMatrix*view;}`,fragmentShader:`varying vec2 tex;varying float fade;uniform float alpha;void main(){vec2 q=tex*2.-1.;float a=exp(-dot(q,q)*3.)*.5*fade*alpha;gl_FragColor=vec4(.9,.95,1.,a);}`,transparent:true,depthWrite:false});materials.push(snowMaterial);const snow=new T.Mesh(snowGeometry,snowMaterial);snow.frustumCulled=false;snow.renderOrder=5;root.add(snow);
 const ray=new T.Raycaster(),plane=new T.Plane(),normal=new T.Vector3(),point=new T.Vector3(),target=new T.Vector3(),start=new T.Vector3(-14,21,14),end=new T.Vector3();
 return {root,lutPass,model,
 update(elapsed:number,progress:number,dt:number,pointer:T.Vector2,camera:T.PerspectiveCamera,reduced:boolean){
  const t=reduced?10:Math.max(0,elapsed-.65),weight=smooth(2,7.5,t),scroll=.495+Math.min(progress,.95)*.505;
  time.value=reduced?0:t;reveal.value=smooth(1.1,3.35,t);terrainReveal.value=t<2.1?0:smooth(.7,8.2,t);depart.value=smooth(.08,.95,progress);root.visible=progress<.95;lutPass.enabled=progress<.95;
  resolution.value.set(renderer.domElement.width,renderer.domElement.height);lutPass.uniforms.gradient.value=smooth(1,5,t);skyMaterial.uniforms.phase.value=smooth(1.5,4.5,t);smokeMaterial.uniforms.alpha.value=smooth(2,5,t)*(1.-depart.value);snowMaterial.uniforms.alpha.value=smooth(2,6,t);
  wireMaterial.opacity=.4*smooth(0,.1,t)*(1.-smooth(2.1,5.1,t));outlineMaterial.opacity=smooth(0,2.5,t)*(1.-smooth(2,5,t));model.visible=t>=1.1;
  introProgress.value=smooth(.5,4.5,t);introAlpha.value=1-smooth(1.75,3.75,t);introParticles.visible=t<3.75;
  const damping=1-Math.pow(.94,dt*60);for(const piece of centers.values()){const c=piece.center,r=piece.random;const idle=.1*(Math.sin(-t*2+c.x)*.5+.5)*(Math.cos(-t)*.5+.5)*T.MathUtils.lerp(.5,2,r.z)*smooth(2,4,t);const hover=(1-smooth(1,3,c.distanceTo(mouse.value)))*(.5+.3*Math.sin(t+r.x*12.342)*r.y);const desired=Math.max(idle,hover)*smooth(.45,.7,c.y)*reveal.value;piece.target=T.MathUtils.lerp(piece.target,desired,damping);piece.amount=T.MathUtils.lerp(piece.amount,piece.target,damping);stateData[piece.id*4]=piece.amount;piece.position.copy(c).multiplyScalar(1+piece.amount);}
  stateMap.needsUpdate=true;
  const selected=[...centers.values()].filter(p=>p.amount>.1&&p.position.distanceTo(mouse.value)<3).sort((a,b)=>a.position.distanceToSquared(mouse.value)-b.position.distanceToSquared(mouse.value)).slice(0,5);connectionMaterial.opacity=T.MathUtils.damp(connectionMaterial.opacity,selected.length>1?.25:0,8,dt)*(1-depart.value);connectionData.fill(0);labels.forEach((label,i)=>{const piece=selected[i];label.material.opacity=piece?connectionMaterial.opacity*3:0;if(!piece)return;label.position.copy(piece.position).addScaledVector(piece.center.clone().normalize(),.2);if(i<selected.length-1){label.position.toArray(connectionData,i*6);selected[i+1].position.toArray(connectionData,i*6+3)}});connectionGeometry.attributes.position.needsUpdate=true;
  if(progress<.95){const track=scroll*21,ease=1-Math.pow(1-Math.min(track/14,1),3),pan=smooth(7,21,track);end.set(-13.25-2*pan,11.5-9*ease,13.25+10*pan);camera.fov=30;camera.far=1000;camera.zoom=Math.min(1,camera.aspect*1.25);camera.position.lerpVectors(start,end,weight);target.set(0,T.MathUtils.lerp(.5,15-14*ease,weight),0);camera.position.x+=pointer.x*.07*weight;camera.position.y-=pointer.y*.025*weight;camera.lookAt(target);camera.updateProjectionMatrix();camera.updateMatrixWorld();camera.getWorldDirection(normal);point.copy(camera.position).addScaledVector(normal,19.25);plane.setFromNormalAndCoplanarPoint(normal,point);ray.setFromCamera(new T.Vector2(pointer.x,-pointer.y),camera);if(ray.ray.intersectPlane(plane,point))mouse.value.lerp(point,1-Math.exp(-dt*3));}
 },
 dispose(){root.removeFromParent();textures.forEach(t=>t.dispose());geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());loader.dispose();lutPass.dispose()}};
}
