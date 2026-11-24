import { clients } from './data.js'

// Catalogue démo (prix par caisse, faux). Plus tard : lu depuis la base de données.
export const catalog = [
  { code: 'BIE05', name: 'Bière blonde 33 cl', prix: 288, keywords: ['biere', 'corona'] },
  { code: 'EAU20', name: 'Eau minérale 33 cl', prix: 96, keywords: ['eau', 'evian'] },
  { code: 'TON15', name: 'Tonic méditerranéen 20 cl', prix: 168, keywords: ['tonic'] },
  { code: 'GIN05', name: 'Ginger ale 20 cl', prix: 175, keywords: ['ginger'] },
  { code: 'SOD25', name: 'Pink grapefruit 20 cl', prix: 170, keywords: ['pink', 'grapefruit', 'soda'] },
  { code: 'ENE10', name: 'Boisson énergisante 25 cl', prix: 360, keywords: ['energisante', 'energy', 'power horse'] },
]

export const clientNames = clients.map((c) => c.name)
