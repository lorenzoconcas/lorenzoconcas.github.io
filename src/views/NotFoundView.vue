<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { useI18n } from '../i18n'
const { t, to, lang } = useI18n()
useHead(() => ({ htmlAttrs: { lang: lang.value }, title: t('notfound.title'), meta: [{ name: 'robots', content: 'noindex' }] }))
</script>

<template>
  <header class="mx-auto max-w-4xl px-4 pb-8 pt-28 sm:px-6 sm:pt-32 py-24 text-center" style="padding-top:9rem">
    <h1 class="m-0 text-7xl font-bold tracking-tight">404</h1>
    <p class="mt-3 text-lg text-muted">{{ t('notfound.text') }}</p>
    <RouterLink :to="to('/')" class="mt-6 inline-flex rounded-xl bg-indigo-600 px-4 py-2.5 font-semibold !text-white no-underline">{{ t('notfound.home') }}</RouterLink>
  </header>
</template>
