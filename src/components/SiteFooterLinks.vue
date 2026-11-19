<script setup lang="ts">
import { apps, CONTACT_EMAIL, privacyPath } from '../data/apps'
</script>

<template>
  <nav class="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-xs font-medium">
    <RouterLink v-for="a in apps" :key="a.slug" :to="privacyPath(a)" class="!text-muted no-underline transition-colors hover:!text-accent">Privacy {{ a.name }}</RouterLink>
    <a :href="`mailto:${CONTACT_EMAIL}`" class="!text-muted no-underline transition-colors hover:!text-accent">Contatti</a>
  </nav>
</template>
