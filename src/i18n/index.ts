import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { ui as it } from './locales/it'
import type { AppSlug, AppText, Locale, ProjectKey, UiKey } from './locales/it'
import { en } from './locales/en'
import { fr } from './locales/fr'
import { de } from './locales/de'
import { es } from './locales/es'
import { pt } from './locales/pt'

export const LANGS = ['it', 'en', 'fr', 'de', 'es', 'pt'] as const
export type Lang = (typeof LANGS)[number]
export const DEFAULT_LANG: Lang = 'it'
export const LANG_NAMES: Record<Lang, string> = {
  it: 'Italiano',
  en: 'English',
  fr: 'Français',
  de: 'Deutsch',
  es: 'Español',
  pt: 'Português',
}
/** Valore per l'attributo lang e per og:locale. */
export const OG_LOCALES: Record<Lang, string> = {
  it: 'it_IT',
  en: 'en_US',
  fr: 'fr_FR',
  de: 'de_DE',
  es: 'es_ES',
  pt: 'pt_PT',
}
export const SITE_URL = 'https://lorenzoconcas.github.io'

const locales: Record<Lang, Locale> = { it: { ui: it }, en, fr, de, es, pt }

export const isLang = (value: unknown): value is Lang => LANGS.includes(value as Lang)

/** Prefisso di percorso: l'italiano resta alla radice, le altre lingue sotto /<lang>. */
export const localizedPath = (lang: Lang, path: string) => {
  const clean = path === '/' ? '' : path
  return lang === DEFAULT_LANG ? path : `/${lang}${clean}` || `/${lang}`
}

/** Toglie l'eventuale prefisso di lingua da un percorso. */
export const stripLang = (path: string) => {
  const match = /^\/(en|fr|de|es|pt)(?=\/|$)/.exec(path)
  return match ? path.slice(match[0].length) || '/' : path
}

const format = (text: string, vars?: Record<string, string | number>) =>
  vars ? text.replace(/\{(\w+)\}/g, (_, key) => String(vars[key] ?? `{${key}}`)) : text

export function translate(lang: Lang, key: UiKey, vars?: Record<string, string | number>) {
  return format(locales[lang].ui[key] ?? it[key], vars)
}
export function appText(lang: Lang, slug: AppSlug): AppText | undefined {
  return locales[lang].apps?.[slug]
}
export function projectText(lang: Lang, key: ProjectKey): string | undefined {
  return locales[lang].projects?.[key]
}

/** Lingua corrente (dalla rotta) e helper di traduzione per i componenti. */
export function useI18n() {
  const route = useRoute()
  const lang = computed<Lang>(() => {
    if (isLang(route.params.lang)) return route.params.lang
    // Pagina 404: la lingua si ricava dal prefisso dell'indirizzo, se presente.
    const prefix = /^\/(en|fr|de|es|pt)(?=\/|$)/.exec(route.path)?.[1]
    return isLang(prefix) ? prefix : DEFAULT_LANG
  })
  return {
    lang,
    t: (key: UiKey, vars?: Record<string, string | number>) => translate(lang.value, key, vars),
    /** Percorso interno nella lingua corrente. */
    to: (path: string) => localizedPath(lang.value, path),
    app: (slug: AppSlug) => appText(lang.value, slug),
    project: (key: ProjectKey) => projectText(lang.value, key),
  }
}
