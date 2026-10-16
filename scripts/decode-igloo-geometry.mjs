import fs from 'node:fs';
import vm from 'node:vm';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url),decoderPath='node_modules/three/examples/jsm/libs/draco/';
const context={module:{exports:{}},exports:{},require,console,process,Buffer,__dirname:decoderPath};vm.createContext(context);vm.runInContext(fs.readFileSync(decoderPath+'draco_wasm_wrapper.js','utf8'),context);
const draco=await context.module.exports({wasmBinary:fs.readFileSync(decoderPath+'draco_decoder.wasm')});
for(const name of ['igloo','igloo/igloo_cage','igloo/igloo_outline','ground','mountain','intro_particles','igloo/patch']){
 const data=fs.readFileSync(`public/reference/igloo/geometries/${name}.drc`),decoder=new draco.Decoder(),mesh=decoder.GetEncodedGeometryType(data)===draco.TRIANGULAR_MESH?new draco.Mesh():new draco.PointCloud();
 const status=mesh.num_faces?decoder.DecodeArrayToMesh(data,data.length,mesh):decoder.DecodeArrayToPointCloud(data,data.length,mesh);if(!status.ok())throw new Error(status.error_msg());
 const query=new draco.MetadataQuerier(),meta=JSON.parse(query.GetStringEntry(decoder.GetMetadata(mesh),'info'));
 const description={attributes:{},index:null},chunks=[];let offset=0;
 const append=(name,array,itemSize)=>{const bytes=Buffer.from(array.buffer,array.byteOffset,array.byteLength);description.attributes[name]={offset,bytes:bytes.length,itemSize};chunks.push(bytes);offset+=bytes.length};
 for(let i=0;i<meta.attributes.length;i++){const attr=decoder.GetAttributeByUniqueId(mesh,i),size=mesh.num_points()*attr.num_components(),ptr=draco._malloc(size*4);decoder.GetAttributeDataArrayForAllPoints(mesh,attr,draco.DT_FLOAT32,size*4,ptr);append(meta.attributes[i][0],new Float32Array(draco.HEAPF32.buffer,ptr,size).slice(),attr.num_components());draco._free(ptr)}
 if(mesh.num_faces){const count=mesh.num_faces()*3,ptr=draco._malloc(count*4);decoder.GetTrianglesUInt32Array(mesh,count*4,ptr);const bytes=Buffer.from(new Uint32Array(draco.HEAPF32.buffer,ptr,count).slice().buffer);description.index={offset,bytes:bytes.length};chunks.push(bytes);draco._free(ptr)}
 fs.writeFileSync(`public/reference/igloo/geometries/${name}.bin`,Buffer.concat(chunks));fs.writeFileSync(`public/reference/igloo/geometries/${name}.json`,JSON.stringify(description));console.log(name,mesh.num_points(),meta.attributes);draco.destroy(query);draco.destroy(mesh);draco.destroy(decoder);
}
