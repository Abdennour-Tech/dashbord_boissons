import { Link, useNavigate } from 'react-router-dom'
import { Card, Btn, Badge, DataTable, PageHeader, statusTone, fmt, fmtDate, downloadCSV } from '../components/ui.jsx'
import { bars, payments, stock } from '../data.js'

const daysUntil = (iso) => Math.ceil((new Date(iso) - new Date()) / 86400000)

export default function Dashboard() {
  const go = useNavigate()
  const max = Math.max(...bars.map((b) => b.value))
  const totalDebt = bars.reduce((s, b) => s + b.value, 0)
  const dlc = stock
    .map((s) => ({ ...s, days: daysUntil(s.dlc) }))
    .filter((s) => s.days < 120)
    .sort((a, b) => a.days - b.days)
  const toCollect = payments.filter((p) => p.status === 'À encaisser').length

  const kpis = [
    { label: 'Total impayés', value: `${fmt(totalDebt).replace(',00', '')} MAD`, note: '+4,2 % vs mois dernier', noteCls: 'text-[#B42318]' },
    { label: 'Chèques à encaisser', value: String(toCollect), note: 'Voir la liste des paiements', noteCls: 'text-muted' },
    { label: 'Produits DLC proche', value: String(dlc.length), note: `${dlc.filter((d) => d.days < 30).length} à moins de 30 jours`, noteCls: 'text-[#B54708]' },
    { label: 'Notes de frais en attente', value: '5', note: '2 à valider aujourd’hui', noteCls: 'text-muted' },
  ]

  const cols = [
    { key: 'client', label: 'Client', bold: true },
    { key: 'cheque', label: 'N° chèque' },
    { label: 'Échéance', render: (r) => fmtDate(r.date), csv: (r) => fmtDate(r.date) },
    { label: 'Montant', align: 'right', bold: true, render: (r) => fmt(r.amount), csv: (r) => fmt(r.amount) },
    { label: 'Statut', render: (r) => <Badge tone={statusTone[r.status]}>{r.status}</Badge>, csv: (r) => r.status },
  ]

  return (
    <>
      <PageHeader title="Tableau de bord" subtitle="Situation du jour · données de démonstration">
        <Btn onClick={() => downloadCSV('paiements.csv', cols, payments)}>Exporter Excel</Btn>
        <Btn onClick={() => window.print()}>Exporter PDF</Btn>
        <Btn variant="primary" onClick={() => go('/paiements')}>+ Nouveau paiement</Btn>
      </PageHeader>

      <section className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
        {kpis.map((k) => (
          <Card key={k.label} className="flex flex-col gap-2">
            <span className="text-[13px] font-medium text-muted">{k.label}</span>
            <span className="text-[26px] font-bold">{k.value}</span>
            <span className={`text-xs font-semibold ${k.noteCls}`}>{k.note}</span>
          </Card>
        ))}
      </section>

      <section className="flex flex-wrap gap-4">
        <Card className="min-w-0 flex-[3_1_420px]">
          <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-base font-semibold">Impayés par ancienneté (MAD)</h2>
            <span className="text-[13px] text-muted">6 derniers mois</span>
          </div>
          <div className="flex h-56 items-end gap-4 border-b border-line px-2">
            {bars.map((b) => (
              <div key={b.label} className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-1.5">
                <span className="text-xs font-semibold">{Math.round(b.value / 1000)} k</span>
                <div
                  className="w-full max-w-[72px] rounded-t-lg"
                  style={{ height: `${(b.value / max) * 80}%`, background: b.color }}
                />
              </div>
            ))}
          </div>
          <div className="mt-2 flex gap-4 px-2">
            {bars.map((b) => (
              <span key={b.label} className="min-w-0 flex-1 text-center text-xs text-muted">{b.label}</span>
            ))}
          </div>
        </Card>

        <Card className="min-w-0 flex-[2_1_320px]">
          <div className="mb-2 flex items-baseline justify-between">
            <h2 className="text-base font-semibold">DLC proches</h2>
            <Link to="/stock" className="text-[13px] font-semibold text-brand">Voir le stock</Link>
          </div>
          {dlc.map((d) => (
            <div key={d.code} className="flex items-center justify-between gap-3 border-t border-[#EEF1F6] py-2.5">
              <div className="min-w-0">
                <div className="text-sm font-semibold">{d.name}</div>
                <div className="text-xs text-muted">{d.code} · {d.caisses} caisses</div>
              </div>
              <Badge tone={d.days < 30 ? 'red' : 'amber'}>{fmtDate(d.dlc)}</Badge>
            </div>
          ))}
        </Card>
      </section>

      <Card>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-base font-semibold">Derniers paiements</h2>
          <Link to="/paiements" className="text-[13px] font-semibold text-brand">Voir tous les paiements</Link>
        </div>
        <DataTable columns={cols} rows={payments} />
      </Card>
    </>
  )
}
