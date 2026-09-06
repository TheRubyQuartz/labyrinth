import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
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
