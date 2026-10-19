export function volcanicMountains(scene,{Geometry,Attribute,Points,Material,time}){
 const g=new Geometry(),positions=[],uvs=[],segments=112,rings=40;
 function vertex(r,a){const radius=r*8,crater=Math.exp(-radius*radius*.65)*1.8;const height=6*Math.pow(1-r,1.55)-crater;const rough=Math.sin(a*7+radius*.7)*Math.sin(a*13-radius)*.2*r;return [Math.cos(a)*radius,height+rough,Math.sin(a)*radius]}
 for(let j=0;j<rings;j++)for(let i=0;i<segments;i++){const r=j/rings,r1=(j+1)/rings,a=i/segments*Math.PI*2,a1=(i+1)/segments*Math.PI*2;for(const [rr,aa]of [[r,a],[r1,a1],[r1,a],[r,a],[r,a1],[r1,a1]]){positions.push(...vertex(rr,aa));uvs.push(aa/(Math.PI*2),rr)}}
 g.setAttribute('position',new Attribute(new Float32Array(positions),3));g.setAttribute('uv',new Attribute(new Float32Array(uvs),2));g.computeVertexNormals();
 const mountains=Object.values(scene.mountains).filter(x=>x?.isMesh);
 // Keep the original sculpted mountain mesh, UVs, silhouette and placement intact.
 const source=mountains[0].geometry.attributes.position;let summit={x:0,y:-Infinity,z:0};for(let i=0;i<source.count;i++)if(source.getY(i)>summit.y)summit={x:source.getX(i),y:source.getY(i),z:source.getZ(i)};
 const material=scene.mountains.mesh1.material;material.uniforms.lavaTime={value:0};
 material.uniforms.lavaPeak={value:summit};
 material.fragmentShader=material.fragmentShader.replace('uniform float uAlpha;','uniform float uAlpha;\nuniform float lavaTime;uniform vec3 lavaPeak;');
 material.fragmentShader=material.fragmentShader.replace('gl_FragColor = vec4(color, alpha);',`
 vec3 local=vPos-lavaPeak;float radius=length(local.xz);float river=0.;
 for(int i=0;i<4;i++){float angle=float(i)*1.71+.35;vec2 dir=vec2(cos(angle),sin(angle));float along=dot(local.xz,dir),across=dot(local.xz,vec2(-dir.y,dir.x));float bend=sin(along*2.+float(i))*.09+sin(along*4.3)*.025;float width=.035+.025*sin(along*1.7)*sin(along*1.7);float channel=1.-smoothstep(width,width+.04,abs(across-bend));river=max(river,channel*smoothstep(-.1,.2,along)*(1.-smoothstep(4.,6.,along)));}
 float crater=1.-smoothstep(.12,.35,radius);
 float flow=texture2D(tMap,vUv*3.+vec2(lavaTime*.012,-lavaTime*.025)).r;
 float hot=max(river,crater);float reveal=smoothstep(.2,.95,uProgress2);
 vec3 crust=texture2D(tMap,vUv).rgb*vec3(.22,.13,.09);
 vec3 lava=mix(vec3(.6,.025,.001),vec3(2.2,.65,.025),smoothstep(.15,.7,flow));
 lava=mix(crust,lava,smoothstep(.08,.28,flow));
 color=mix(color,crust,hot*reveal*.6);color+=lava*hot*reveal*(1.-distanceFog*.6);
 gl_FragColor=vec4(color,alpha);`);material.needsUpdate=true;
 const p=[],random=[];for(let i=0;i<1800;i++){p.push(0,0,0);random.push(Math.random(),Math.random(),Math.random())}const ashGeometry=new Geometry();ashGeometry.setAttribute('position',new Attribute(new Float32Array(p),3));ashGeometry.setAttribute('random',new Attribute(new Float32Array(random),3));
 const smokeMaterial=new Material({transparent:true,depthWrite:false,uniforms:{clock:{value:0},reveal:{value:0}},vertexShader:`attribute vec3 random;uniform float clock;uniform float reveal;varying float opacity;varying float ember;void main(){float age=mod(clock*.1+random.x,1.);float spread=.4+age*3.;vec3 p=vec3(sin(random.y*62.+age*4.)*spread,5.+age*12.,cos(random.z*62.+age*3.)*spread);p.x+=age*age*5.;vec4 v=modelViewMatrix*vec4(p,1.);gl_Position=projectionMatrix*v;ember=step(.94,random.z);gl_PointSize=mix(1300.,90.,ember)*(1.+age)/max(1.,-v.z);opacity=reveal*sin(age*3.14159)*mix(.035,.8,ember);}`,fragmentShader:`varying float opacity;varying float ember;void main(){float r=length(gl_PointCoord-.5)*2.;if(r>1.)discard;gl_FragColor=vec4(mix(vec3(.13,.105,.10),vec3(1.,.32,.035),ember),opacity*pow(1.-r,2.));}`});
 smokeMaterial.uniforms.summit={value:summit};smokeMaterial.vertexShader=smokeMaterial.vertexShader.replace('uniform float clock;','uniform float clock;uniform vec3 summit;').replace('p.x+=age*age*5.;','p= summit+(p-vec3(0.,5.,0.))*.4;p.x+=age*age*2.;');
 for(const mesh of mountains){const plume=new Points(ashGeometry,smokeMaterial);plume.matrix.copy(mesh.matrix);plume.matrixAutoUpdate=false;plume.frustumCulled=false;scene.add(plume)}
 scene.beforeRenderCbs.push(()=>{material.uniforms.lavaTime.value=time.time;smokeMaterial.uniforms.clock.value=time.time;smokeMaterial.uniforms.reveal.value=material.uniforms.uProgress2.value});
}
