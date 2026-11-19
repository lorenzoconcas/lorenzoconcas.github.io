import { useHead } from '@unhead/vue'
import { useRoute } from 'vue-router'
import { LANGS, OG_LOCALES, SITE_URL, localizedPath, stripLang, useI18n } from './index'

/** Titolo, meta social, canonical e alternate hreflang di una pagina localizzata. */
export function useLocalizedHead(meta: () => { title: string; description: string; ogTitle?: string; type?: string }) {
  const route = useRoute()
  const { lang } = useI18n()
  useHead(() => {
    const m = meta()
    const base = stripLang(route.path)
    // Le pagine sono cartelle statiche (/de/ …): l'URL canonico ha lo slash finale.
    const url = (l: (typeof LANGS)[number]) => {
      const path = localizedPath(l, base)
      return `${SITE_URL}${path.endsWith('/') ? path : `${path}/`}`
    }
    return {
      htmlAttrs: { lang: lang.value },
      title: m.title,
      meta: [
        { name: 'description', content: m.description },
        { property: 'og:type', content: m.type ?? 'website' },
        { property: 'og:title', content: m.ogTitle ?? m.title },
        { property: 'og:description', content: m.description },
        { property: 'og:locale', content: OG_LOCALES[lang.value] },
        { property: 'og:url', content: url(lang.value) },
        { name: 'twitter:title', content: m.ogTitle ?? m.title },
        { name: 'twitter:description', content: m.description },
      ],
      link: [
        { rel: 'canonical', href: url(lang.value) },
        ...LANGS.map((l) => ({ rel: 'alternate', hreflang: l, href: url(l) })),
        { rel: 'alternate', hreflang: 'x-default', href: url('it') },
      ],
    }
  })
}
