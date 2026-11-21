// Italiano: lingua di riferimento. Le altre lingue devono avere le stesse chiavi.
export const ui = {
  'nav.apps': 'App',
  'nav.code': 'Codice',
  'nav.theme': 'Cambia tema',
  'nav.lang': 'Lingua',
  'home.title': 'Lorenzo Concas – App per iOS, macOS e Android',
  'home.desc': 'Le app di Lorenzo Concas: TravelBuddy, MiniTV, RaceMap, CuraLink e Spese Immobili.',
  'home.ogTitle': 'Lorenzo Concas – App',
  'home.badge': 'App Showcase',
  'home.heroA': 'Le mie',
  'home.heroB': 'Applicazioni',
  'home.lead': 'App per iOS, macOS e Android progettate e sviluppate da zero. Esplora le funzionalità e scaricale direttamente dagli store.',
  'home.filterAll': 'Tutte',
  'home.filterGroup': 'Filtra per piattaforma',
  'home.count1': '1 applicazione',
  'home.countN': '{n} applicazioni',
  'home.codeTitle': 'Progetti open source',
  'home.codeLead': 'Alcuni dei miei progetti di codice pubblici, anche su {link}.',
  'home.contactsTitle': 'Contatti e supporto',
  'home.contactsLead': 'Domande, segnalazioni o richieste sui dati? Scrivimi.',
  'card.explore': 'Esplora',
  'card.privacy': 'Privacy',
  'card.support': 'Supporto',
  'card.icon': 'Icona {name}',
  'link.appStore': 'App Store',
  'link.apk': 'APK Android',
  'link.testflight': 'TestFlight',
  'link.webApp': "Apri l'app web",
  'platform.androidSoon': 'Android in arrivo',
  'project.code': 'Codice',
  'project.site': 'Sito',
  'app.back': 'Tutte le app',
  'app.version': 'Versione {v}',
  'app.tvosTitle': 'Versione tvOS',
  'app.tvosText': 'La versione dedicata per Apple TV è in fase di sviluppo!',
  'app.tvosNote': 'Gli acquisti in-app saranno comuni e condivisi fra tutte le versioni',
  'app.privacyHeading': 'Privacy Policy',
  'app.privacyOnlyIt': 'Questa informativa è disponibile solo in italiano.',
  'app.privacyLang': 'Lingua',
  'support.title': 'Supporto',
  'support.body': "Per assistenza o domande relative all'app {name}, puoi contattarci via email all'indirizzo: {email}.",
  'support.reply': 'Risponderemo alle tue richieste il prima possibile.',
  'store.ios': 'Scarica da App Store',
  'store.mac': 'Scarica da Mac App Store',
  'store.apk': 'Scarica APK per Android',
  'store.testflight': 'Provalo su TestFlight',
  'store.web': "Apri l'app web",
  'extras.m3u': 'Vedi un esempio di playlist M3U',
  'extras.json': 'Esempio di playlist JSON',
  'extras.tv': 'Esempi di playlist con canali televisivi',
  'extras.button': 'Playlist di esempio',
  'playlists.title': 'MiniTV – Playlist di esempio',
  'playlists.lead': 'Qui sono disponibili delle playlist di esempio con canali italiani',
  'playlists.create': 'Crea la tua playlist',
  'playlists.view': 'Vedi',
  'playlists.save': 'Salva',
  'playlists.copy': 'Copia link',
  'playlists.openIn': 'Apri in MiniTV',
  'playlists.ariaOpen': 'Apri {file}',
  'playlists.ariaSave': 'Scarica {file}',
  'playlists.ariaCopy': 'Copia link {file}',
  'playlists.ariaOpenIn': 'Apri {file} in MiniTV',
  'playlists.errDownload': 'Impossibile scaricare il file in questo momento. Riprova più tardi.',
  'playlists.copied': 'Link copiato negli appunti.',
  'playlists.other': 'Altro',
  'playlists.regional': 'Regionali',
  'notfound.title': 'Pagina non trovata – Lorenzo Concas',
  'notfound.text': 'Questa pagina non esiste.',
  'notfound.home': 'Torna alla home',
  'footer.rights': '© {year} · Tutti i marchi appartengono ai rispettivi proprietari.',
  'footer.privacyOf': 'Privacy {name}',
  'footer.contacts': 'Contatti',
} as const

export type UiKey = keyof typeof ui

export interface AppText {
  title: string
  summary: string
  lead: string
  features: { title: string; text: string }[]
  notes: string[]
}
export type AppSlug = 'travelbuddy' | 'minitv' | 'racemap' | 'curalink' | 'spese-immobili'
export type ProjectKey =
  | 'HSB'
  | 'GeniaLogic'
  | 'samsung-m2020-printer-app'
  | 'berryOS'
  | 'typed-linq'
  | 'MqttRemote'
  | 'HA-PrezziCarburante'
  | 'XCEM'
  | 'Invaders'

export interface Locale {
  ui: Record<UiKey, string>
  apps?: Record<AppSlug, AppText>
  projects?: Record<ProjectKey, string>
}
