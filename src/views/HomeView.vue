<script setup lang="ts">
import { computed, ref } from 'vue'
import { useLocalizedHead } from '../i18n/head'
import { useI18n } from '../i18n'
import { Mail, Sparkles } from 'lucide-vue-next'
import AppCard from '../components/AppCard.vue'
import ProjectCard from '../components/ProjectCard.vue'
import { projects } from '../data/projects'
import { apps, CONTACT_EMAIL } from '../data/apps'

const { t } = useI18n()
useLocalizedHead(() => ({ title: t('home.title'), ogTitle: t('home.ogTitle'), description: t('home.desc') }))

// filtro per piattaforma (iOS / macOS / Android / Web)
const filters = [
  { key: 'all', label: '', re: /./ },
  { key: 'ios', label: 'iOS', re: /ios|ipados|apple watch/i },
  { key: 'mac', label: 'macOS', re: /macos/i },
  { key: 'android', label: 'Android', re: /^android$/i },
  { key: 'web', label: 'Web', re: /^web$/i },
]
const active = ref('all')
const shown = computed(() => {
  const f = filters.find((x) => x.key === active.value)!
  return apps.filter((a) => a.platforms.some((p) => f.re.test(p)))
})
const codeLead = computed(() =>
  t('home.codeLead', { link: '<a href="https://github.com/lorenzoconcas" target="_blank" rel="noopener">GitHub</a>' }),
)
const pill = 'cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition-all'
</script>

<template>
  <section class="hero-grid relative overflow-hidden pb-12 pt-28 sm:pb-16 sm:pt-36">
    <div class="pointer-events-none absolute left-1/2 top-12 h-64 w-[32rem] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-500/15" />
    <div class="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
      <div class="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-semibold text-muted shadow-sm">
        <Sparkles class="size-3.5 text-indigo-500" />
        <span>{{ t('home.badge') }}</span>
      </div>
      <h1 class="mb-5 font-display text-4xl font-extrabold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">
        {{ t('home.heroA') }} <span class="bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-500 bg-clip-text text-transparent dark:from-indigo-400 dark:via-violet-400 dark:to-indigo-300">{{ t('home.heroB') }}</span>
      </h1>
      <p class="mx-auto max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
        {{ t('home.lead') }}
      </p>
    </div>
  </section>

  <section id="app" class="py-10 sm:py-14">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mb-10 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div class="flex flex-wrap items-center justify-center gap-2 sm:justify-start" role="group" :aria-label="t('home.filterGroup')">
          <button v-for="f in filters" :key="f.key" type="button" :aria-pressed="active === f.key" :class="[pill, active === f.key
            ? 'bg-slate-900 text-white shadow-sm dark:bg-white dark:text-slate-950'
            : 'border border-line bg-surface text-muted hover:border-indigo-400']" @click="active = f.key">{{ f.key === 'all' ? t('home.filterAll') : f.label }}</button>
        </div>
        <div class="text-xs font-medium text-muted">{{ shown.length === 1 ? t('home.count1') : t('home.countN', { n: shown.length }) }}</div>
      </div>

      <div class="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
        <AppCard v-for="a in shown" :key="a.slug" :app="a" />
      </div>

      <div id="codice" class="mt-20">
        <h2 class="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">{{ t('home.codeTitle') }}</h2>
        <p class="mb-8 mt-2 max-w-2xl text-sm text-muted sm:text-base" v-html="codeLead" />
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <ProjectCard v-for="p in projects" :key="p.repo" :project="p" />
        </div>
      </div>

      <div id="contatti" class="mt-16 flex flex-col items-start gap-4 rounded-3xl border border-line bg-surface p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div>
          <h2 class="font-display text-xl font-bold">{{ t('home.contactsTitle') }}</h2>
          <p class="mt-1 text-sm text-muted">{{ t('home.contactsLead') }}</p>
        </div>
        <a :href="`mailto:${CONTACT_EMAIL}`" class="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold !text-white no-underline shadow-md shadow-indigo-600/20 transition-all hover:bg-indigo-700">
          <Mail class="size-4" />{{ CONTACT_EMAIL }}
        </a>
      </div>
    </div>
  </section>
</template>
