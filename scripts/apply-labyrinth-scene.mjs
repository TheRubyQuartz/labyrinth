import fs from 'node:fs';
const path='public/reference/igloo-complete/assets/App3D-d68cb154.js';let s=fs.readFileSync(path,'utf8');
if(!s.includes('installLabyrinth({')){
 s='import {installLabyrinth} from "../labyrinth-adapter.js";\n'+s;
 const marker='muted:!0};class u3';if(!s.includes(marker))throw Error('Reference configuration seam missing');
 s=s.replace(marker,'muted:!0};installLabyrinth({config:Be,geometry:zt,textures:le,Geometry:ot,Attribute:We,DataTexture:Hi,Data3DTexture:DA,RGBA:wt,Byte:Ct,Linear:_t,SRGB:Ve});class u3');
 // Same camera path and easing; raise its endpoint enough to see the maze corridors.
 s=s.replace('this.timelinePosition.set(-13.25,2.5,13.25)','this.timelinePosition.set(-13.25,11,13.25)');
 fs.writeFileSync(path,s);
}
if(!s.includes('createLabyrinthScenes({')){
 s='import {createLabyrinthScenes} from "../labyrinth-scenes.js";\n'+s;
 s=s.replace('const ty={igloo:F3,cubes:aF,entry:UF};','const ty=createLabyrinthScenes({Base:Jo,Cubes:aF,Cube:nF,Opening:F3,Entry:UF,Background:k3,Mesh:Ce,Material:fe,Vector:b,Color:Z,geometry:zt,textures:le,events:Q,time:Fe,config:Be});');
}
s=s.replace('this.timelinePosition.set(-13.25,11,13.25),this.timelineTarget.set(0,1,0)','this.timelinePosition.set(-13.25,3.5,13.25),this.timelineTarget.set(0,2.5,0)');
const from=s.indexOf('class U3'),to=s.indexOf('class L3',from);let opening=s.slice(from,to);
if(!opening.includes('vSurface')){
 opening=opening.replace('attribute float emission;','attribute float emission;\nattribute float surface;');
 opening=opening.replaceAll('varying float vEmission;','varying float vEmission;\nvarying float vSurface;\nvarying vec3 vStoneNormal;');
 opening=opening.replace('vEmission = emission;','vEmission = emission;vSurface=surface;vStoneNormal=normal;');
 opening=opening.replace('color = mix(color, exploded, textureMix);','color = mix(color, exploded, textureMix);\nif(vSurface>.5){float light=.35+.65*max(dot(normalize(vStoneNormal),normalize(vec3(-.5,1.,1.))),0.);float grain=texture2D(tNoise,vUv*5.).r*.18+.82;vec3 base=vSurface<1.5?vec3(.025,.033,.045):vSurface<2.5?vec3(.24,.27,.3):vSurface<3.5?vec3(.25,.5,.75):vec3(.1,.14,.2);color=base*light*grain;if(vSurface>2.5&&vSurface<3.5)color+=vec3(.2,.35,.5); }');
 opening=opening.replace('falloffsmooth(vPos.y, 3.95, -0.4','falloffsmooth(vPos.y, 7.3, -0.4');s=s.slice(0,from)+opening+s.slice(to);
}
s=s.replace('falloffsmooth(vWorldPos.y, 3.5, 0.1','falloffsmooth(vWorldPos.y, 7.3, 0.1');
// A seven-metre facade needs smaller idle separation than the squat original dome.
// Keep the full scroll disassembly and intro; only scale idle/hover breathing.
s=s.replace('l*=d,l=Math.max(0,l)','l*=d*.18,l=Math.max(0,l)');
s=s.replace('l*=d*.18,l=Math.max(0,l)','l*=d*.035,l=Math.max(0,l)');
// Portal-specific surfaces and rigid hinge identities survive the original batch pipeline.
s=s.replace('u._pieceIndex=d,this._objects.push(u)','u._pieceIndex=d,u._surface=h.attributes.surface?.getX(0)||0,this._objects.push(u)');
const glowStart=s.indexOf('if(vSurface>.5){'),glowEnd=s.indexOf('// intro animation',glowStart);
if(glowStart>=0&&glowEnd>glowStart&&!s.includes('LABYRINTH_PORTAL_MATERIAL')){
 const shader=`// LABYRINTH_PORTAL_MATERIAL
float stoneLight=.45+.55*max(dot(normalize(vStoneNormal),normalize(vec3(-.5,1.,1.))),0.);
float grain=texture2D(tNoise,vUv*12.+vPos.xy*.2).r;
color=mix(vec3(.16,.23,.29),vec3(.42,.54,.61),grain)*stoneLight;
color+=vec3(.12,.29,.36)*pow(1.-abs(dot(normalize(vStoneNormal),normalize(vec3(-1.,.3,1.)))),4.);
if(vSurface> .5&&vSurface<1.5)color=vec3(.025,.045,.07)*stoneLight;
if(vSurface>1.5&&vSurface<2.5)color=vec3(.25,.43,.5)*stoneLight+vec3(.08,.2,.25);
if(vSurface>2.5&&vSurface<3.5)color=vec3(.35,1.1,1.6)*(1.+.18*sin(time*1.4+vPos.y*2.));
if(vSurface>4.5&&vSurface<6.5){float rune=pow(max(0.,sin(vUv.x*37.)*sin(vUv.y*45.)),12.);color=vec3(.045,.08,.13)*stoneLight+vec3(.1,.65,1.)*rune*.7;}
if(vSurface>6.5){vec2 p=vec2((vUv.x-.5)*1.2,vUv.y-.48);float r=length(p),angle=atan(p.y,p.x);float spiral=sin(angle*5.+r*30.-time*2.3);float rim=pow(clamp(r*1.8,0.,1.),4.);float sparks=pow(max(0.,spiral),16.);color=mix(vec3(.035,.015,.14),vec3(.1,.65,1.4),rim)+vec3(.15,.45,.95)*sparks*(.2+r)+vec3(.12,.025,.25)*(sin(time+r*19.)*.5+.5);}

                    `;
 s=s.slice(0,glowStart)+shader+s.slice(glowEnd);
}
s=s.replaceAll('falloffsmooth(vPos.y, 7.3, -0.4','falloffsmooth(vPos.y, 8.1, -0.6').replaceAll('falloffsmooth(vWorldPos.y, 7.3, 0.1','falloffsmooth(vWorldPos.y, 8.1, 0.1');
s=s.replace('texture2D(tNoise,vUv*12.+vPos.xy*.2).r','(.6*texture2D(tNoise,vPos.xy*.17+vPos.zy*.11).r+.4*texture2D(tNoise,vPos.zy*.8).r)');
s=s.replace('float stoneLight=.45+.55*max(dot(normalize(vStoneNormal),normalize(vec3(-.5,1.,1.))),0.);','float stoneLight=.3+.7*max(dot(normalize(vStoneNormal),normalize(vec3(-.65,1.,1.))),0.);');
s=s.replace('color=mix(vec3(.16,.23,.29),vec3(.42,.54,.61),grain)*stoneLight;','color=mix(vec3(.38,.52,.63),vec3(.78,.88,.97),grain)*stoneLight;float iceSpec=pow(max(dot(reflect(-normalize(vec3(-.65,1.,1.)),normalize(vStoneNormal)),normalize(cameraPosition-vPos)),0.),24.);color+=vec3(.3,.42,.5)*iceSpec;');
// Continuous scenes opt out of both centre snapping and boundary auto-completion.
s=s.replace('this.autoCenter.needed&&!this.autoCenter.animating&&Fe.time-this.autoCenter.lastTime>1.4','this.autoCenter.needed&&!this.autoCenter.animating&&!this.scrollComposers.some(p=>p.passes[0].scene.continuousScroll&&p.passes[0].scene.isSceneVisible)&&Fe.time-this.autoCenter.lastTime>1.4');
// The masonry uses the original colour/exploded atlases, emission masks and shading unchanged.
// Custom shading applies only to portal metal, glass and the animated membrane.
s=s.replace('// LABYRINTH_PORTAL_MATERIAL\nfloat stoneLight','// LABYRINTH_PORTAL_MATERIAL\nif(vSurface>.5){\nfloat stoneLight');
s=s.replace('                    // intro animation','                    // intro animation');
if(s.includes('if(vSurface>.5){\nfloat stoneLight')&&!s.includes('// END_PORTAL_SURFACES')){
 const start=s.indexOf('// LABYRINTH_PORTAL_MATERIAL'),end=s.indexOf('// intro animation',start);s=s.slice(0,end)+'}\n// END_PORTAL_SURFACES\n'+s.slice(end);
}
s=s.replace('Vector:b,Color:Z,geometry:zt','Vector:b,Color:Z,Points:Fn,Geometry:ot,Attribute:We,geometry:zt');
s=s.replace('color = mix(color, exploded, textureMix);\n// LABYRINTH_PORTAL_MATERIAL','color = mix(color, exploded, textureMix);\nif(vSurface<.5)color=mix(color,exploded,.65);\n// LABYRINTH_PORTAL_MATERIAL');
// Geometry substitution must not attenuate the original hover/breathing response.
s=s.replace('l*=d*.035,l=Math.max(0,l)','l*=d,l=Math.max(0,l)');
// Preserve the original spring/hover response, but bound its translation in world units.
// Multiplying by the taller facade centroid otherwise opens metre-wide masonry seams.
s=s.replace('a.position.copy(a.centroid).addScaledVector(a.centroid,a.displacement);','a.position.copy(a.centroid).addScaledVector(a.centroid,Math.min(.12,a.displacement*.32)/Math.max(1,a.centroid.length()));');
// Long architectural courses must not tip like individual dome stones at rest.
s=s.replaceAll('a.displacement*.5+A','Math.min(.012,a.displacement*.08)+A').replaceAll('a.displacement*.5+m','Math.min(.012,a.displacement*.08)+m').replaceAll('a.displacement*.5+g','Math.min(.012,a.displacement*.08)+g');
s=s.replace('if(vSurface<.5)color=mix(color,exploded,.65);\n','');
s=s.replace('Points:Fn,Geometry:ot,Attribute:We,geometry:zt','Points:Fn,Geometry:ot,Attribute:We,ParticleVolume:wF,Tween:re,geometry:zt');
// Reuse the preceding scene's actual GPU fluid/volume particle system with per-scene targets.
const particleStart=s.indexOf('class wF'),particleEnd=s.indexOf('class EF',particleStart);
let particle=s.slice(particleStart,particleEnd);
if(!particle.includes('this.scene.particleLinks'))particle=particle.replaceAll('Be.links','(this.scene.particleLinks||Be.links)');
particle=particle.replace('this.UI=new yF(this),await this.UI.ready','this.UI=this.scene.particleLinks?null:new yF(this),await this.UI?.ready');
s=s.slice(0,particleStart)+particle+s.slice(particleEnd);
// Architectural frames share the neutral masonry palette; only the portal retains colour.
s=s.replace('color=vec3(.25,.43,.5)*stoneLight+vec3(.08,.2,.25);','color=vec3(.66,.68,.70)*stoneLight+vec3(.06,.06,.065);');
s=s.replace('color=vec3(.35,1.1,1.6)*(1.+.18*sin(time*1.4+vPos.y*2.));','color=vec3(.78,.80,.82)*stoneLight+vec3(.08,.08,.085);');
fs.writeFileSync(path,s);
console.log('Labyrinth cathedral, horizontal exhibit gallery and globe installed.');
const htmlPath='public/reference/igloo-complete/index.html';
let html=fs.readFileSync(htmlPath,'utf8').replace('<title>Igloo Inc.</title>','<title>Labyrinth</title>').replaceAll('Our mission is to create the largest onchain community, driving the consumer crypto revolution.','Interaction, training and exploration. Discover a connected world.').replaceAll('content="Igloo Inc."','content="Labyrinth"');
fs.writeFileSync(htmlPath,html);
