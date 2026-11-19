<script setup lang="ts">
import { ExternalLink, Github } from 'lucide-vue-next'
import { repoUrl, type Project } from '../data/projects'
defineProps<{ project: Project }>()
</script>

<template>
  <article class="group relative flex h-full flex-col justify-between rounded-3xl border p-5 transition-all duration-300 hover:-translate-y-1"
    :style="{
      '--c': project.color,
      background: `linear-gradient(145deg, color-mix(in srgb, ${project.color} 14%, var(--surface)), color-mix(in srgb, ${project.color} 3%, var(--surface)))`,
      borderColor: `color-mix(in srgb, ${project.color} 32%, var(--border))`,
    }">
    <div>
      <div class="mb-4 flex items-start justify-between gap-3">
        <img v-if="project.icon" :src="project.icon" :alt="`Icona ${project.name}`" width="48" height="48"
          class="size-12 rounded-xl object-cover ring-1 ring-line" :style="{ boxShadow: `0 8px 20px ${project.color}44` }" />
        <span v-else-if="project.symbol" aria-hidden="true"
          class="flex size-12 items-center justify-center rounded-xl text-white [&>svg]:size-7 [&>svg]:fill-current"
          :style="{ background: `linear-gradient(135deg, ${project.color}, color-mix(in srgb, ${project.color} 65%, #000))`, boxShadow: `0 8px 20px ${project.color}44` }"
          v-html="project.symbol" />
        <span class="rounded-full px-2.5 py-1 text-[11px] font-bold text-muted"
          :style="{ background: `color-mix(in srgb, ${project.color} 14%, transparent)` }">{{ project.language }}</span>
      </div>
      <h3 class="mb-1.5 font-display text-lg font-bold text-fg transition-colors group-hover:text-[var(--c)]">{{ project.name }}</h3>
      <p class="mb-4 text-sm leading-relaxed text-muted">{{ project.description }}</p>
    </div>
    <div class="flex flex-wrap gap-x-4 gap-y-1 border-t pt-3 text-[13px] font-medium"
      :style="{ borderColor: `color-mix(in srgb, ${project.color} 25%, var(--border))` }">
      <a :href="repoUrl(project)" target="_blank" rel="noopener" class="inline-flex items-center gap-1.5 !text-muted no-underline hover:!text-[var(--c)]"><Github class="size-3.5" />Codice</a>
      <a v-if="project.site" :href="project.site" target="_blank" rel="noopener" class="inline-flex items-center gap-1.5 !text-muted no-underline hover:!text-[var(--c)]"><ExternalLink class="size-3.5" />Sito</a>
    </div>
  </article>
</template>
