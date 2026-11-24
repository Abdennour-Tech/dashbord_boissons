import { useState } from 'react'
import { Card, Btn, Badge, DataTable, Field, PageHeader, inputCls, statusTone, fmt, downloadCSV } from '../components/ui.jsx'
import { chequeLines, debts } from '../data.js'

export default function Paiements() {
  const [lines, setLines] = useState(chequeLines)
  const [q, setQ] = useState('')
  const [status, setStatus] = useState('Tous')
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ client: '', cheque: '', facture: '', amount: '' })

  const filtered = lines.filter(
    (l) =>
      (status === 'Tous' || l.status === status) &&
      `${l.client} ${l.cheque} ${l.facture}`.toLowerCase().includes(q.toLowerCase())
  )

  const cols = [
    { key: 'cheque', label: 'Chèque', bold: true },
    { key: 'client', label: 'Client' },
    { key: 'facture', label: 'Facture liée' },
    { label: 'Imputé', align: 'right', bold: true, render: (r) => fmt(r.amount), csv: (r) => fmt(r.amount) },
    { label: 'Statut', render: (r) => <Badge tone={statusTone[r.status]}>{r.status}</Badge>, csv: (r) => r.status },
  ]

  const add = (e) => {
    e.preventDefault()
    if (!form.client || !form.cheque) return
    setLines([{ ...form, amount: Number(form.amount) || 0, status: 'À encaisser' }, ...lines])
    setForm({ client: '', cheque: '', facture: '', amount: '' })
    setOpen(false)
  }

  const maxDebt = Math.max(...debts.map((d) => d.amount))

  return (
    <>
      <PageHeader title="Paiements" subtitle="Chèques, règlements et impayés · données de démonstration">
        <Btn onClick={() => downloadCSV('paiements.csv', cols, filtered)}>Exporter Excel</Btn>
        <Btn onClick={() => window.print()}>Exporter PDF</Btn>
        <Btn variant="primary" onClick={() => setOpen(!open)}>+ Enregistrer un chèque</Btn>
      </PageHeader>

      {open && (
        <Card>
          <form onSubmit={add} className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] items-end gap-3">
            <Field label="Client"><input className={inputCls} value={form.client} onChange={(e) => setForm({ ...form, client: e.target.value })} /></Field>
            <Field label="N° chèque"><input className={inputCls} value={form.cheque} onChange={(e) => setForm({ ...form, cheque: e.target.value })} /></Field>
            <Field label="Facture liée"><input className={inputCls} value={form.facture} onChange={(e) => setForm({ ...form, facture: e.target.value })} /></Field>
            <Field label="Montant (MAD)"><input type="number" className={inputCls} value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} /></Field>
            <Btn variant="primary" type="submit">Ajouter</Btn>
          </form>
        </Card>
      )}

      <section className="no-print flex flex-wrap items-end gap-3">
        <Field label="Recherche" className="min-w-[240px] flex-[2_1_240px]">
          <input className={inputCls} placeholder="Client, n° chèque, facture…" value={q} onChange={(e) => setQ(e.target.value)} />
        </Field>
        <Field label="Statut" className="min-w-[160px] flex-[1_1_160px]">
          <select className={inputCls} value={status} onChange={(e) => setStatus(e.target.value)}>
            {['Tous', 'À encaisser', 'Encaissé', 'Impayé'].map((s) => <option key={s}>{s}</option>)}
          </select>
        </Field>
      </section>

      <section className="flex flex-wrap items-start gap-4">
        <Card className="min-w-0 flex-[3_1_480px]">
          <h2 className="mb-3 text-base font-semibold">Chèques et factures liées</h2>
          <DataTable columns={cols} rows={filtered} minWidth={560} />
        </Card>

        <Card className="flex min-w-0 flex-[2_1_300px] flex-col gap-4">
          <h2 className="text-base font-semibold">Impayés par client</h2>
          {debts.map((d) => (
            <div key={d.client} className="flex flex-col gap-1.5">
              <div className="flex justify-between gap-2 text-sm">
                <span className="font-semibold">{d.client}</span>
                <span>{fmt(d.amount)}</span>
              </div>
              <div className="h-2 rounded-full bg-[#EEF1F6]">
                <div className="h-2 rounded-full" style={{ width: `${(d.amount / maxDebt) * 100}%`, background: d.color }} />
              </div>
              <span className="text-xs text-muted">{d.comment}</span>
            </div>
          ))}
        </Card>
      </section>
    </>
  )
}
