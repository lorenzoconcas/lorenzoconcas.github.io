// Interruttori del sito, letti da vite.config.ts (build) e dal codice tramite __ITALIAN_PLAYLISTS__.
//
// ITALIAN_PLAYLISTS: pagina /minitv/playlists con le playlist di canali italiani (Rai, Mediaset, Sky, ...).
//   false → la pagina non viene generata, i link che puntano ad essa spariscono e i file
//           public/minitv/playlists/, public/minitv/logos/ e public/minitv/CanaliItaliani.json non finiscono in dist.
//   true  → come prima.
// Si puo' forzare dalla riga di comando senza modificare il file: ITALIAN_PLAYLISTS=on|off npm run build
// (android.json, usato dall'app Android per gli aggiornamenti, e la cartella demo restano sempre).
const DEFAULT_ITALIAN_PLAYLISTS = false
const fromEnv = process.env.ITALIAN_PLAYLISTS
export const ITALIAN_PLAYLISTS: boolean =
  fromEnv === 'on' ? true : fromEnv === 'off' ? false : DEFAULT_ITALIAN_PLAYLISTS
