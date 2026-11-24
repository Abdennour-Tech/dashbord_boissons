import { catalog, clientNames } from '../aiData.js'

// ⚠️ Simulation de l'IA pour la démo (aucun appel réseau).
// En production : cette fonction est remplacée par un appel au backend
// (POST /api/assistant) qui utilise l'API Claude et renvoie le même format.

const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
const STOP = ['demo', 'les', 'de', 'la', 'du']

export function parseRequest(text) {
  const t = norm(text)

  let client = ''
  let best = 0
  for (const name of clientNames) {
    const words = norm(name).split(/\s+/).filter((w) => w.length > 2 && !STOP.includes(w))
    const score = words.filter((w) => t.includes(w)).length
    if (score > best) {
      best = score
      client = name
    }
  }

  const lines = []
  for (const item of catalog) {
    for (const kw of item.keywords) {
      const before = new RegExp(`(\\d+)\\s*(?:caisses?|cartons?|casiers?|palettes?)?\\s*(?:de |d'|dyal |dial )?${kw}`)
      const after = new RegExp(`${kw}\\s*(?:x|×|:)?\\s*(\\d+)`)
      const m = t.match(before) || t.match(after)
      if (m) {
        lines.push({ code: item.code, article: item.name, qty: Number(m[1]), prix: item.prix })
        break
      }
    }
  }
  return { client, lines }
}
