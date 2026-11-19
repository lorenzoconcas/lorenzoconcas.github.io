<script setup lang="ts">
import { apps, CONTACT_EMAIL, privacyPath } from '../data/apps'
import { useI18n } from '../i18n'
const { t, to, lang } = useI18n()
</script>

<template>
  <nav class="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-xs font-medium">
    <RouterLink v-for="a in apps" :key="a.slug" :to="to(privacyPath(a, lang))" class="!text-muted no-underline transition-colors hover:!text-accent">{{ t('footer.privacyOf', { name: a.name }) }}</RouterLink>
    <a :href="`mailto:${CONTACT_EMAIL}`" class="!text-muted no-underline transition-colors hover:!text-accent">{{ t('footer.contacts') }}</a>
  </nav>
</template>
