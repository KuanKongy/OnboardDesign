import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base './' + hash routing means the built site works on any static host
// (GitHub Pages, Netlify drop) with zero server config.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './',
})
