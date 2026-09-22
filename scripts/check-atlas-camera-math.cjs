const ts=require('typescript');
const fs=require('node:fs');
const path=require('node:path');
const Module=require('node:module');
const assert=require('node:assert/strict');
const filename=path.resolve('app/use-atlas-camera.ts');
const source=ts.transpileModule(fs.readFileSync(filename,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
const m=new Module(filename,module);m.filename=filename;m.paths=module.paths;m._compile(source,filename);
const {anchoredZoom,clampCamera}=m.exports;
let checks=0;
for(const zoom of [2,4,8])for(const u of [.2,.5,.8])for(const v of [.2,.5,.8]){
 const before={lon:0,lat:0,zoom};const after=anchoredZoom(before,zoom*1.2,u,v);
 assert.ok(Math.abs(before.lon+(u-.5)*360/zoom-after.lon-(u-.5)*360/after.zoom)<1e-9);
 assert.ok(Math.abs(before.lat-(v-.5)*180/zoom-after.lat+(v-.5)*180/after.zoom)<1e-9);checks++;
}
assert.deepEqual(clampCamera({lon:999,lat:-999,zoom:0}),{lon:0,lat:0,zoom:1});
assert.equal(clampCamera({lon:0,lat:0,zoom:999}).zoom,16);
console.log(`PASS: ${checks} pointer anchors preserved; world bounds and zoom limits enforced.`);
