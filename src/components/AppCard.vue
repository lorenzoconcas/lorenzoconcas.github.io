<script setup lang="ts">
import { computed } from 'vue'
import { ArrowUpRight, Globe, Monitor, Smartphone } from 'lucide-vue-next'
import { privacyPath, type AppInfo } from '../data/apps'
import { useI18n } from '../i18n'
const props = defineProps<{ app: AppInfo }>()
const { t, to, lang, app: appI18n } = useI18n()
const text = computed(() => appI18n(props.app.slug as never))
const summary = computed(() => text.value?.summary ?? props.app.summary)
const platformIcon = (p: string) => (/web/i.test(p) ? Globe : /mac|android/i.test(p) ? Monitor : Smartphone)
const platformLabel = (p: string) => (p === 'Android in arrivo' ? t('platform.androidSoon') : p)
const linkLabel = (label: string) =>
  label === 'App Store' ? t('link.appStore') : label === 'APK Android' ? t('link.apk') : label === "Apri l'app web" ? t('link.webApp') : label
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
        <img :src="app.icon" :alt="t('card.icon', { name: app.name })" width="64" height="64"
          class="size-16 rounded-2xl object-cover ring-1 ring-line transition-transform group-hover:scale-105"
          :style="{ boxShadow: `0 10px 26px ${app.color}55` }" />
        <span v-if="app.version" class="rounded-full px-2.5 py-1 text-[11px] font-bold text-muted" :style="{ background: `color-mix(in srgb, ${app.color} 14%, transparent)` }">v{{ app.version }}</span>
      </div>

      <h2 class="mb-1.5 font-display text-xl font-bold text-fg transition-colors group-hover:text-[var(--c)]">
        <RouterLink :to="to(`/${app.slug}`)" class="!text-inherit no-underline after:absolute after:inset-0 after:rounded-3xl after:content-['']">{{ app.name }}</RouterLink>
      </h2>
      <p class="mb-5 text-sm leading-relaxed text-muted">{{ summary }}</p>
    </div>

    <div>
      <div class="flex items-center justify-between gap-2 border-t pt-4" :style="{ borderColor: `color-mix(in srgb, ${app.color} 25%, var(--border))` }">
        <div class="flex flex-wrap gap-1.5">
          <span v-for="p in app.platforms" :key="p" class="inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-semibold text-muted" :style="{ background: `color-mix(in srgb, ${app.color} 14%, transparent)` }">
            <component :is="platformIcon(p)" class="size-3 opacity-75" />{{ platformLabel(p) }}
          </span>
        </div>
        <span class="inline-flex shrink-0 items-center gap-1 text-xs font-bold text-[var(--c)] transition-transform group-hover:translate-x-0.5">
          {{ t('card.explore') }} <ArrowUpRight class="size-4" />
        </span>
      </div>

      <div class="relative z-10 mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[13px] font-medium">
        <a v-for="l in app.homeLinks" :key="l.href" :href="l.href" target="_blank" rel="noopener" class="!text-muted no-underline hover:!text-[var(--c)] hover:underline">{{ linkLabel(l.label) }}</a>
        <RouterLink :to="to(privacyPath(app, lang))" class="!text-muted no-underline hover:!text-[var(--c)] hover:underline">{{ t('card.privacy') }}</RouterLink>
        <RouterLink :to="to(`/${app.slug}#support`)" class="!text-muted no-underline hover:!text-[var(--c)] hover:underline">{{ t('card.support') }}</RouterLink>
      </div>
    </div>
  </article>
</template>
