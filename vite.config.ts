import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// Sito utente GitHub Pages: https://lorenzoconcas.github.io/ (base "/").
// Per servirlo da una sottocartella: BASE_PATH=/nome/ npm run build
export default defineConfig({
  base: process.env.BASE_PATH ?? '/',
  plugins: [vue(), tailwindcss()],
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    dirStyle: 'nested',
    // Una pagina per lingua: l'italiano alla radice, le altre sotto /<lang>.
    includedRoutes() {
      const pages = ['/', '/minitv', '/minitv/playlists', '/racemap', '/curalink', '/spese-immobili']
      const langs = ['en', 'fr', 'de', 'es', 'pt']
      return [
        ...pages,
        '/minitv/crea-playlist',
        '/404',
        ...langs.flatMap((lang) => pages.map((page) => (page === '/' ? `/${lang}` : `/${lang}${page}`))),
      ]
    },
  },
})
