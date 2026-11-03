import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import {explorerPresence} from './scripts/explorer-presence';
import {readFileSync,writeFileSync,readdirSync} from 'node:fs';
import {join} from 'node:path';
import {createHash} from 'node:crypto';

function pagesScenePaths(){return {name:'pages-scene-paths',closeBundle(){
 const hash=createHash('sha256');
 const fingerprint=(dir:string)=>{for(const entry of readdirSync(dir,{withFileTypes:true}).sort((a,b)=>a.name.localeCompare(b.name))){const file=join(dir,entry.name);if(entry.isDirectory())fingerprint(file);else if(/\.(js|css|html)$/.test(file))hash.update(readFileSync(file));}};
 fingerprint('public/reference');
 const release=hash.digest('hex').slice(0,12);
 const walk=(dir:string)=>{for(const entry of readdirSync(dir,{withFileTypes:true})){const file=join(dir,entry.name);if(entry.isDirectory())walk(file);else if(/\.(js|html|css)$/.test(file)){const source=readFileSync(file,'utf8');let patched=source.replaceAll('/reference/igloo','/labyrinth/reference/igloo');
 // Only application adapters contain destination links. Never rewrite vendor router regexes.
 if(entry.name.startsWith('labyrinth-'))patched=patched.replaceAll("'/?","'/labyrinth/?").replaceAll('"/?','"/labyrinth/?');
 // The isolated homepage runtime is copied, not bundled by Vite. Version its
 // script/style dependencies too, so returning visitors receive one release.
 patched=patched.replace(/(["'])([^"'\s?]+\.(?:js|css))\1/g,(match,quote,url)=>/^https?:/.test(url)?match:quote+url+'?v='+release+quote);
 if(patched!==source)writeFileSync(file,patched)}}};
 walk('docs/reference');
}}}

export default defineConfig({
  plugins: [react(),explorerPresence(),pagesScenePaths()],
  // Relative asset URLs work under /labyrinth/, another repository name,
  // or a custom-domain root. This mockup uses view state, not URL routes.
  base: './',
  resolve: {
    alias: { '@': fileURLToPath(new URL('.', import.meta.url)) },
  },
  build: {
    // Commit this prebuilt directory for GitHub Pages branch publishing.
    outDir: 'docs',
    emptyOutDir: true,
  },
});
