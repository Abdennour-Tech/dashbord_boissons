import { useState } from 'react'
import { Card, Btn, Badge, Field, PageHeader, inputCls, downloadCSV } from '../components/ui.jsx'
import { events } from '../data.js'

const tone = { Paiements: 'blue', Stock: 'amber', Retours: 'red', Clients: 'green', 'Notes de frais': 'purple' }
const modules = ['Tous', ...Object.keys(tone)]

const cols = [
  { key: 'module', label: 'Module' },
  { key: 'action', label: 'Action' },
  { key: 'detail', label: 'Détail' },
  { key: 'user', label: 'Utilisateur' },
  { key: 'time', label: 'Date' },
]

export default function Historique() {
  const [q, setQ] = useState('')
  const [mod, setMod] = useState('Tous')

  const rows = events.filter(
    (e) => (mod === 'Tous' || e.module === mod) && `${e.action} ${e.detail} ${e.user}`.toLowerCase().includes(q.toLowerCase())
  )

  return (
    <>
      <PageHeader title="Historique" subtitle="Qui a fait quoi, et quand · données de démonstration">
        <Btn onClick={() => downloadCSV('historique.csv', cols, rows)}>Exporter Excel</Btn>
        <Btn onClick={() => window.print()}>Exporter PDF</Btn>
      </PageHeader>

      <section className="no-print flex flex-wrap items-end gap-3">
        <Field label="Recherche" className="min-w-[240px] flex-[2_1_240px]">
          <input className={inputCls} placeholder="Client, facture, utilisateur…" value={q} onChange={(e) => setQ(e.target.value)} />
        </Field>
        <Field label="Module" className="min-w-[180px] flex-[1_1_180px]">
          <select className={inputCls} value={mod} onChange={(e) => setMod(e.target.value)}>
            {modules.map((m) => <option key={m}>{m}</option>)}
          </select>
        </Field>
      </section>

      <Card className="print-area">
        <h2 className="mb-2.5 text-base font-semibold">Activité récente</h2>
        {rows.map((e, i) => (
          <div key={i} className="flex flex-wrap items-center gap-3 border-t border-[#EEF1F6] py-3.5">
            <div className="w-28 shrink-0"><Badge tone={tone[e.module]}>{e.module}</Badge></div>
            <div className="min-w-[220px] flex-1">
              <div className="text-sm font-semibold">{e.action}</div>
              <div className="text-xs text-muted">{e.detail}</div>
            </div>
            <div className="text-right">
              <div className="text-[13px] font-semibold">{e.user}</div>
              <div className="text-xs text-muted">{e.time}</div>
            </div>
          </div>
        ))}
        {rows.length === 0 && <p className="py-8 text-center text-muted">Aucun résultat</p>}
      </Card>
    </>
  )
}
