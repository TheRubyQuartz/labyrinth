import * as T from 'three';

// Deterministic multiscale mineral texture, generated locally without external assets.
export function createMineralTexture(){
 const canvas=document.createElement('canvas');canvas.width=canvas.height=512;
 const ctx=canvas.getContext('2d')!,pixels=ctx.createImageData(512,512);
 const hash=(x:number,y:number)=>{const n=Math.sin(x*127.1+y*311.7)*43758.5453;return n-Math.floor(n)};
 const noise=(x:number,y:number)=>{const ix=Math.floor(x),iy=Math.floor(y);let u=x-ix,v=y-iy;u=u*u*(3-2*u);v=v*v*(3-2*v);return T.MathUtils.lerp(T.MathUtils.lerp(hash(ix,iy),hash(ix+1,iy),u),T.MathUtils.lerp(hash(ix,iy+1),hash(ix+1,iy+1),u),v)};
 for(let y=0;y<512;y++)for(let x=0;x<512;x++){const a=noise(x/64,y/64),b=noise(x/17,y/17),c=noise(x/4,y/4),vein=Math.abs(Math.sin(x*.035+y*.026+a*7));const n=72+a*76+b*42+c*20+vein*18;const i=(y*512+x)*4;pixels.data.set([n*.86,n,n*.82,255],i)}
 ctx.putImageData(pixels,0,0);const map=new T.CanvasTexture(canvas);map.wrapS=map.wrapT=T.RepeatWrapping;map.repeat.set(2,2);return map;
}

export function makeStageEnvironment(scene:T.Scene,index:number){
 const group=new T.Group();scene.add(group);
 const materials:T.Material[]=[],geometries:T.BufferGeometry[]=[];
 const surface=new T.MeshStandardMaterial({color:'#1c2a20',roughness:.9,metalness:.15});materials.push(surface);
 const baseGeometry=new T.CylinderGeometry(3.3,3.6,.13,96);geometries.push(baseGeometry);const base=new T.Mesh(baseGeometry,surface);base.position.y=-2.7;group.add(base);
 const lineMaterial=new T.LineBasicMaterial({color:'#708762',transparent:true,opacity:.3});materials.push(lineMaterial);
 for(let ring=0;ring<5;ring++){const points=[];for(let j=0;j<=128;j++){const a=j/128*Math.PI*2,r=3.6+ring*.42;points.push(new T.Vector3(Math.cos(a)*r,-2.69,Math.sin(a)*r))}const g=new T.BufferGeometry().setFromPoints(points);geometries.push(g);group.add(new T.Line(g,lineMaterial))}
 const dustGeometry=new T.BufferGeometry(),positions=new Float32Array(420*3);for(let i=0;i<420;i++)positions.set([Math.sin(i*17.31+index)*6,Math.cos(i*31.79)*4,Math.sin(i*9.13)*4-2],i*3);dustGeometry.setAttribute('position',new T.BufferAttribute(positions,3));geometries.push(dustGeometry);
 const dustMaterial=new T.PointsMaterial({color:'#d5ee9e',size:.012,transparent:true,opacity:.25,depthWrite:false});materials.push(dustMaterial);const dust=new T.Points(dustGeometry,dustMaterial);group.add(dust);
 const rim=new T.PointLight('#c5e99a',12,12,2);rim.position.set(-3,1,-2);group.add(rim);
 return {dust,dispose(){scene.remove(group);materials.forEach(m=>m.dispose());geometries.forEach(g=>g.dispose())}};
}
