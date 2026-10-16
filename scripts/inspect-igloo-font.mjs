import fs from 'node:fs';
import zlib from 'node:zlib';
const b=fs.readFileSync('public/reference/igloo-complete/assets/fonts/IBMPlexMono-Medium-datatexture.ktx2');
const w=b.readUInt32LE(20),h=b.readUInt32LE(24),offset=Number(b.readBigUInt64LE(80)),length=Number(b.readBigUInt64LE(88));
const raw=zlib.zstdDecompressSync(b.subarray(offset,offset+length));
function chunk(name,data){const type=Buffer.from(name),body=Buffer.concat([type,data]);let crc=0xffffffff;for(const byte of body){crc^=byte;for(let i=0;i<8;i++)crc=(crc>>>1)^((crc&1)?0xedb88320:0)}const head=Buffer.alloc(4),tail=Buffer.alloc(4);head.writeUInt32BE(data.length);tail.writeUInt32BE((crc^0xffffffff)>>>0);return Buffer.concat([head,body,tail])}
const header=Buffer.alloc(13);header.writeUInt32BE(w);header.writeUInt32BE(h,4);header[8]=8;header[9]=6;
const rows=Buffer.alloc((w*4+1)*h);for(let y=0;y<h;y++)raw.copy(rows,y*(w*4+1)+1,y*w*4,(y+1)*w*4);
fs.writeFileSync('.practice-qa/igloo-complete/font.png',Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]),chunk('IHDR',header),chunk('IDAT',zlib.deflateSync(rows)),chunk('IEND',Buffer.alloc(0))]));
