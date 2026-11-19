<script setup lang="ts">
import { ArrowUpRight, Globe, Monitor, Smartphone } from 'lucide-vue-next'
import { privacyPath, type AppInfo } from '../data/apps'
defineProps<{ app: AppInfo }>()
const platformIcon = (p: string) => (/web/i.test(p) ? Globe : /mac|android/i.test(p) ? Monitor : Smartphone)
</script>

<template>
  <article class="group relative flex h-full flex-col justify-between rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-1"
    :style="{
      '--c': app.color,
      background: `linear-gradient(145deg, color-mix(in srgb, ${app.color} 16%, var(--surface)), color-mix(in srgb, ${app.color} 4%, var(--surface)))`,
      borderColor: `color-mix(in srgb, ${app.color} 35%, var(--border))`,
    }">
    <div>
      <div class="mb-4 flex items-start justify-between gap-4">
        <img :src="app.icon" :alt="`Icona ${app.name}`" width="64" height="64"
          class="size-16 rounded-2xl object-cover ring-1 ring-line transition-transform group-hover:scale-105"
          :style="{ boxShadow: `0 10px 26px ${app.color}55` }" />
        <span v-if="app.version" class="rounded-full px-2.5 py-1 text-[11px] font-bold text-muted" :style="{ background: `color-mix(in srgb, ${app.color} 14%, transparent)` }">v{{ app.version }}</span>
      </div>

      <h2 class="mb-1.5 font-display text-xl font-bold text-fg transition-colors group-hover:text-[var(--c)]">
        <RouterLink :to="`/${app.slug}`" class="!text-inherit no-underline after:absolute after:inset-0 after:rounded-3xl after:content-['']">{{ app.name }}</RouterLink>
      </h2>
      <p class="mb-5 text-sm leading-relaxed text-muted">{{ app.summary }}</p>
    </div>

    <div>
      <div class="flex items-center justify-between gap-2 border-t pt-4" :style="{ borderColor: `color-mix(in srgb, ${app.color} 25%, var(--border))` }">
        <div class="flex flex-wrap gap-1.5">
          <span v-for="p in app.platforms" :key="p" class="inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-semibold text-muted" :style="{ background: `color-mix(in srgb, ${app.color} 14%, transparent)` }">
            <component :is="platformIcon(p)" class="size-3 opacity-75" />{{ p }}
          </span>
        </div>
        <span class="inline-flex shrink-0 items-center gap-1 text-xs font-bold text-[var(--c)] transition-transform group-hover:translate-x-0.5">
          Esplora <ArrowUpRight class="size-4" />
        </span>
      </div>

      <div class="relative z-10 mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[13px] font-medium">
        <a v-for="l in app.homeLinks" :key="l.href" :href="l.href" target="_blank" rel="noopener" class="!text-muted no-underline hover:!text-[var(--c)] hover:underline">{{ l.label }}</a>
        <RouterLink :to="privacyPath(app)" class="!text-muted no-underline hover:!text-[var(--c)] hover:underline">Privacy</RouterLink>
        <RouterLink :to="`/${app.slug}#support`" class="!text-muted no-underline hover:!text-[var(--c)] hover:underline">Supporto</RouterLink>
      </div>
    </div>
  </article>
</template>
