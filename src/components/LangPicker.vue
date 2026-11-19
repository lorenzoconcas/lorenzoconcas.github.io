<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Check, ChevronDown, Languages } from 'lucide-vue-next'
import { LANGS, LANG_NAMES, isLang, localizedPath, stripLang, useI18n, type Lang } from '../i18n'

const { t, lang } = useI18n()
const route = useRoute()
const router = useRouter()
const open = ref(false)
const root = ref<HTMLElement | null>(null)
const menu = ref<HTMLElement | null>(null)

function choose(next: Lang) {
  open.value = false
  if (!isLang(next)) return
  // La scelta esplicita vince sulla lingua del browser alla prossima visita.
  try {
    localStorage.setItem('lang', next)
  } catch {
    /* Storage non disponibile: la scelta vale solo per questa visita. */
  }
  if (next !== lang.value) void router.push({ path: localizedPath(next, stripLang(route.path)), hash: route.hash })
}
async function toggle() {
  open.value = !open.value
  if (open.value) {
    await nextTick()
    ;(menu.value?.querySelector('[aria-current="true"]') as HTMLElement | null)?.focus()
  }
}
function onDocClick(event: MouseEvent) {
  if (open.value && !root.value?.contains(event.target as Node)) open.value = false
}
function onKey(event: KeyboardEvent) {
  if (!open.value) return
  if (event.key === 'Escape') {
    open.value = false
    ;(root.value?.querySelector('button') as HTMLElement | null)?.focus()
    return
  }
  if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return
  event.preventDefault()
  const items = [...(menu.value?.querySelectorAll('button') ?? [])] as HTMLElement[]
  const index = items.indexOf(document.activeElement as HTMLElement)
  const next = event.key === 'ArrowDown' ? index + 1 : index - 1
  items[(next + items.length) % items.length]?.focus()
}
onMounted(() => {
  document.addEventListener('click', onDocClick)
  document.addEventListener('keydown', onKey)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', onDocClick)
  document.removeEventListener('keydown', onKey)
})
</script>

<template>
  <div ref="root" class="relative">
    <button type="button" :aria-label="t('nav.lang')" aria-haspopup="true" :aria-expanded="open"
      class="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-line bg-surface-2 px-2.5 py-2 text-sm font-semibold text-muted transition-colors hover:text-fg"
      @click="toggle">
      <Languages class="size-4" />
      <span class="uppercase">{{ lang }}</span>
      <ChevronDown class="size-3.5 transition-transform" :class="{ 'rotate-180': open }" />
    </button>
    <div v-if="open" ref="menu" role="menu"
      class="absolute right-0 top-full z-50 mt-2 w-44 overflow-hidden rounded-2xl border border-line bg-surface p-1.5 shadow-xl shadow-slate-900/10">
      <button v-for="l in LANGS" :key="l" type="button" role="menuitemradio" :aria-checked="l === lang"
        :aria-current="l === lang ? 'true' : undefined" :lang="l"
        class="flex w-full cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-2 text-left text-sm font-medium text-fg transition-colors hover:bg-surface-2"
        :class="{ 'bg-surface-2 font-semibold': l === lang }" @click="choose(l)">
        <span class="flex items-center gap-2.5">
          <span class="w-6 text-xs font-bold uppercase text-muted">{{ l }}</span>{{ LANG_NAMES[l] }}
        </span>
        <Check v-if="l === lang" class="size-4 text-accent" />
      </button>
    </div>
  </div>
</template>
