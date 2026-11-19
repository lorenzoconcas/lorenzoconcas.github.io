<script setup lang="ts">
import { useLocalizedHead } from "../i18n/head";
import { useI18n } from "../i18n";
import { bySlug } from "../data/apps";

const app = bySlug("minitv");
const base = import.meta.env.BASE_URL;
const dir = `${base}minitv/playlists/`;
const { t, to } = useI18n();
const groupName = (name: string) => (name.startsWith("playlists.") ? t(name as never) : name);
useLocalizedHead(() => ({
  title: t("playlists.title"),
  description: t("playlists.lead"),
}));

const groups = [
  { name: "Rai", file: "rai.json", logo: "rai.png" },
  { name: "Mediaset", file: "mediaset.json", logo: "mediaset.png" },
  { name: "Radio", file: "radio.json", logo: "radio.png" },
  { name: "Sky", file: "sky.json", logo: "sky.png" },
  {
    name: "Warner Bros Discovery",
    file: "discovery.json",
    logo: "warnerbrosdiscovery.png",
  },
  { name: "playlists.other", file: "altro.json", logo: "altro.png" },
  { name: "playlists.regional", file: "regionali.json", logo: "altro.png" },
];

const abs = (file: string) =>
  new URL(`${dir}${file}`, window.location.href).toString();

function view(file: string) {
  window.open(abs(file), "_blank", "noopener,noreferrer");
}
async function save(file: string) {
  try {
    const res = await fetch(`${dir}${file}`, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const url = URL.createObjectURL(await res.blob());
    const a = document.createElement("a");
    a.href = url;
    a.download = file;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  } catch (e) {
    console.error(e);
    alert(t("playlists.errDownload"));
  }
}
async function copy(file: string) {
  try {
    await navigator.clipboard.writeText(abs(file));
    alert(t("playlists.copied"));
  } catch {
    alert(abs(file));
  }
}
function openInMiniTV(file: string) {
  window.open(
    `minitv://url=${encodeURIComponent(abs(file))}`,
    "_blank",
    "noopener,noreferrer",
  );
}

const btn =
  "inline-flex h-11 cursor-pointer items-center gap-2 rounded-xl border border-line bg-surface px-4 text-base font-semibold text-fg transition hover:-translate-y-px";
</script>

<template>
  <div :style="{ '--accent': app.color }" class="mx-auto max-w-4xl px-4 pb-8 pt-28 sm:px-6 sm:pt-32">
    <RouterLink :to="to('/minitv')" class="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold !text-muted no-underline transition-colors hover:!text-accent">← MiniTV</RouterLink>

    <header class="mb-7 flex flex-col items-start gap-3.5">
      <img
        :src="app.icon"
        :alt="t('card.icon', { name: 'MiniTV' })"
        width="128"
        height="128"
        class="size-32 rounded-[30px] object-cover ring-1 ring-line"
        :style="{ boxShadow: `0 18px 50px ${app.color}73` }"
      />
      <h1
        class="m-0 text-[clamp(28px,5vw,44px)] font-bold leading-[1.12] tracking-[-0.03em]"
      >
        {{ t('playlists.title') }}
      </h1>
      <p class="m-0 max-w-[62ch] text-[clamp(16px,2.6vw,19px)] text-muted">
        {{ t('playlists.lead') }}
      </p>
      <RouterLink to="/minitv/crea-playlist" :class="btn + ' no-underline'"
        >{{ t('playlists.create') }}</RouterLink
      >
    </header>

    <div class="flex flex-col gap-2">
      <section
        v-for="g in groups"
        :key="g.file"
        class="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-line bg-surface p-5"
      >
        <div class="flex items-center gap-3">
          <img :src="`${dir}${g.logo}`" :alt="groupName(g.name)" class="w-16" />
          <span class="text-lg font-semibold">{{ groupName(g.name) }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-3">
          <button
            type="button"
            :class="btn"
            :aria-label="t('playlists.ariaOpen', { file: g.file })"
            @click="view(g.file)"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              class="size-5"
              aria-hidden="true"
            >
              <path
                d="M12 5C5 5 2 12 2 12s3 7 10 7 10-7 10-7-3-7-10-7zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"
              />
            </svg>
            {{ t('playlists.view') }}
          </button>
          <button
            type="button"
            :class="btn"
            :aria-label="t('playlists.ariaSave', { file: g.file })"
            @click="save(g.file)"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              class="size-5"
              aria-hidden="true"
            >
              <path d="M5 20h14v-2H5v2zm7-18-5 5h3v6h4V7h3l-5-5z" />
            </svg>
            {{ t('playlists.save') }}
          </button>
          <button
            type="button"
            :class="btn"
            :aria-label="t('playlists.ariaCopy', { file: g.file })"
            @click="copy(g.file)"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              class="size-5"
              aria-hidden="true"
            >
              <path
                d="M16 1H4a2 2 0 0 0-2 2v12h2V3h12V1zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 16H8V7h11v14z"
              />
            </svg>
            {{ t('playlists.copy') }}
          </button>
          <button
            type="button"
            :class="btn"
            :aria-label="t('playlists.ariaOpenIn', { file: g.file })"
            @click="openInMiniTV(g.file)"
          >
            <img :src="`${dir}minitv.svg`" alt="" class="size-5" />
            {{ t('playlists.openIn') }}
          </button>
        </div>
      </section>
    </div>

    
  </div>
</template>
