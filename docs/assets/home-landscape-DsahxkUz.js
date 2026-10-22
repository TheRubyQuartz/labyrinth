import{a as e,i as t,n}from"./index-BrfNSW-R.js";import{$ as r,B as i,D as a,E as o,H as s,Ht as c,Jt as l,Kt as u,O as d,Ot as f,S as p,Tt as m,Ut as h,Xt as g,Z as _,Zt as ee,_t as v,b as te,c as y,d as b,et as ne,ft as x,g as re,gt as ie,ht as ae,k as oe,kt as S,l as se,n as ce,pt as le,qt as C,rt as ue,s as w,v as de,vt as fe,w as pe}from"./three.module-CpPFbpQH.js";import{t as me}from"./RoundedBoxGeometry-BXZ0eK34.js";var T=e(t(),1),E={name:`CopyShader`,uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`},D=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error(`THREE.Pass: .render() must be implemented in derived pass.`)}dispose(){}},O=new x(-1,1,1,-1,0,1),k=new class extends y{constructor(){super(),this.setAttribute(`position`,new p([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute(`uv`,new p([0,2,0,0,2,0],2))}},A=class{constructor(e){this._mesh=new r(k,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,O)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}},j=class extends D{constructor(e,t=`tDiffuse`){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof S?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=u.clone(e.uniforms),this.material=new S({name:e.name===void 0?`unspecified`:e.name,defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new A(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},M=class extends D{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let r=e.getContext(),i=e.state;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),i.buffers.stencil.setFunc(r.ALWAYS,a,4294967295),i.buffers.stencil.setClear(o),i.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.color.setMask(!0),i.buffers.depth.setMask(!0),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(r.EQUAL,1,4294967295),i.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),i.buffers.stencil.setLocked(!0)}},N=class extends D{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}},he=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new C);this._width=n.width,this._height=n.height,t=new g(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:a}),t.texture.name=`EffectComposer.rt1`}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name=`EffectComposer.rt2`,this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new j(E),this.copyPass.material.blending=0,this.timer=new c}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let t=0,r=this.passes.length;t<r;t++){let r=this.passes[t];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(t),r.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),r.needsSwap){if(n){let t=this.renderer.getContext(),n=this.renderer.state.buffers.stencil;n.setFunc(t.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),n.setFunc(t.EQUAL,1,4294967295)}this.swapBuffers()}M!==void 0&&(r instanceof M?n=!0:r instanceof N&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new C);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(n,r),this.renderTarget2.setSize(n,r);for(let e=0;e<this.passes.length;e++)this.passes[e].setSize(n,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}},ge=class extends D{constructor(e,t,n=null,r=null,i=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=r,this.clearAlpha=i,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new b}render(e,t,n){let r=e.autoClear;e.autoClear=!1;let i,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(i=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==1&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(i),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=r}},P={name:`LuminosityHighPassShader`,uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new b(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`},F=class e extends D{constructor(e,t=1,n,r){super(),this.strength=t,this.radius=n,this.threshold=r,this.resolution=e===void 0?new C(256,256):new C(e.x,e.y),this.clearColor=new b(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let i=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new g(i,o,{type:a,depthBuffer:!1}),this.renderTargetBright.texture.name=`UnrealBloomPass.bright`,this.renderTargetBright.texture.generateMipmaps=!1;for(let e=0;e<this.nMips;e++){let t=new g(i,o,{type:a,depthBuffer:!1});t.texture.name=`UnrealBloomPass.h`+e,t.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(t);let n=new g(i,o,{type:a,depthBuffer:!1});n.texture.name=`UnrealBloomPass.v`+e,n.texture.generateMipmaps=!1,this.renderTargetsVertical.push(n),i=Math.round(i/2),o=Math.round(o/2)}let s=P;this.highPassUniforms=u.clone(s.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new S({uniforms:this.highPassUniforms,vertexShader:s.vertexShader,fragmentShader:s.fragmentShader}),this.separableBlurMaterials=[];let c=[6,10,14,18,22];i=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let e=0;e<this.nMips;e++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(c[e])),this.separableBlurMaterials[e].uniforms.invSize.value=new C(1/i,1/o),i=Math.round(i/2),o=Math.round(o/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let d=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=d,this.bloomTintColors=[new l(1,1,1),new l(1,1,1),new l(1,1,1),new l(1,1,1),new l(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=u.clone(E.uniforms),this.blendMaterial=new S({uniforms:this.copyUniforms,vertexShader:E.vertexShader,fragmentShader:E.fragmentShader,premultipliedAlpha:!0,blending:2,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new b,this._oldClearAlpha=1,this._basic=new ne,this._fsQuad=new A(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),r=Math.round(t/2);this.renderTargetBright.setSize(n,r);for(let e=0;e<this.nMips;e++)this.renderTargetsHorizontal[e].setSize(n,r),this.renderTargetsVertical[e].setSize(n,r),this.separableBlurMaterials[e].uniforms.invSize.value=new C(1/n,1/r),n=Math.round(n/2),r=Math.round(r/2)}render(t,n,r,i,a){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();let o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),a&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=r.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=r.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let s=this.renderTargetBright;for(let n=0;n<this.nMips;n++)this._fsQuad.material=this.separableBlurMaterials[n],this.separableBlurMaterials[n].uniforms.colorTexture.value=s.texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[n]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[n].uniforms.colorTexture.value=this.renderTargetsHorizontal[n].texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[n]),t.clear(),this._fsQuad.render(t),s=this.renderTargetsVertical[n];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,a&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(r),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=o}_getSeparableBlurMaterial(e){let t=[],n=e/3;for(let r=0;r<e;r++)t.push(.39894*Math.exp(-.5*r*r/(n*n))/n);let r=[],i=[];for(let n=1;n<e;n+=2){let a=t[n],o=n+1<e?t[n+1]:0,s=a+o;r.push((n*a+(n+1)*o)/s),i.push(s)}return new S({defines:{KERNEL_PAIRS:r.length},uniforms:{colorTexture:{value:null},invSize:{value:new C(.5,.5)},direction:{value:new C(.5,.5)},centerWeight:{value:t[0]},gaussianOffsets:{value:r},gaussianWeights:{value:i}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float centerWeight;
				uniform float gaussianOffsets[KERNEL_PAIRS];
				uniform float gaussianWeights[KERNEL_PAIRS];

				void main() {

					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * centerWeight;

					for ( int i = 0; i < KERNEL_PAIRS; i ++ ) {

						vec2 uvOffset = direction * invSize * gaussianOffsets[ i ];
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * gaussianWeights[ i ];

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new S({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}};F.BlurDirectionX=new C(1,0),F.BlurDirectionY=new C(0,1);var _e=n();function I({paused:e,replay:t,onReady:n}){let a=(0,T.useRef)(null),c=(0,T.useRef)({paused:e,replay:t,onReady:n});return c.current={paused:e,replay:t,onReady:n},(0,T.useEffect)(()=>{let e=a.current,t;try{t=new ce({antialias:!0,powerPreference:`high-performance`})}catch{e.textContent=`The living atlas is ready below.`;return}t.setPixelRatio(Math.min(devicePixelRatio,1.5)),t.setClearColor(`#101b17`),t.toneMapping=4,t.toneMappingExposure=1.15,t.shadowMap.enabled=!0,t.shadowMap.type=1,e.appendChild(t.domElement);let n=new f;n.fog=new pe(`#1d3024`,.023);let u=new le(43,1,.1,150),p=new he(t);p.addPass(new ge(n,u));let g=new F(new C(1,1),.45,.5,.82);p.addPass(g),n.add(new d(`#d5e6c2`,`#1d3024`,1.5));let b=new de(`#e5ebdd`,3);b.position.set(-9,16,7),b.castShadow=!0,b.shadow.mapSize.set(2048,2048),Object.assign(b.shadow.camera,{left:-14,right:14,top:14,bottom:-14,near:.5,far:65}),b.shadow.bias=-5e-4,n.add(b);let x=new ie(`#d5ee9e`,50,15,2);x.position.set(0,2,0),n.add(x);let T=document.createElement(`canvas`);T.width=T.height=256;let E=T.getContext(`2d`),D=E.createImageData(256,256);for(let e=0;e<256;e++)for(let t=0;t<256;t++){let n=(e*256+t)*4,r=Math.sin(t*12.9898+e*78.233)*43758.5453,i=125+(r-Math.floor(r))*65+Math.sin(t*.18+Math.cos(e*.12))*15;D.data[n]=i,D.data[n+1]=i,D.data[n+2]=i,D.data[n+3]=255}E.putImageData(D,0,0);let O=new se(T);O.wrapS=O.wrapT=m,O.repeat.set(2,2),O.anisotropy=Math.min(8,t.capabilities.getMaxAnisotropy());let k=new ue({color:`#829078`,roughness:.83,metalness:.12,bumpMap:O,bumpScale:.075,roughnessMap:O}),A=new o;n.add(A);let j=[],M=new me(.65,.7,.9,3,.085);for(let e=0;e<5;e++){let t=1.15+e*.76,n=14+e*8;for(let i=0;i<n;i++){let a=i/n*Math.PI*2;if((i+e*3)%n<3)continue;let o=1+e%3*.28;for(let n=0;n<2+ +(e===2);n++){let i=new r(M,k);i.scale.set(.9,o,1),i.rotation.y=-a,i.position.set(Math.sin(a)*t,n*.72*o+.37,Math.cos(a)*t),i.castShadow=i.receiveShadow=!0,A.add(i),j.push({mesh:i,base:i.position.clone(),angle:a,order:(e*2+n)/12})}}}let N=new o,P=new i({color:`#d5ee9e`,transparent:!0,opacity:.8}),_e=new te(M,25);for(let e of j){let t=new s(_e,P);t.position.copy(e.base),t.rotation.copy(e.mesh.rotation),t.scale.copy(e.mesh.scale),N.add(t)}n.add(N);let I=new r(new re(5,5.3,.35,96),k);I.position.y=-.2,I.receiveShadow=!0,n.add(I);let L=new r(new oe(.6,2),new ue({color:`#ddfff3`,emissive:`#8dd5c6`,emissiveIntensity:2,roughness:.2,metalness:.4}));L.position.y=1.7,A.add(L);let R=new s(new ee(new oe(5.1,2)),new i({color:`#d5ee9e`,transparent:!0,opacity:.45}));R.position.y=1,n.add(R);let z=new ae(150,150,180,180);z.rotateX(-Math.PI/2);let B=z.attributes.position;for(let e=0;e<B.count;e++){let t=B.getX(e),n=B.getZ(e),r=Math.hypot(t,n),i=_.smoothstep(r,5,15),a=(Math.sin(t*.19+n*.08)*2.8+Math.cos(n*.22)*2+Math.sin(t*.56)*Math.cos(n*.42)*.7+Math.sin(t*1.7+n*.9)*.12)*i;B.setY(e,-.48+a)}z.computeVertexNormals();let ve=k.clone();ve.color.set(`#3c533f`);let V=new r(z,ve);V.receiveShadow=!0,n.add(V);let H=1500,U=new Float32Array(H*3),W=new Float32Array(H*3);for(let e=0;e<H;e++)W[e*3]=Math.sin(e*17.13)*24,W[e*3+1]=(Math.cos(e*13.37)*.5+.5)*18,W[e*3+2]=Math.sin(e*37.17)*24;U.set(W);let G=new y;G.setAttribute(`position`,new w(U,3));let K=document.createElement(`canvas`);K.width=K.height=32;let ye=K.getContext(`2d`),q=ye.createRadialGradient(16,16,0,16,16,16);q.addColorStop(0,`#fff`),q.addColorStop(.15,`#fff`),q.addColorStop(1,`#ffffff00`),ye.fillStyle=q,ye.fillRect(0,0,32,32);let be=new se(K),xe=new v(G,new fe({map:be,color:`#d1e8e8`,size:.065,transparent:!0,opacity:.65,depthWrite:!1,blending:2}));n.add(xe);let Se=[`world`,`connections`,`manifesto`,`discover`,`perspectives`,`fieldnotes`,`expeditions`,`fieldkit`,`connect`],Ce=Se.map((e,t)=>({id:e,center:new l(Math.sin(t*.9)*7,-15,-t*23)})),J=new l,Y=new l;A.updateMatrixWorld(!0);let we=new Float32Array(18e3*3),Te=new Float32Array(18e3);for(let e=0;e<18e3;e++){let t=j[e%j.length].mesh,n=t.geometry.attributes.position,r=new l().fromBufferAttribute(n,e*37%n.count).applyMatrix4(t.matrixWorld);we.set(r.toArray(),e*3),Te[e]=e%997/997}let Ee=new y;Ee.setAttribute(`position`,new w(we,3)),Ee.setAttribute(`seed`,new w(Te,1));let De=new S({transparent:!0,depthWrite:!1,blending:2,uniforms:{amount:{value:0},clock:{value:0}},vertexShader:`attribute float seed;uniform float amount,clock;varying float alpha;void main(){float spread=1.-amount;vec3 p=position+vec3(sin(seed*173.),cos(seed*61.)*.8+1.,cos(seed*113.))*spread*12.;p+=vec3(sin(clock+seed*43.),cos(clock*.7+seed*29.),sin(clock*.6+seed*71.))*spread*.4;vec4 mv=modelViewMatrix*vec4(p,1.);gl_Position=projectionMatrix*mv;gl_PointSize=clamp(45./max(1.,-mv.z),1.,5.);alpha=(1.-smoothstep(.85,1.,amount))*.85;}`,fragmentShader:`varying float alpha;void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;gl_FragColor=vec4(.7,.88,.88,alpha*(1.-d*2.));}`}),Oe=new v(Ee,De);n.add(Oe),k.transparent=!0;let ke=new y,Ae=new Float32Array(12e3*3);ke.setAttribute(`position`,new w(Ae,3));let je=new v(ke,new fe({color:`#d5ee9e`,size:.035,transparent:!0,opacity:.7,depthWrite:!1,blending:2}));n.add(je);let Me=Array.from({length:3},(e,t)=>{let i=new r(new h(1,.012,6,160),new ne({color:`#d5ee9e`,transparent:!0,opacity:.2}));return i.rotation.x=Math.PI/2,i.position.y=.15+t*.08,n.add(i),i}),Ne=(e,t)=>{let n=e*.61803398875%1,r=e*.41421356237%1,i=n*Math.PI*2,a=Math.acos(2*r-1);switch(t%5){case 0:return[4*Math.sin(a)*Math.cos(i),2+4*Math.cos(a),4*Math.sin(a)*Math.sin(i)];case 1:return[(3+Math.cos(a)*1.1)*Math.cos(i),2+Math.sin(a)*1.1,(3+Math.cos(a)*1.1)*Math.sin(i)];case 2:return[(n-.5)*10,1+Math.sin(n*12)*Math.cos(r*12)*1.4,(r-.5)*10];case 3:return[Math.cos(i)*3,r*7-1,Math.sin(i)*3];default:return[Math.cos(i)*(1+r*4),1+r*3,Math.sin(i)*(1+r*4)]}},Pe=0,Fe=performance.now(),Ie=Fe,X=0,Z=scrollY,Le=scrollY,Re=0,ze=0,Q=0,Be=0,Ve=c.current.replay,He=matchMedia(`(prefers-reduced-motion: reduce)`),$=()=>{let e=innerWidth,n=innerHeight;t.setSize(e,n),p.setSize(e,n),u.aspect=e/n,u.updateProjectionMatrix()},Ue=()=>{Le=scrollY},We=e=>{Re=e.clientX/innerWidth-.5,ze=e.clientY/innerHeight-.5};$(),addEventListener(`resize`,$),addEventListener(`scroll`,Ue,{passive:!0}),addEventListener(`pointermove`,We,{passive:!0}),c.current.onReady();let Ge=t=>{if(Pe=requestAnimationFrame(Ge),document.hidden){Ie=t;return}let r=Math.min(.04,(t-Ie)/1e3);Ie=t;let i=c.current.paused||He.matches;Ve!==c.current.replay&&(Ve=c.current.replay,Fe=t),i||(X+=r),Z+=(Le-Z)*(i?1:.055),Q+=(Re-Q)*.035,Be+=(ze-Be)*.035;let a=i?1:_.clamp((t-Fe)/8500,0,1),o=1-(1-a)**3,s=Z/innerHeight;for(let e of j){let t=_.smoothstep(a,.22+e.order*.25,.8+e.order*.18),n=(1-t)*2+Math.sin(Math.min(s,1.7)/1.7*Math.PI)*.4;e.mesh.position.copy(e.base),e.mesh.position.x*=1+n,e.mesh.position.z*=1+n,e.mesh.position.y+=(1-t)*(3+e.order*4),e.mesh.rotation.y=-e.angle+(1-t)*.4}R.material.opacity=(1-o)*.7+.025,R.rotation.y=X*.025,L.rotation.y=X*.22,L.position.y=1.7+(i?0:Math.sin(X)*.1);let d=.55+(i?0:Q*.13),f=17+(1-o)*9;Y.set(Math.sin(d)*f,8+(1-o)*10,Math.cos(d)*f),J.set(0,.8,0);let m=Ce.map(e=>({room:e,top:(document.getElementById(e.id)?.getBoundingClientRect().top??0)+scrollY})),h=m[0].top,g=_.smoothstep(Z,Math.max(100,h-innerHeight),h);if(g>0){let e=0;m.forEach((t,n)=>{Z+innerHeight*.15>=t.top&&(e=n)});let t=m[e],n=m[Math.min(e+1,m.length-1)],r=_.smoothstep(Z,n.top-innerHeight*.85,n.top-innerHeight*.15),a=t.room.center.clone().lerp(n.room.center,r),o=a.clone().add(new l(i?0:Q*.28,.3+(i?0:Be*.15),9));Y.lerp(o,g),J.lerp(a.clone().add(new l(0,.5,-4)),g)}Y.set(Math.sin(d)*f,8,Math.cos(d)*f),J.set(0,.8,0),u.position.copy(Y),u.lookAt(J),n.fog=new pe(`#17291e`,.018+g*.012);let ee=i?1:Math.min(_.smoothstep(a,0,.85),1-_.smoothstep(s,.5,1.6));if(De.uniforms.amount.value=ee,De.uniforms.clock.value=X,k.opacity=_.smoothstep(a,.28,.85)*(1-_.smoothstep(s,.5,1.6)),A.visible=k.opacity>.01,N.visible=s<1.6,P.opacity=(1-_.smoothstep(a,.35,.9))*.7,x.intensity=50+Math.sin(_.clamp((a-.35)*3,0,1)*Math.PI)*90,xe.visible=!1,!i){for(let e=0;e<H;e++)U[e*3]=W[e*3]+Math.sin(X*.2+e)*.3,U[e*3+1]=(W[e*3+1]-X*.13+180)%18,U[e*3+2]=W[e*3+2]+Math.cos(X*.12+e)*.2;G.attributes.position.needsUpdate=!0}e.style.opacity=String(1-g*.96);let v=m.reduce((e,t,n)=>Z+innerHeight*.55>=t.top?n:e,-1);if(je.visible=v>=0,Oe.visible=v<0,I.visible=v<0,V.visible=v<0,R.visible=v<0,v>=0){A.visible=!1;let t=m[v],n=_.clamp((Z+innerHeight*.55-t.top)/innerHeight,0,1),r=i?1:_.smoothstep(n,0,.7);e.dataset.chapter=Se[v];for(let e=0;e<12e3;e++){let t=Ne(e,Math.max(0,v-1)),n=Ne(e,v),a=i?0:Math.sin(e*.01-X*2)*(1-r)*.6;for(let i=0;i<3;i++)Ae[e*3+i]=t[i]+(n[i]-t[i])*r+a}ke.attributes.position.needsUpdate=!0,je.rotation.y=i?0:X*.035}Me.forEach((e,t)=>{let n=i?1:(X*.35+t/3)%1;e.visible=!i,e.scale.setScalar(1+n*12),e.material.opacity=(1-n)*.18}),p.render()};return Pe=requestAnimationFrame(Ge),()=>{cancelAnimationFrame(Pe),removeEventListener(`resize`,$),removeEventListener(`scroll`,Ue),removeEventListener(`pointermove`,We),n.traverse(e=>{let t=e;t.geometry?.dispose(),t.material&&(Array.isArray(t.material)?t.material:[t.material]).forEach(e=>e.dispose())}),O.dispose(),be.dispose(),p.dispose(),t.dispose(),t.domElement.remove()}},[]),(0,_e.jsx)(`div`,{ref:a,className:`lc-renderer`})}export{I as default};