/** Hann-windowed radix-2 FFT. Returns relative magnitudes, not calibrated sound pressure. */
export function audioSpectrum(samples:Float32Array,sampleRate:number){
 const size=512,frames=240,bins=size/2;const result=new Float32Array(frames*bins);
 for(let frame=0;frame<frames;frame++){
 const real=new Float64Array(size),imag=new Float64Array(size),offset=Math.floor(frame/Math.max(1,frames-1)*Math.max(0,samples.length-size));
 for(let i=0;i<size;i++)real[i]=(samples[offset+i]||0)*(.5-.5*Math.cos(2*Math.PI*i/(size-1)));
 for(let i=1,j=0;i<size;i++){let bit=size>>1;for(;j&bit;bit>>=1)j^=bit;j^=bit;if(i<j)[real[i],real[j]]=[real[j],real[i]]}
 for(let length=2;length<=size;length<<=1){const angle=-2*Math.PI/length;for(let start=0;start<size;start+=length){for(let k=0;k<length/2;k++){const a=start+k,b=a+length/2,c=Math.cos(angle*k),s=Math.sin(angle*k),r=real[b]*c-imag[b]*s,im=real[b]*s+imag[b]*c;real[b]=real[a]-r;imag[b]=imag[a]-im;real[a]+=r;imag[a]+=im}}}
 for(let bin=0;bin<bins;bin++)result[frame*bins+bin]=Math.sqrt(real[bin]**2+imag[bin]**2)/size;
 }
 return {values:result,frames,bins,nyquist:sampleRate/2};
}
