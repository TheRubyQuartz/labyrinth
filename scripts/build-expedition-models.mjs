import * as T from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
export function buildExpeditionModels(save){
 let parts=[],id=0;
 const palette=['#1e4657','#edf2e7','#b5ccca','#cca764','#415b69','#6da6bc','#2b6076'];
 function add(g,p,c,rotation=[0,0,0]){g.rotateX(rotation[0]);g.rotateY(rotation[1]);g.rotateZ(rotation[2]);g.translate(...p);if(g.index)g=g.toNonIndexed();g.computeBoundingBox();const center=g.boundingBox.getCenter(new T.Vector3()),n=g.attributes.position.count,color=new T.Color(palette[c]),colors=[],centers=[],phases=[];for(let i=0;i<n;i++){colors.push(color.r,color.g,color.b);centers.push(...center.toArray());phases.push((id*.618)%1)}g.setAttribute('color',new T.Float32BufferAttribute(colors,3));g.setAttribute('centr',new T.Float32BufferAttribute(centers,3));g.setAttribute('phase',new T.Float32BufferAttribute(phases,1));parts.push(g);id++;}
 const box=(w,h,d)=>new RoundedBoxGeometry(w,h,d,1,Math.min(w,h,d)*.18);
 function finish(name){save(name,mergeGeometries(parts));parts=[];id=0}
 // Open, leather-bound field journal. Separate page leaves disperse individually.
 for(const side of [-1,1]){
  const angle=side*.13;add(box(1.87,2.65,.16),[side*.94,0,-.17],0,[0,angle,0]);
  for(let i=0;i<14;i++)add(box(1.75,2.48,.018),[side*.91,0,-.06+i*.013],i%3?1:2,[0,angle,0]);
  // Ruled pages, a diagram, annotation marks and gilt corner hardware.
  for(let row=0;row<12;row++){const y=.94-row*.16;const length=row%4===3?1.02:1.4;add(new T.BoxGeometry(length,.008,.004),[side*.94,y,.155],2,[0,angle,0]);}
  for(const y of [-1.19,1.19])for(const x of [.15,1.7])add(box(.15,.15,.03),[side*x,y,-.065],3,[0,angle,0]);
 }
 add(box(.15,2.64,.24),[0,0,-.13],3);
 for(let i=0;i<6;i++)add(new T.TorusGeometry(.11,.022,8,20),[0,-1.02+i*.405,.02],3,[0,Math.PI/2,0]);
 add(new T.TorusGeometry(.34,.009,6,48),[-.91,.48,.19],4);for(let i=0;i<4;i++)add(new T.ConeGeometry(.06,.33,3),[-.91+Math.sin(i*Math.PI/2)*.15,.48+Math.cos(i*Math.PI/2)*.15,.21],3,[0,0,-i*Math.PI/2]);
 add(box(.12,.85,.008),[.32,-1.09,.22],5,[0,0,-.15]);
 // A substantial pencil floats alongside the journal.
 add(new T.CylinderGeometry(.045,.045,2.2,8),[2.02,-.12,.1],3,[0,0,-.16]);add(new T.ConeGeometry(.045,.22,8),[1.827,-1.314,.1],4,[0,0,Math.PI-.16]);
 finish('expedition-book');
 // Thick desk calendar, layered paper, metal rings, a ruled month and raised day marker.
 add(box(2.18,2.5,.18),[0,0,-.15],0);add(box(2.1,.28,.9),[0,-1.26,-.4],0);
 for(let i=0;i<10;i++)add(box(1.98,2.2,.025),[0,-.03,-.03+i*.024],i%3?1:2);
 add(box(1.96,.42,.025),[0,.85,.23],6);
 for(let i=0;i<6;i++)add(new T.TorusGeometry(.12,.027,8,24),[-.75+i*.3,1.14,.06],3,[Math.PI/2,0,0]);
 for(let row=0;row<5;row++)for(let col=0;col<7;col++){
  const x=-.8+col*.267,y=.43-row*.3;add(box(.225,.245,.012),[x,y,.25],row===2&&col===3?5:2);
  for(let digit=0;digit<(row*7+col)%3+1;digit++)add(new T.BoxGeometry(.018,.055,.004),[x-.035+digit*.026,y+.025,.26],4);
 }
 add(new T.TorusGeometry(.113,.014,8,24),[0,-.17,.29],3);
 finish('expedition-calendar');
 // Field kit: packed canvas bag, compass, specimen vial and binoculars.
 add(box(2.15,2.45,.8),[0,0,0],0);add(box(1.84,.8,.28),[0,.7,.5],6);
 add(box(1.5,.8,.3),[0,-.58,.55],6);for(const x of [-.62,.62]){add(box(.14,2.25,.08),[x,0,.5],3);add(box(.26,.22,.06),[x,.14,.6],4)}
 add(new T.TorusGeometry(.38,.065,8,32),[0,1.29,-.05],3);
 add(new T.CylinderGeometry(.43,.43,.14,48),[-1.43,-.65,.4],3,[Math.PI/2,0,0]);add(new T.CylinderGeometry(.36,.36,.025,48),[-1.43,-.65,.49],1,[Math.PI/2,0,0]);
 add(new T.ConeGeometry(.09,.52,3),[-1.43,-.59,.53],5,[0,0,-.4]);
 for(const x of [1.34,1.82]){add(new T.CylinderGeometry(.22,.3,.85,24),[x,-.5,.15],4,[Math.PI/2,0,.12]);add(new T.CylinderGeometry(.2,.2,.05,24),[x,-.5,.63],5,[Math.PI/2,0,0]);}add(box(.62,.16,.2),[1.58,-.43,.4],3);
 add(new T.CylinderGeometry(.16,.16,.82,20),[-1.45,.55,.1],2);add(new T.CylinderGeometry(.18,.18,.14,20),[-1.45,1.01,.1],3);add(box(.26,.24,.01),[-1.45,.55,.265],1);
 finish('expedition-kit');
}
