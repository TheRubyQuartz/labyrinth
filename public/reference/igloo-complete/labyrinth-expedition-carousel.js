export function installExpeditionCarousel(scene,{Points,Geometry,Attribute,Material,Vector,Tween,time,element,button,overlay}){
 const names=['Field journal','Reading calendar','Field kit'];scene.selectedExhibit=0;scene.carouselPosition=0;
 const hud=scene.hud=overlay('lab-expedition-hud lab-expedition-carousel'),header=element('header');
 header.append(element('span','','FIRE / YOUR NEXT EXPEDITION'),element('h2','','Read. Reflect. Explore.'));hud.append(header);
 const nav=element('nav');nav.setAttribute('aria-label','Expedition carousel');nav.append(button('←',()=>select(scene.selectedExhibit-1)));
 const tabs=names.map((name,i)=>{const b=button(name,()=>select(i));b.setAttribute('aria-label','Show '+name);nav.append(b);return b});nav.append(button('→',()=>select(scene.selectedExhibit+1)));hud.append(nav);
 const caption=element('div','lab-expedition-model-caption');const count=element('span'),title=element('h3'),action=button('Open field journal ↗',()=>activate());caption.append(count,title,action);hud.append(caption,element('p','lab-expedition-scroll','SWIPE SIDEWAYS TO EXPLORE · SCROLL DOWN TO RETURN TO THE GATEWAY'));scene.journalTrigger=tabs[0];scene.calendarTrigger=tabs[1];const atmosphere=element('div','lab-fire-atmosphere');atmosphere.setAttribute('aria-hidden','true');for(let i=0;i<48;i++){const ember=element('i');ember.style.setProperty('--x',((i*37)%101)+'%');ember.style.setProperty('--delay',(-i*.43)+'s');ember.style.setProperty('--duration',(5+i%8)+'s');ember.style.setProperty('--drift',((i%2?1:-1)*(40+i%7*25))+'px');atmosphere.append(ember)}hud.prepend(atmosphere);
 function activate(){if(scene.selectedExhibit===2)parent.location.assign('/?view=marketplace');else scene.openEditor(scene.selectedExhibit===0?'journal':'calendar')}
 function select(i){scene.selectedExhibit=(i+3)%3;if(scene.originalParticles){const p=scene.originalParticles,u=p.mesh.computationMaterial.uniforms;p.currentLink=scene.selectedExhibit;u.tVolume.value=p.vdbs[p.currentLink];u.uVolumeScale.value=p.vdbScales[p.currentLink];u.uRotation.value=Math.PI*1.5;Tween.fromTo(u.uAdditionalNoise,{value:1},{value:0,duration:.5,ease:"power2.inOut",overwrite:true});}tabs.forEach((b,j)=>b.setAttribute('aria-pressed',String(j===scene.selectedExhibit)));count.textContent=`0${scene.selectedExhibit+1} / 03`;title.textContent=names[scene.selectedExhibit];action.textContent=['Open field journal ↗','Open reading calendar ↗','Explore the marketplace ↗'][scene.selectedExhibit];}
 scene.selectExhibit=select;select(0);
 let drag=null,lastWheel=0;
 const active=()=>scene.isSceneVisible&&scene.progress>.3&&scene.progress<.83&&!scene.editorOpen;
 addEventListener('pointermove',e=>{scene.pointer={x:e.clientX/innerWidth*2-1,y:1-e.clientY/innerHeight*2}});
 addEventListener('pointerdown',e=>{if(active()&&!e.target.closest('button,a,input,textarea'))drag=[e.clientX,e.clientY]},true);
 addEventListener('pointerup',e=>{if(!drag)return;const dx=e.clientX-drag[0],dy=e.clientY-drag[1];drag=null;if(!active())return;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)*1.35){e.stopImmediatePropagation();select(scene.selectedExhibit-Math.sign(dx));return}if(Math.hypot(dx,dy)<7&&!e.target.closest('button,a,input,textarea')){const origin=new Vector().setFromMatrixPosition(scene.camera.matrixWorld),direction=new Vector(e.clientX/innerWidth*2-1,1-e.clientY/innerHeight*2,.5).unproject(scene.camera).sub(origin).normalize(),p=origin.clone().addScaledVector(direction,-origin.z/direction.z),m=scene.models[scene.selectedExhibit];if(Math.abs(p.x-m.position.x)<(scene.selectedExhibit===1?1.1:2.1)*m.scale.x&&Math.abs(p.y-m.position.y)<1.5*m.scale.y)activate()}},true);
 addEventListener('wheel',e=>{if(active()&&Math.abs(e.deltaX)>Math.abs(e.deltaY)&&Math.abs(e.deltaX)>10){e.preventDefault();e.stopImmediatePropagation();if(performance.now()-lastWheel>450){select(scene.selectedExhibit+Math.sign(e.deltaX));lastWheel=performance.now()}}},{capture:true,passive:false});
 addEventListener('keydown',e=>{if(e.key==='Escape'&&scene.editorOpen){e.stopImmediatePropagation();scene.closeEditor();return}if(active()&&['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();e.stopImmediatePropagation();select(scene.selectedExhibit+(e.key==='ArrowRight'?1:-1))}},true);
 const simulation=scene.originalParticles,particleMesh=simulation.mesh;
 particleMesh.position.set(0,0,0);particleMesh.scale.setScalar(15);particleMesh.updateMatrixWorld(true);
 simulation.soundControl.mesh.position.set(0,0,0);simulation.soundControl.mesh.scale.setScalar(15);simulation.soundControl.mesh.updateMatrixWorld(true);
 const uniforms=particleMesh.material.uniforms;
 uniforms.uColorInitial.value.set('#ffb34a');uniforms.uColorLight.value.set('#ff7b13');uniforms.uColorDark.value.set('#7d1605');uniforms.uColorFast.value.set('#fff1ae');
 // The original velocity/curl/volume simulation and pointer fluid interaction remain intact.
 const compute=particleMesh.computationMaterial;
 compute.fragmentShader=compute.fragmentShader.replace('// add curl noise','currentVel.y += .000025 * dtRatio;\n                        // add curl noise');compute.needsUpdate=true;
 scene.expeditionParticles=[particleMesh];
 let previous=performance.now();const smooth=(a,b,x)=>{const t=Math.max(0,Math.min(1,(x-a)/(b-a)));return t*t*(3-2*t)};
 scene.updateCarousel=()=>{const now=performance.now(),dt=Math.min(.08,(now-previous)/1000);previous=now;scene.carouselPosition+=(scene.selectedExhibit-scene.carouselPosition)*(1-Math.exp(-dt*6));const vertical=smooth(.12,.38,scene.progress)*(1-smooth(.7,1,scene.progress)),mobile=innerWidth<650,t=time.time;
  scene.camera.zoom=mobile?Math.min(1,innerWidth/innerHeight*1.5):1;scene.camera.updateProjectionMatrix();
  scene.models.forEach(model=>{model.visible=false});
  particleMesh.visible=scene.isSceneVisible&&!scene.editorOpen;
  uniforms.uAlpha.value=vertical;uniforms.uInitialGlow.value=1-smooth(.12,.38,scene.progress);
  simulation.mesh.computationMaterial.uniforms.uShowNoise.value=1-vertical;
  simulation.mesh.computationMaterial.uniforms.uInteractForce.value=vertical;
  particleMesh.scale.setScalar(mobile?11.6:15);particleMesh.updateMatrixWorld(true);

 };
}
