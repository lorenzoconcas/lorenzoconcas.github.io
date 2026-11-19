<script setup lang="ts">
import { onMounted, ref } from 'vue'
import SiteFooterLinks from './components/SiteFooterLinks.vue'
import { Github, Layers, Moon, Sun } from 'lucide-vue-next'

const dark = ref(false)
onMounted(() => (dark.value = document.documentElement.classList.contains('dark')))
function toggleTheme() {
  dark.value = document.documentElement.classList.toggle('dark')
  try { localStorage.theme = dark.value ? 'dark' : 'light' } catch { /* storage non disponibile */ }
}
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <header class="glass-nav fixed inset-x-0 top-0 z-40 border-b border-line bg-bg/80 transition-colors duration-300">
      <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
        <RouterLink to="/" class="group flex items-center gap-2.5 no-underline">
          <div class="flex size-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white shadow-md shadow-indigo-500/20 transition-transform group-hover:scale-105">
            <Layers class="size-5" />
          </div>
          <span class="font-display text-xl font-bold tracking-tight text-fg">Lorenzo<span class="text-accent">Concas</span></span>
        </RouterLink>

        <div class="flex items-center gap-2 sm:gap-3">
          <a href="https://github.com/lorenzoconcas" target="_blank" rel="noopener noreferrer" aria-label="GitHub"
            class="rounded-xl p-2.5 !text-muted transition-colors hover:bg-surface-2 hover:!text-fg">
            <Github class="size-4" />
          </a>
          <div class="mx-0.5 h-5 w-px bg-line" />
          <button type="button" aria-label="Cambia tema" @click="toggleTheme"
            class="cursor-pointer rounded-xl border border-line bg-surface-2 p-2.5 text-muted transition-all hover:text-fg">
            <Sun v-if="dark" class="size-4 text-amber-400" />
            <Moon v-else class="size-4 text-slate-700" />
          </button>
        </div>
      </div>
    </header>

    <main class="flex-grow">
      <router-view />
    </main>

    <footer class="mt-12 border-t border-line bg-bg py-8">
      <div class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
        <div class="flex items-center gap-2.5">
          <div class="flex size-6 items-center justify-center rounded-lg bg-indigo-600 text-white"><Layers class="size-3.5" /></div>
          <span class="font-display text-sm font-bold text-fg">Lorenzo Concas</span>
          <span class="ml-1 text-xs text-muted">© {{ new Date().getFullYear() }} · Tutti i marchi appartengono ai rispettivi proprietari.</span>
        </div>
        <SiteFooterLinks />
      </div>
    </footer>
  </div>
</template>
