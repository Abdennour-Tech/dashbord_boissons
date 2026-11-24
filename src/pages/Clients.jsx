import { useState } from 'react'
import { Card, Btn, Badge, DataTable, Field, PageHeader, inputCls, statusTone, fmt, downloadCSV } from '../components/ui.jsx'
import { clients as seed } from '../data.js'

export default function Clients() {
  const [list, setList] = useState(seed)
  const [q, setQ] = useState('')
  const [canal, setCanal] = useState('Tous')
  const [open, setOpen] = useState(false)
  const [f, setF] = useState({ code: '', name: '', canal: 'CHR', rep: '' })

  const rows = list.filter(
    (c) => (canal === 'Tous' || c.canal === canal) && `${c.code} ${c.name}`.toLowerCase().includes(q.toLowerCase())
  )

  const cols = [
    { key: 'code', label: 'Code' },
    { key: 'name', label: 'Raison sociale', bold: true },
    { key: 'canal', label: 'Canal' },
    { key: 'rep', label: 'Représentant' },
    { key: 'first', label: 'Première vente' },
    { label: 'Encours (MAD)', align: 'right', bold: true, render: (r) => fmt(r.balance), csv: (r) => fmt(r.balance) },
    { label: 'Statut', render: (r) => <Badge tone={statusTone[r.status]}>{r.status}</Badge>, csv: (r) => r.status },
  ]

  const add = (e) => {
    e.preventDefault()
    if (!f.name) return
    setList([
      { ...f, code: f.code || 'C' + Math.floor(66000 + Math.random() * 900), first: '—', balance: 0, status: 'Nouveau' },
      ...list,
    ])
    setF({ code: '', name: '', canal: 'CHR', rep: '' })
    setOpen(false)
  }

  const kpis = [
    ['Clients actifs', String(list.filter((c) => c.status === 'Actif').length)],
    ['Nouveaux', String(list.filter((c) => c.status === 'Nouveau').length)],
    ['Comptes à surveiller', String(list.filter((c) => c.status === 'À surveiller').length)],
  ]

  return (
    <>
      <PageHeader title="Clients" subtitle="Fiches clients, création de comptes et suivi · données de démonstration">
        <Btn onClick={() => downloadCSV('clients.csv', cols, rows)}>Exporter Excel</Btn>
        <Btn variant="primary" onClick={() => setOpen(!open)}>+ Nouveau client</Btn>
      </PageHeader>

      {open && (
        <Card>
          <form onSubmit={add} className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] items-end gap-3">
            <Field label="Code (optionnel)"><input className={inputCls} value={f.code} onChange={(e) => setF({ ...f, code: e.target.value })} /></Field>
            <Field label="Raison sociale"><input className={inputCls} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} /></Field>
            <Field label="Canal">
              <select className={inputCls} value={f.canal} onChange={(e) => setF({ ...f, canal: e.target.value })}>
                {['CHR', 'GMS', 'Grossiste'].map((c) => <option key={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Représentant"><input className={inputCls} value={f.rep} onChange={(e) => setF({ ...f, rep: e.target.value })} /></Field>
            <Btn variant="primary" type="submit">Créer</Btn>
          </form>
        </Card>
      )}

      <section className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
        {kpis.map(([l, v]) => (
          <Card key={l} className="flex flex-col gap-1.5">
            <span className="text-[13px] font-medium text-muted">{l}</span>
            <span className="text-[26px] font-bold">{v}</span>
          </Card>
        ))}
      </section>

      <section className="flex flex-wrap items-end gap-3">
        <Field label="Recherche" className="min-w-[240px] flex-[2_1_240px]">
          <input className={inputCls} placeholder="Nom ou code client…" value={q} onChange={(e) => setQ(e.target.value)} />
        </Field>
        <Field label="Canal" className="min-w-[160px] flex-[1_1_160px]">
          <select className={inputCls} value={canal} onChange={(e) => setCanal(e.target.value)}>
            {['Tous', 'CHR', 'GMS', 'Grossiste'].map((c) => <option key={c}>{c}</option>)}
          </select>
        </Field>
      </section>

      <Card>
        <h2 className="mb-3 text-base font-semibold">Liste des clients</h2>
        <DataTable columns={cols} rows={rows} minWidth={760} />
      </Card>
    </>
  )
}
