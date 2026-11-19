<script setup lang="ts">
import { computed } from 'vue'
import { CONTACT_EMAIL } from '../data/apps'
import { useI18n } from '../i18n'
const props = defineProps<{ name: string }>()
const { t } = useI18n()
// I valori inseriti sono costanti del sito (nome app ed email), non input dell'utente.
const body = computed(() =>
  t('support.body', {
    name: `<strong>${props.name}</strong>`,
    email: `<a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>`,
  }),
)
</script>

<template>
  <section id="support" class="rounded-3xl border border-line bg-surface p-6">
    <h2 class="mb-2 mt-0 font-display text-2xl font-bold tracking-tight">{{ t('support.title') }}</h2>
    <p class="m-0" v-html="body" />
    <p class="mb-0 mt-2 text-muted">{{ t('support.reply') }}</p>
  </section>
</template>
