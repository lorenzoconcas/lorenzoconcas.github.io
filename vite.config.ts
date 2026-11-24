import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { rmSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { ITALIAN_PLAYLISTS } from './site.config'

// Con ITALIAN_PLAYLISTS = false i file delle playlist italiane vengono tolti da dist.
const dropItalianPlaylists = {
  name: 'drop-italian-playlists',
  apply: 'build' as const,
  closeBundle() {
    if (ITALIAN_PLAYLISTS) return
    for (const f of ['playlists', 'logos', 'CanaliItaliani.json'])
      rmSync(fileURLToPath(new URL(`./dist/minitv/${f}`, import.meta.url)), { recursive: true, force: true })
  },
}

// Sito utente GitHub Pages: https://lorenzoconcas.github.io/ (base "/").
// Per servirlo da una sottocartella: BASE_PATH=/nome/ npm run build
export default defineConfig({
  base: process.env.BASE_PATH ?? '/',
  define: { __ITALIAN_PLAYLISTS__: JSON.stringify(ITALIAN_PLAYLISTS) },
  plugins: [vue(), tailwindcss(), dropItalianPlaylists],
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    dirStyle: 'nested',
    // Una pagina per lingua: l'italiano alla radice, le altre sotto /<lang>.
    includedRoutes() {
      const pages = ['/', '/minitv', ...(ITALIAN_PLAYLISTS ? ['/minitv/playlists'] : []), '/travelbuddy', '/racemap', '/curalink', '/spese-immobili']
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
