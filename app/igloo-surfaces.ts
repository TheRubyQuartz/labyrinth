import * as T from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
// Deterministic, continuous noise: unlike screen-space random grain this does
// not crawl across surfaces as the camera moves.
const hash=(x:number,y:number,z:number)=>{const n=Math.sin(x*127.1+y*311.7+z*74.7)*43758.5453;return n-Math.floor(n)};
export function noise(x:number,y:number,z:number){const ix=Math.floor(x),iy=Math.floor(y),iz=Math.floor(z),f=(v:number)=>v*v*(3-2*v);const a=f(x-ix),b=f(y-iy),c=f(z-iz),mix=T.MathUtils.lerp;return mix(mix(mix(hash(ix,iy,iz),hash(ix+1,iy,iz),a),mix(hash(ix,iy+1,iz),hash(ix+1,iy+1,iz),a),b),mix(mix(hash(ix,iy,iz+1),hash(ix+1,iy,iz+1),a),mix(hash(ix,iy+1,iz+1),hash(ix+1,iy+1,iz+1),a),b),c)}
export function relief(x:number,z:number){let result=0,amp=1,f=.12;for(let i=0;i<6;i++){result+=(noise(x*f,0,z*f)-.5)*amp;amp*=.48;f*=2.13}return result}
export function domeRadius(y:number){return 2.45*Math.sqrt(Math.max(.004,1-(Math.max(0,y-1.05)/2.75)**2))}
export function curvedIceBlock(y:number,height:number,count:number){const radius=domeRadius(y),width=2*Math.PI*radius/count-.045,g=new RoundedBoxGeometry(width,height,.43,7,.075),p=g.attributes.position;for(let i=0;i<p.count;i++){const x=p.getX(i),dy=p.getY(i),z=p.getZ(i),a=x/radius,r=domeRadius(y+dy)+z;p.setXYZ(i,Math.sin(a)*r,dy,Math.cos(a)*r-radius)}g.computeVertexNormals();return roughen(g,.006,17)}
export function roughen(g:T.BufferGeometry,amount:number,frequency:number){const p=g.attributes.position,n=g.attributes.normal;for(let i=0;i<p.count;i++){const x=p.getX(i),y=p.getY(i),z=p.getZ(i),d=(noise(x*frequency,y*frequency,z*frequency)-.5)*amount;p.setXYZ(i,x+n.getX(i)*d,y+n.getY(i)*d,z+n.getZ(i)*d)}g.computeVertexNormals();return g}
export function frostMaterial(){const m=new T.MeshStandardMaterial({color:'#79818d',roughness:.87,metalness:.08});const reveal={value:1};m.userData.reveal=reveal;m.onBeforeCompile=s=>{
 s.uniforms.uSurfaceReveal=reveal;
 s.vertexShader=s.vertexShader.replace('#include <common>','#include <common>\nvarying vec3 vFrostPosition;').replace('#include <begin_vertex>','#include <begin_vertex>\nvFrostPosition=position;');
 s.fragmentShader=s.fragmentShader.replace('#include <common>',`#include <common>
 varying vec3 vFrostPosition;uniform float uSurfaceReveal;
 float fh(vec3 p){return fract(sin(dot(p,vec3(127.1,311.7,74.7)))*43758.5453);}
 float fn(vec3 p){vec3 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(mix(fh(i),fh(i+vec3(1,0,0)),f.x),mix(fh(i+vec3(0,1,0)),fh(i+vec3(1,1,0)),f.x),f.y),mix(mix(fh(i+vec3(0,0,1)),fh(i+vec3(1,0,1)),f.x),mix(fh(i+vec3(0,1,1)),fh(i+vec3(1,1,1)),f.x),f.y),f.z);}
 `).replace('#include <color_fragment>',`#include <color_fragment>
 if(uSurfaceReveal<.999&&fn(vFrostPosition*3.)>uSurfaceReveal)discard;
 float frost=fn(vFrostPosition*9.)*.55+fn(vFrostPosition*37.)*.3+fn(vFrostPosition*130.)*.15;
 diffuseColor.rgb*=.66+frost*.65;
 `).replace('#include <normal_fragment_maps>',`#include <normal_fragment_maps>
 float height=fn(vFrostPosition*28.)*.0045+fn(vFrostPosition*100.)*.0007;
 vec3 q0=dFdx(-vViewPosition),q1=dFdy(-vViewPosition);vec3 r1=cross(q1,normal),r2=cross(normal,q0);float det=dot(q0,r1);
 normal=normalize(abs(det)*normal-sign(det)*(dFdx(height)*r1+dFdy(height)*r2));
 `)};return m}

export function surfaceCloud(objects:T.Mesh[],seed:number){const count=22000,positions=new Float32Array(count*3),randoms=new Float32Array(count*3);const v=new T.Vector3();objects.forEach(o=>o.updateMatrix());for(let i=0;i<count;i++){const o=objects[i%objects.length],p=o.geometry.attributes.position,idx=Math.floor(hash(i,seed,2)*p.count);v.fromBufferAttribute(p,idx).applyMatrix4(o.matrix);v.toArray(positions,i*3);randoms.set([hash(i,seed,3),hash(i,seed,4),hash(i,seed,5)],i*3)}const g=new T.BufferGeometry();g.setAttribute('position',new T.BufferAttribute(positions,3));g.setAttribute('aRandom',new T.BufferAttribute(randoms,3));const m=new T.ShaderMaterial({transparent:true,depthWrite:false,blending:T.AdditiveBlending,uniforms:{uSpread:{value:0},uTime:{value:0},uOpacity:{value:0}},vertexShader:`attribute vec3 aRandom;uniform float uSpread,uTime;varying float alpha;void main(){vec3 p=position;vec3 d=(aRandom-.5)*20.;p+=d*uSpread;p.x+=sin(p.y*2.+uTime)*uSpread*.4;p.y+=uSpread*uSpread*5.;vec4 mv=modelViewMatrix*vec4(p,1.);gl_Position=projectionMatrix*mv;gl_PointSize=clamp(18./-mv.z,1.,3.);alpha=.25+aRandom.z*.65;}`,fragmentShader:`uniform float uOpacity;varying float alpha;void main(){float a=1.-smoothstep(.15,.5,length(gl_PointCoord-.5));gl_FragColor=vec4(.78,.9,1.,a*alpha*uOpacity);}`});return new T.Points(g,m)}
