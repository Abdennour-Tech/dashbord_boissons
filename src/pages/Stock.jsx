import { useState } from 'react'
import { Card, Btn, Badge, DataTable, Field, PageHeader, inputCls, statusTone, fmtDate, downloadCSV } from '../components/ui.jsx'
import { stock } from '../data.js'

const daysUntil = (iso) => Math.ceil((new Date(iso) - new Date()) / 86400000)
const statusOf = (iso) => {
  const d = daysUntil(iso)
  return d < 30 ? 'Critique' : d < 120 ? 'DLC proche' : 'OK'
}
const n = (v) => Number(v).toLocaleString('fr-FR')

export default function Stock() {
  const [q, setQ] = useState('')
  const [onlyDlc, setOnlyDlc] = useState(false)

  const rows = stock
    .map((s) => ({ ...s, status: statusOf(s.dlc) }))
    .filter((s) => `${s.code} ${s.name}`.toLowerCase().includes(q.toLowerCase()))
    .filter((s) => !onlyDlc || s.status !== 'OK')

  const cols = [
    { key: 'code', label: 'Code' },
    { key: 'name', label: 'Désignation', bold: true },
    { label: 'Colisage', align: 'right', render: (r) => r.colisage, csv: (r) => r.colisage },
    { label: 'Quantité (UVC)', align: 'right', render: (r) => n(r.qty), csv: (r) => r.qty },
    { label: 'Caisses', align: 'right', bold: true, render: (r) => n(r.caisses), csv: (r) => r.caisses },
    { label: 'Date péremption', render: (r) => fmtDate(r.dlc), csv: (r) => fmtDate(r.dlc) },
    { label: 'Statut', render: (r) => <Badge tone={statusTone[r.status]}>{r.status}</Badge>, csv: (r) => r.status },
  ]

  const kpis = [
    ['Articles référencés', String(stock.length)],
    ['Caisses en stock', n(stock.reduce((s, r) => s + r.caisses, 0))],
    ['Alertes DLC', String(stock.filter((s) => statusOf(s.dlc) !== 'OK').length)],
  ]

  return (
    <>
      <PageHeader title="Stock / Articles" subtitle="Quantités, caisses et dates de péremption · données de démonstration">
        <Btn onClick={() => downloadCSV('stock.csv', cols, rows)}>Exporter Excel</Btn>
        <Btn onClick={() => window.print()}>Exporter PDF</Btn>
        <Btn variant="primary">+ Ajouter un article</Btn>
      </PageHeader>

      <section className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
        {kpis.map(([l, v]) => (
          <Card key={l} className="flex flex-col gap-1.5">
            <span className="text-[13px] font-medium text-muted">{l}</span>
            <span className="text-[26px] font-bold">{v}</span>
          </Card>
        ))}
      </section>

      <section className="no-print flex flex-wrap items-end gap-3">
        <Field label="Recherche" className="min-w-[240px] flex-[2_1_240px]">
          <input className={inputCls} placeholder="Code ou désignation…" value={q} onChange={(e) => setQ(e.target.value)} />
        </Field>
        <Btn
          onClick={() => setOnlyDlc(!onlyDlc)}
          className={onlyDlc ? '!border-[#F0B27A] !bg-[#FEF0D6] !text-[#7A4A06]' : ''}
        >
          {onlyDlc ? 'Afficher tout' : 'Seulement DLC proche'}
        </Btn>
      </section>

      <Card>
        <h2 className="mb-3 text-base font-semibold">Articles en stock</h2>
        <DataTable columns={cols} rows={rows} minWidth={760} />
      </Card>
    </>
  )
}
