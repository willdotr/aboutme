import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Relative base so the site works from https://<user>.github.io/aboutme/.
// Output goes to /docs, which GitHub Pages serves from the main branch.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: { outDir: 'docs', emptyOutDir: true },
})
