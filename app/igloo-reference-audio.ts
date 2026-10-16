// User-enabled local reference audio; provenance accompanies the source assets.
export class IglooAudio {
 context:AudioContext|null=null;
 private master:GainNode|null=null;
 private loops:AudioBufferSourceNode[]=[];
 private buffers=new Map<string,AudioBuffer>();
 private loading:Promise<void>|null=null;
 async enable(){
  if(!this.context){this.context=new AudioContext();this.master=this.context.createGain();this.master.gain.value=.5;this.master.connect(this.context.destination)}
  await this.context.resume();
  if(!this.loading)this.loading=this.load();
  await this.loading;
 }
 private async load(){
  const context=this.context!;
  await Promise.all(['wind','igloo','particles'].map(async name=>{const response=await fetch(`./reference/igloo/audio/${name}.ogg`);if(!response.ok)throw new Error(`Audio unavailable: ${name}`);const buffer=await context.decodeAudioData(await response.arrayBuffer());this.buffers.set(name,buffer)}));
  if(context.state==='closed')return;
  for(const [name,volume]of [['wind',.4],['igloo',.5]] as const){const source=context.createBufferSource(),gain=context.createGain();source.buffer=this.buffers.get(name)!;source.loop=true;gain.gain.value=volume;source.connect(gain);gain.connect(this.master!);source.start();this.loops.push(source)}
 }
 mute(){void this.context?.suspend()}
 effect(_kind:'assemble'|'disperse'|'travel'){
  const context=this.context,buffer=this.buffers.get('particles');if(!context||context.state!=='running'||!buffer)return;
  const source=context.createBufferSource(),gain=context.createGain();source.buffer=buffer;gain.gain.value=.16;source.connect(gain);gain.connect(this.master!);source.start();source.onended=()=>{source.disconnect();gain.disconnect()};
 }
 dispose(){for(const source of this.loops){try{source.stop()}catch{}}this.loops=[];void this.context?.close();this.context=null;this.master=null;this.buffers.clear()}
}
