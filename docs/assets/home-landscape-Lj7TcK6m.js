import{i as e,n as t,t as n}from"./jsx-runtime-BHwPObl3.js";import{$ as r,Ct as i,D as a,E as o,Ft as s,Ht as c,J as l,L as u,Lt as d,Rt as f,S as ee,St as p,T as m,Vt as h,X as g,Z as te,a as _,b as v,bt as ne,c as re,ct as y,dt as ie,ft as ae,g as oe,lt as se,m as ce,mt as le,o as b,pt as ue,s as x,t as de,u as S,w as fe,z as pe,zt as C}from"./three.module-E2UMzmAC.js";var w=e(t(),1),T=new C;function E(e,t,n,r,i,a){let o=2*Math.PI*i/4,s=Math.max(a-2*i,0),c=Math.PI/4;T.copy(t),T[r]=0,T.normalize();let l=.5*o/(o+s),u=1-T.angleTo(e)/c;return Math.sign(T[n])===1?u*l:s/(o+s)+l+l*(1-u)}var me=class e extends _{constructor(e=1,t=1,n=1,r=2,i=.1){let a=r*2+1;if(i=Math.min(e/2,t/2,n/2,i),super(1,1,1,a,a,a),this.type=`RoundedBoxGeometry`,this.parameters={width:e,height:t,depth:n,segments:r,radius:i},a===1)return;let o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;let s=new C,c=new C,l=new C(e,t,n).divideScalar(2).subScalar(i),u=this.attributes.position.array,d=this.attributes.normal.array,f=this.attributes.uv.array,ee=u.length/6,p=new C,m=.5/a;for(let r=0,a=0;r<u.length;r+=3,a+=2)switch(s.fromArray(u,r),c.copy(s),c.x-=Math.sign(c.x)*m,c.y-=Math.sign(c.y)*m,c.z-=Math.sign(c.z)*m,c.normalize(),u[r+0]=l.x*Math.sign(s.x)+c.x*i,u[r+1]=l.y*Math.sign(s.y)+c.y*i,u[r+2]=l.z*Math.sign(s.z)+c.z*i,d[r+0]=c.x,d[r+1]=c.y,d[r+2]=c.z,Math.floor(r/ee)){case 0:p.set(1,0,0),f[a+0]=E(p,c,`z`,`y`,i,n),f[a+1]=1-E(p,c,`y`,`z`,i,t);break;case 1:p.set(-1,0,0),f[a+0]=1-E(p,c,`z`,`y`,i,n),f[a+1]=1-E(p,c,`y`,`z`,i,t);break;case 2:p.set(0,1,0),f[a+0]=1-E(p,c,`x`,`z`,i,e),f[a+1]=E(p,c,`z`,`x`,i,n);break;case 3:p.set(0,-1,0),f[a+0]=1-E(p,c,`x`,`z`,i,e),f[a+1]=1-E(p,c,`z`,`x`,i,n);break;case 4:p.set(0,0,1),f[a+0]=1-E(p,c,`x`,`y`,i,e),f[a+1]=1-E(p,c,`y`,`x`,i,t);break;case 5:p.set(0,0,-1),f[a+0]=E(p,c,`x`,`y`,i,e),f[a+1]=1-E(p,c,`y`,`x`,i,t);break}}static fromJSON(t){return new e(t.width,t.height,t.depth,t.segments,t.radius)}},D={name:`CopyShader`,uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`},O=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error(`THREE.Pass: .render() must be implemented in derived pass.`)}dispose(){}},he=new y(-1,1,1,-1,0,1),k=new class extends x{constructor(){super(),this.setAttribute(`position`,new v([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute(`uv`,new v([0,2,0,0,2,0],2))}},A=class{constructor(e){this._mesh=new g(k,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,he)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}},j=class extends O{constructor(e,t=`tDiffuse`){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof i?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=d.clone(e.uniforms),this.material=new i({name:e.name===void 0?`unspecified`:e.name,defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new A(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},M=class extends O{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let r=e.getContext(),i=e.state;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),i.buffers.stencil.setFunc(r.ALWAYS,a,4294967295),i.buffers.stencil.setClear(o),i.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.color.setMask(!0),i.buffers.depth.setMask(!0),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(r.EQUAL,1,4294967295),i.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),i.buffers.stencil.setLocked(!0)}},N=class extends O{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}},ge=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new f);this._width=n.width,this._height=n.height,t=new h(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:m}),t.texture.name=`EffectComposer.rt1`}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name=`EffectComposer.rt2`,this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new j(D),this.copyPass.material.blending=0,this.timer=new s}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let t=0,r=this.passes.length;t<r;t++){let r=this.passes[t];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(t),r.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),r.needsSwap){if(n){let t=this.renderer.getContext(),n=this.renderer.state.buffers.stencil;n.setFunc(t.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),n.setFunc(t.EQUAL,1,4294967295)}this.swapBuffers()}M!==void 0&&(r instanceof M?n=!0:r instanceof N&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new f);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(n,r),this.renderTarget2.setSize(n,r);for(let e=0;e<this.passes.length;e++)this.passes[e].setSize(n,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}},_e=class extends O{constructor(e,t,n=null,r=null,i=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=r,this.clearAlpha=i,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new S}render(e,t,n){let r=e.autoClear;e.autoClear=!1;let i,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(i=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==1&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(i),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=r}},P={name:`LuminosityHighPassShader`,uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new S(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`},F=class e extends O{constructor(e,t=1,n,r){super(),this.strength=t,this.radius=n,this.threshold=r,this.resolution=e===void 0?new f(256,256):new f(e.x,e.y),this.clearColor=new S(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let a=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new h(a,o,{type:m,depthBuffer:!1}),this.renderTargetBright.texture.name=`UnrealBloomPass.bright`,this.renderTargetBright.texture.generateMipmaps=!1;for(let e=0;e<this.nMips;e++){let t=new h(a,o,{type:m,depthBuffer:!1});t.texture.name=`UnrealBloomPass.h`+e,t.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(t);let n=new h(a,o,{type:m,depthBuffer:!1});n.texture.name=`UnrealBloomPass.v`+e,n.texture.generateMipmaps=!1,this.renderTargetsVertical.push(n),a=Math.round(a/2),o=Math.round(o/2)}let s=P;this.highPassUniforms=d.clone(s.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new i({uniforms:this.highPassUniforms,vertexShader:s.vertexShader,fragmentShader:s.fragmentShader}),this.separableBlurMaterials=[];let c=[6,10,14,18,22];a=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let e=0;e<this.nMips;e++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(c[e])),this.separableBlurMaterials[e].uniforms.invSize.value=new f(1/a,1/o),a=Math.round(a/2),o=Math.round(o/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let l=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=l,this.bloomTintColors=[new C(1,1,1),new C(1,1,1),new C(1,1,1),new C(1,1,1),new C(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=d.clone(D.uniforms),this.blendMaterial=new i({uniforms:this.copyUniforms,vertexShader:D.vertexShader,fragmentShader:D.fragmentShader,premultipliedAlpha:!0,blending:2,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new S,this._oldClearAlpha=1,this._basic=new te,this._fsQuad=new A(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),r=Math.round(t/2);this.renderTargetBright.setSize(n,r);for(let e=0;e<this.nMips;e++)this.renderTargetsHorizontal[e].setSize(n,r),this.renderTargetsVertical[e].setSize(n,r),this.separableBlurMaterials[e].uniforms.invSize.value=new f(1/n,1/r),n=Math.round(n/2),r=Math.round(r/2)}render(t,n,r,i,a){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();let o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),a&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=r.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=r.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let s=this.renderTargetBright;for(let n=0;n<this.nMips;n++)this._fsQuad.material=this.separableBlurMaterials[n],this.separableBlurMaterials[n].uniforms.colorTexture.value=s.texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[n]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[n].uniforms.colorTexture.value=this.renderTargetsHorizontal[n].texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[n]),t.clear(),this._fsQuad.render(t),s=this.renderTargetsVertical[n];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,a&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(r),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=o}_getSeparableBlurMaterial(e){let t=[],n=e/3;for(let r=0;r<e;r++)t.push(.39894*Math.exp(-.5*r*r/(n*n))/n);let r=[],a=[];for(let n=1;n<e;n+=2){let i=t[n],o=n+1<e?t[n+1]:0,s=i+o;r.push((n*i+(n+1)*o)/s),a.push(s)}return new i({defines:{KERNEL_PAIRS:r.length},uniforms:{colorTexture:{value:null},invSize:{value:new f(.5,.5)},direction:{value:new f(.5,.5)},centerWeight:{value:t[0]},gaussianOffsets:{value:r},gaussianWeights:{value:a}},vertexShader:`

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

				}`})}_getCompositeMaterial(e){return new i({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

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

				}`})}};F.BlurDirectionX=new f(1,0),F.BlurDirectionY=new f(0,1);var I=n();function L({paused:e,replay:t,onReady:n}){let s=(0,w.useRef)(null),d=(0,w.useRef)({paused:e,replay:t,onReady:n});return d.current={paused:e,replay:t,onReady:n},(0,w.useEffect)(()=>{let e=s.current,t;try{t=new de({antialias:!0,powerPreference:`high-performance`})}catch{e.textContent=`The living atlas is ready below.`;return}t.setPixelRatio(Math.min(devicePixelRatio,1.5)),t.setClearColor(`#0b151c`),t.toneMapping=4,t.toneMappingExposure=1.15,t.shadowMap.enabled=!0,t.shadowMap.type=1,e.appendChild(t.domElement);let n=new p;n.fog=new ee(`#14232b`,.023);let m=new se(43,1,.1,150),h=new ge(t);h.addPass(new _e(n,m));let te=new F(new f(1,1),.45,.5,.82);h.addPass(te),n.add(new o(`#bedbe4`,`#1c2c30`,1.5));let _=new oe(`#c4e1e9`,3);_.position.set(-9,16,7),_.castShadow=!0,_.shadow.mapSize.set(2048,2048),Object.assign(_.shadow.camera,{left:-14,right:14,top:14,bottom:-14,near:.5,far:65}),_.shadow.bias=-5e-4,n.add(_);let v=new ae(`#9ce8df`,50,15,2);v.position.set(0,2,0),n.add(v);let y=document.createElement(`canvas`);y.width=y.height=256;let S=y.getContext(`2d`),w=S.createImageData(256,256);for(let e=0;e<256;e++)for(let t=0;t<256;t++){let n=(e*256+t)*4,r=Math.sin(t*12.9898+e*78.233)*43758.5453,i=125+(r-Math.floor(r))*65+Math.sin(t*.18+Math.cos(e*.12))*15;w.data[n]=i,w.data[n+1]=i,w.data[n+2]=i,w.data[n+3]=255}S.putImageData(w,0,0);let T=new re(y);T.wrapS=T.wrapT=ne,T.repeat.set(2,2),T.anisotropy=Math.min(8,t.capabilities.getMaxAnisotropy());let E=new r({color:`#728a91`,roughness:.83,metalness:.12,bumpMap:T,bumpScale:.075,roughnessMap:T}),D=new fe;n.add(D);let O=[],he=new me(.65,.7,.9,3,.085);for(let e=0;e<5;e++){let t=1.15+e*.76,n=14+e*8;for(let r=0;r<n;r++){let i=r/n*Math.PI*2;if((r+e*3)%n<3)continue;let a=1+e%3*.28;for(let n=0;n<2+ +(e===2);n++){let r=new g(he,E);r.scale.set(.9,a,1),r.rotation.y=-i,r.position.set(Math.sin(i)*t,n*.72*a+.37,Math.cos(i)*t),r.castShadow=r.receiveShadow=!0,D.add(r),O.push({mesh:r,base:r.position.clone(),angle:i,order:(e*2+n)/12})}}}let k=new g(new ce(5,5.3,.35,96),E);k.position.y=-.2,k.receiveShadow=!0,n.add(k);let A=new g(new a(.6,2),new r({color:`#ddfff3`,emissive:`#8dd5c6`,emissiveIntensity:2,roughness:.2,metalness:.4}));A.position.y=1.7,D.add(A);let j=new pe(new c(new a(5.1,2)),new u({color:`#bde8e7`,transparent:!0,opacity:.45}));j.position.y=1,n.add(j);let M=new ie(150,150,180,180);M.rotateX(-Math.PI/2);let N=M.attributes.position;for(let e=0;e<N.count;e++){let t=N.getX(e),n=N.getZ(e),r=Math.hypot(t,n),i=l.smoothstep(r,5,15),a=(Math.sin(t*.19+n*.08)*2.8+Math.cos(n*.22)*2+Math.sin(t*.56)*Math.cos(n*.42)*.7+Math.sin(t*1.7+n*.9)*.12)*i;N.setY(e,-.48+a)}M.computeVertexNormals();let P=E.clone();P.color.set(`#3c535e`);let I=new g(M,P);I.receiveShadow=!0,n.add(I);let L=1500,R=new Float32Array(L*3),z=new Float32Array(L*3);for(let e=0;e<L;e++)z[e*3]=Math.sin(e*17.13)*24,z[e*3+1]=(Math.cos(e*13.37)*.5+.5)*18,z[e*3+2]=Math.sin(e*37.17)*24;R.set(z);let B=new x;B.setAttribute(`position`,new b(R,3));let V=document.createElement(`canvas`);V.width=V.height=32;let H=V.getContext(`2d`),U=H.createRadialGradient(16,16,0,16,16,16);U.addColorStop(0,`#fff`),U.addColorStop(.15,`#fff`),U.addColorStop(1,`#ffffff00`),H.fillStyle=U,H.fillRect(0,0,32,32);let ve=new re(V),ye=new ue(B,new le({map:ve,color:`#d1e8e8`,size:.065,transparent:!0,opacity:.65,depthWrite:!1,blending:2}));n.add(ye);let be=[`world`,`connections`,`manifesto`,`discover`,`perspectives`,`fieldnotes`,`expeditions`,`fieldkit`,`connect`].map((e,t)=>({id:e,center:new C(Math.sin(t*.9)*7,-15,-t*23)})),W=new C,G=new C;D.updateMatrixWorld(!0);let xe=new Float32Array(18e3*3),Se=new Float32Array(18e3);for(let e=0;e<18e3;e++){let t=O[e%O.length].mesh,n=t.geometry.attributes.position,r=new C().fromBufferAttribute(n,e*37%n.count).applyMatrix4(t.matrixWorld);xe.set(r.toArray(),e*3),Se[e]=e%997/997}let K=new x;K.setAttribute(`position`,new b(xe,3)),K.setAttribute(`seed`,new b(Se,1));let q=new i({transparent:!0,depthWrite:!1,blending:2,uniforms:{amount:{value:0},clock:{value:0}},vertexShader:`attribute float seed;uniform float amount,clock;varying float alpha;void main(){float spread=1.-amount;vec3 p=position+vec3(sin(seed*173.),cos(seed*61.)*.8+1.,cos(seed*113.))*spread*12.;p+=vec3(sin(clock+seed*43.),cos(clock*.7+seed*29.),sin(clock*.6+seed*71.))*spread*.4;vec4 mv=modelViewMatrix*vec4(p,1.);gl_Position=projectionMatrix*mv;gl_PointSize=clamp(45./max(1.,-mv.z),1.,5.);alpha=(1.-smoothstep(.85,1.,amount))*.85;}`,fragmentShader:`varying float alpha;void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;gl_FragColor=vec4(.7,.88,.88,alpha*(1.-d*2.));}`}),Ce=new ue(K,q);n.add(Ce),E.transparent=!0;let J=0,we=performance.now(),Te=we,Y=0,X=scrollY,Ee=scrollY,De=0,Oe=0,Z=0,Q=0,ke=d.current.replay,Ae=matchMedia(`(prefers-reduced-motion: reduce)`),$=()=>{let e=innerWidth,n=innerHeight;t.setSize(e,n),h.setSize(e,n),m.aspect=e/n,m.updateProjectionMatrix()},je=()=>{Ee=scrollY},Me=e=>{De=e.clientX/innerWidth-.5,Oe=e.clientY/innerHeight-.5};$(),addEventListener(`resize`,$),addEventListener(`scroll`,je,{passive:!0}),addEventListener(`pointermove`,Me,{passive:!0}),d.current.onReady();let Ne=e=>{if(J=requestAnimationFrame(Ne),document.hidden){Te=e;return}let t=Math.min(.04,(e-Te)/1e3);Te=e;let r=d.current.paused||Ae.matches;ke!==d.current.replay&&(ke=d.current.replay,we=e),r||(Y+=t),X+=(Ee-X)*(r?1:.055),Z+=(De-Z)*.035,Q+=(Oe-Q)*.035;let i=r?1:l.clamp((e-we)/6500,0,1),a=1-(1-i)**3,o=X/innerHeight;for(let e of O){let t=l.smoothstep(i,e.order*.3,.65+e.order*.3),n=(1-t)*2+Math.sin(Math.min(o,1.7)/1.7*Math.PI)*.4;e.mesh.position.copy(e.base),e.mesh.position.x*=1+n,e.mesh.position.z*=1+n,e.mesh.position.y+=(1-t)*(3+e.order*4),e.mesh.rotation.y=-e.angle+(1-t)*.4}j.material.opacity=(1-a)*.7+.025,j.rotation.y=Y*.025,A.rotation.y=Y*.22,A.position.y=1.7+(r?0:Math.sin(Y)*.1);let s=.55+(r?0:Z*.13),c=17+(1-a)*9;G.set(Math.sin(s)*c,8+(1-a)*10,Math.cos(s)*c),W.set(0,.8,0);let u=be.map(e=>({room:e,top:(document.getElementById(e.id)?.getBoundingClientRect().top??0)+scrollY})),f=u[0].top,p=l.smoothstep(X,Math.max(100,f-innerHeight),f);if(p>0){let e=0;u.forEach((t,n)=>{X+innerHeight*.15>=t.top&&(e=n)});let t=u[e],n=u[Math.min(e+1,u.length-1)],i=l.smoothstep(X,n.top-innerHeight*.85,n.top-innerHeight*.15),a=t.room.center.clone().lerp(n.room.center,i),o=a.clone().add(new C(r?0:Z*.28,.3+(r?0:Q*.15),9));G.lerp(o,p),W.lerp(a.clone().add(new C(0,.5,-4)),p)}G.set(Math.sin(s)*c,8,Math.cos(s)*c),W.set(0,.8,0),m.position.copy(G),m.lookAt(W),n.fog=new ee(`#101f29`,.018+p*.012);let g=r?1:Math.min(l.smoothstep(i,0,.85),1-l.smoothstep(o,.5,1.6));if(q.uniforms.amount.value=g,q.uniforms.clock.value=Y,E.opacity=l.smoothstep(g,.72,1),D.visible=g>.72,ye.visible=!1,!r){for(let e=0;e<L;e++)R[e*3]=z[e*3]+Math.sin(Y*.2+e)*.3,R[e*3+1]=(z[e*3+1]-Y*.13+180)%18,R[e*3+2]=z[e*3+2]+Math.cos(Y*.12+e)*.2;B.attributes.position.needsUpdate=!0}h.render()};return J=requestAnimationFrame(Ne),()=>{cancelAnimationFrame(J),removeEventListener(`resize`,$),removeEventListener(`scroll`,je),removeEventListener(`pointermove`,Me),n.traverse(e=>{let t=e;t.geometry?.dispose(),t.material&&(Array.isArray(t.material)?t.material:[t.material]).forEach(e=>e.dispose())}),T.dispose(),ve.dispose(),h.dispose(),t.dispose(),t.domElement.remove()}},[]),(0,I.jsx)(`div`,{ref:s,className:`lc-renderer`})}export{L as default};