const ts=require('typescript'),fs=require('node:fs'),path=require('node:path'),Module=require('node:module'),assert=require('node:assert/strict');
const filename=path.resolve('app/use-evolution-camera.ts');
const source=ts.transpileModule(fs.readFileSync(filename,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
const m=new Module(filename,module);m.filename=filename;m.paths=module.paths;m._compile(source,filename);
const {boundTime,zoomTime}=m.exports;
let checks=0;
for(const size of [520,200,66,10])for(const u of [0,.25,.5,.75,1]){
 const w={young:0,size},z=zoomTime(w,.5,u);
 assert.ok(Math.abs(w.young+(1-u)*w.size-z.young-(1-u)*z.size)<1e-8);checks++;
}
assert.deepEqual(boundTime({young:900,size:520}),{young:0,size:520});assert.deepEqual(boundTime({young:-1,size:1}),{young:0,size:5});
assert.deepEqual(boundTime({young:519,size:10}),{young:510,size:10});
console.log(`PASS: ${checks} zoom anchors; minimum span and old/present bounds.`);
