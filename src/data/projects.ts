import hsbIcon from '../assets/projects/hsb.png'
import xcemIcon from '../assets/projects/xcem.png'
import genialogicIcon from '../assets/projects/genialogic.svg'

// Icone Material Symbols (Google) per i progetti senza icona propria
import print from '@material-symbols/svg-400/rounded/print.svg?raw'
import dashboard from '@material-symbols/svg-400/rounded/dashboard.svg?raw'
import dataArray from '@material-symbols/svg-400/rounded/data_array.svg?raw'
import settingsRemote from '@material-symbols/svg-400/rounded/settings_remote.svg?raw'
import gasStation from '@material-symbols/svg-400/rounded/local_gas_station.svg?raw'
import games from '@material-symbols/svg-400/rounded/sports_esports.svg?raw'

export interface Project {
  name: string
  description: string
  language: string
  color: string // colore della card (e dello sfondo dell'icona Material)
  icon?: string // immagine propria del progetto
  symbol?: string // SVG Material Symbols (se non c'è icon)
  repo: string // nome della repo su github.com/lorenzoconcas
  site?: string
}

const gh = 'https://github.com/lorenzoconcas/'
export const repoUrl = (p: Project) => gh + p.repo

export const projects: Project[] = [
  {
    name: 'HSB',
    description: 'Http Server Boxed: una piccola libreria C# che include un intero web server.',
    language: 'C#',
    color: '#8b5cf6',
    icon: hsbIcon,
    repo: 'HSB',
    site: 'https://lorenzoconcas.github.io/HSB/',
  },
  {
    name: 'GeniaLogic',
    description: 'Crea, esplora e conserva alberi genealogici complessi, con i dati salvati localmente nel browser.',
    language: 'Vue',
    color: '#6366f1',
    icon: genialogicIcon,
    repo: 'GeniaLogic',
    site: 'https://lorenzoconcas.github.io/GeniaLogic/',
  },
  {
    name: 'Samsung M2020 Printer App',
    description: 'Printer Application IPP/AirPrint per le stampanti Samsung M2020 solo USB, su macOS e Linux arm64.',
    language: 'C',
    color: '#0ea5e9',
    symbol: print,
    repo: 'samsung-m2020-printer-app',
  },
  {
    name: 'Berry OS',
    description: "Interfaccia web in stile sistema operativo per accedere ai servizi del tuo server.",
    language: 'Vue',
    color: '#e11d48',
    symbol: dashboard,
    repo: 'berryOS',
  },
  {
    name: 'typed-linq',
    description: 'Estensioni in stile LINQ per Array.prototype, completamente tipizzate in TypeScript.',
    language: 'TypeScript',
    color: '#3178c6',
    symbol: dataArray,
    repo: 'typed-linq',
  },
  {
    name: 'MqttRemote',
    description: 'Esponi e comanda un server Linux via MQTT, pensato per Home Assistant.',
    language: 'JavaScript',
    color: '#f59e0b',
    symbol: settingsRemote,
    repo: 'MqttRemote',
  },
  {
    name: 'Prezzi Carburante',
    description: 'Integrazione Home Assistant con i prezzi dei carburanti delle stazioni italiane.',
    language: 'Python',
    color: '#10b981',
    symbol: gasStation,
    repo: 'HA-PrezziCarburante',
  },
  {
    name: 'XCEM',
    description: 'Xiaomi Camera Effects Manager: crea moduli Magisk che cambiano il suono della fotocamera.',
    language: 'Dart',
    color: '#f97316',
    icon: xcemIcon,
    repo: 'XCEM',
  },
  {
    name: 'Invaders',
    description: 'Progetto di Sistemi Operativi 1 (UniCa): uno Space Invaders in C con ncurses.',
    language: 'C',
    color: '#22c55e',
    symbol: games,
    repo: 'Invaders',
  },
]
