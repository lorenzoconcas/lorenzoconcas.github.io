import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// Sito utente GitHub Pages: https://lorenzoconcas.github.io/ (base "/").
// Per servirlo da una sottocartella: BASE_PATH=/nome/ npm run build
export default defineConfig({
  base: process.env.BASE_PATH ?? '/',
  plugins: [vue(), tailwindcss()],
  ssgOptions: { script: 'async', formatting: 'minify', dirStyle: 'nested' },
})
