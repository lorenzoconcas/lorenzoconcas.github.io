<script setup lang="ts">
import type { Store } from '../data/apps'
import { useI18n } from '../i18n'
import appStore from '../assets/badges/appStore.svg'
import macAppStore from '../assets/badges/macAppStore.svg'
import androidApk from '../assets/badges/androidapk.svg'
defineProps<{ stores: Store[] }>()
const { t } = useI18n()
const badge = {
  ios: { src: appStore, key: 'store.ios', h: 60 },
  mac: { src: macAppStore, key: 'store.mac', h: 60 },
  apk: { src: androidApk, key: 'store.apk', h: 60 },
} as const
</script>

<template>
  <div class="mt-6 flex flex-wrap items-center gap-3">
    <template v-for="s in stores" :key="s.kind + s.href">
      <a v-if="s.kind !== 'web'" :href="s.href" target="_blank" rel="noopener noreferrer" :aria-label="t(badge[s.kind].key)">
        <img :src="badge[s.kind].src" :alt="t(badge[s.kind].key)" :style="{ height: badge[s.kind].h + 'px', width: 'auto' }" />
      </a>
      <a v-else :href="s.href" target="_blank" rel="noopener noreferrer"
        class="inline-flex rounded-xl bg-accent px-4 py-2.5 text-base font-semibold !text-white no-underline transition hover:-translate-y-px">{{ t('store.web') }}</a>
    </template>
  </div>
</template>
