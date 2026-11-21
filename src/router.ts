import type { RouteRecordRaw } from 'vue-router'

// L'italiano sta alla radice; le altre lingue sotto /en, /fr, /de, /es, /pt (parametro opzionale).
export const routes: RouteRecordRaw[] = [
  {
    path: '/:lang(en|fr|de|es|pt)?',
    children: [
      { path: '', component: () => import('./views/HomeView.vue') },
      { path: 'minitv', component: () => import('./views/AppView.vue'), props: { slug: 'minitv' } },
      { path: 'minitv/playlists', component: () => import('./views/MiniTvPlaylistsView.vue') },
      { path: 'minitv/crea-playlist', component: () => import('./views/MiniTvCreatePlaylistView.vue') },
      { path: 'travelbuddy', component: () => import('./views/AppView.vue'), props: { slug: 'travelbuddy' } },
      { path: 'racemap', component: () => import('./views/AppView.vue'), props: { slug: 'racemap' } },
      { path: 'curalink', component: () => import('./views/AppView.vue'), props: { slug: 'curalink' } },
      { path: 'spese-immobili', component: () => import('./views/AppView.vue'), props: { slug: 'spese-immobili' } },
    ],
  },
  { path: '/404', component: () => import('./views/NotFoundView.vue') },
  { path: '/:pathMatch(.*)*', component: () => import('./views/NotFoundView.vue') },
]
