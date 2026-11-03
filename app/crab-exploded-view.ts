import * as THREE from 'three';

export const assemblies=['Shell','Left claw','Right claw','Left legs','Right legs','Mouth & eyes','Underside'];
export function createCrabExplosion(root:THREE.Object3D){
 root.updateMatrixWorld(true);
 const meshes:THREE.Mesh[]=[];root.traverse(o=>{if(o instanceof THREE.Mesh)meshes.push(o)});
 function category(name:string,center:THREE.Vector3){
  if(/granulation|Carapace|Dorsal/i.test(name))return 0;
  if(/chela|claw|wrist|shoulder/i.test(name))return center.x<0?1:2;
  if(/^Leg |Walking|Coxa|Knee|Distal membrane/i.test(name))return center.x<0?3:4;
  if(/ventral|abdominal|sternum|coxal collar/i.test(name))return 6;
  return 5;
 }
 const originals=meshes.filter(m=>!/granulation/i.test(m.name)).map(m=>{const box=new THREE.Box3().setFromObject(m);return {box,group:category(m.name,box.getCenter(new THREE.Vector3()))}});
 // Keep decorative shell grains attached to the relevant assembly during separation.
 for(const m of [...meshes])if(/granulation/i.test(m.name)){
  const g=m.geometry.index?m.geometry.toNonIndexed():m.geometry.clone(),p=g.getAttribute('position'),normal=g.getAttribute('normal');
  const buckets=assemblies.map(()=>({p:[] as number[],n:[] as number[]}));
  for(let i=0;i<p.count;i+=3){
   const c=new THREE.Vector3();for(let j=0;j<3;j++)c.add(new THREE.Vector3().fromBufferAttribute(p,i+j));c.multiplyScalar(1/3);m.localToWorld(c);
   let group=0,distance=Infinity;for(const item of originals){const d=item.box.distanceToPoint(c);if(d<distance){distance=d;group=item.group}}
   for(let j=0;j<3;j++){buckets[group].p.push(p.getX(i+j),p.getY(i+j),p.getZ(i+j));if(normal)buckets[group].n.push(normal.getX(i+j),normal.getY(i+j),normal.getZ(i+j))}
  }
  buckets.forEach((b,id)=>{if(!b.p.length)return;const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(b.p,3));if(b.n.length)geo.setAttribute('normal',new THREE.Float32BufferAttribute(b.n,3));else geo.computeVertexNormals();const part=new THREE.Mesh(geo,m.material);part.name=m.name+' '+assemblies[id];part.position.copy(m.position);part.quaternion.copy(m.quaternion);part.scale.copy(m.scale);part.userData.assembly=id;m.parent?.add(part);meshes.push(part)});
  g.dispose();m.visible=false;meshes.splice(meshes.indexOf(m),1);
 }
 const vectors=[[0,2,0],[-2,.3,1.1],[2,.3,1.1],[-1.9,-.15,-.4],[1.9,-.15,-.4],[0,.1,2.4],[0,-1.8,0]].map(v=>new THREE.Vector3(...v));
 const parts=meshes.map(m=>{const id=m.userData.assembly??category(m.name,new THREE.Box3().setFromObject(m).getCenter(new THREE.Vector3()));m.userData.assembly=id;return {mesh:m,id,home:m.position.clone(),offset:vectors[id].clone()}});
 return {
  meshes,
  update(progress:number,selected:number,isolate:boolean){for(const p of parts){const t=THREE.MathUtils.clamp((progress-p.id*.025)/.82,0,1),ease=t*t*(3-2*t);p.mesh.position.copy(p.home).addScaledVector(p.offset,ease);p.mesh.visible=!isolate||selected<0||p.id===selected}},
  dispose(){for(const m of meshes)if(m.name.includes('granulation '))m.geometry.dispose()}
 };
}
