import assert from 'node:assert/strict';
import {audioSpectrum} from '../app/crab-audio-spectrum.ts';
const rate=8192,samples=Float32Array.from({length:8192},(_,i)=>Math.sin(2*Math.PI*512*i/rate));
const spectrum=audioSpectrum(samples,rate);
let best=0;for(let k=1;k<spectrum.bins;k++)if(spectrum.values[k]>spectrum.values[best])best=k;
assert.equal(best,32,'512 Hz tone should peak at FFT bin 32');
assert.equal(spectrum.nyquist,4096);assert.equal(spectrum.values.length,240*256);
const silent=audioSpectrum(new Float32Array(1024),rate);assert.ok(silent.values.every(v=>v===0));
assert.ok(spectrum.values.every(Number.isFinite));console.log('Spectrogram checks passed: known tone, silence, dimensions, Nyquist and finite magnitudes.');
