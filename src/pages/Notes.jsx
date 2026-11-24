import { useState } from 'react'
import { Card, Btn, Badge, DataTable, Field, PageHeader, inputCls, fmt, downloadCSV } from '../components/ui.jsx'
import { bareme } from '../data.js'

export default function Notes() {
  const [info, setInfo] = useState({ objet: 'Réunion siège', benef: 'Employé démo', cat: '2', periode: '11/02/2026' })
  const [lines, setLines] = useState([
    { rubrique: 'Déjeuner', amount: 150 },
    { rubrique: 'Dîner', amount: 200 },
    { rubrique: 'Hôtel', amount: 750 },
    { rubrique: 'Péage', amount: 80 },
  ])
  const [advance, setAdvance] = useState(500)
  const [draft, setDraft] = useState({ rubrique: 'Déjeuner', amount: '' })
  const [sent, setSent] = useState(false)

  const table = bareme[info.cat]
  const total = lines.reduce((s, l) => s + l.amount, 0)

  const cols = [
    { key: 'rubrique', label: 'Rubrique', bold: true },
    {
      label: 'Barème',
      align: 'right',
      render: (r) => (table[r.rubrique] ? `max ${table[r.rubrique]}` : 'à l’identique'),
      csv: (r) => table[r.rubrique] ?? 'identique',
    },
    { label: 'Montant', align: 'right', bold: true, render: (r) => fmt(r.amount), csv: (r) => fmt(r.amount) },
    {
      label: 'Contrôle',
      render: (r) =>
        table[r.rubrique] && r.amount > table[r.rubrique] ? (
          <Badge tone="red">Dépassement</Badge>
        ) : (
          <Badge tone="green">Conforme</Badge>
        ),
      csv: (r) => (table[r.rubrique] && r.amount > table[r.rubrique] ? 'Dépassement' : 'Conforme'),
    },
  ]

  const add = (e) => {
    e.preventDefault()
    const v = Number(draft.amount)
    if (!v) return
    setLines([...lines, { rubrique: draft.rubrique, amount: v }])
    setDraft({ ...draft, amount: '' })
  }

  return (
    <>
      <PageHeader title="Notes de frais" subtitle="Saisie, barème automatique et validation · données de démonstration">
        <Btn onClick={() => downloadCSV('note-de-frais.csv', cols, lines)}>Exporter Excel</Btn>
        <Btn onClick={() => window.print()}>Imprimer en PDF</Btn>
      </PageHeader>

      <Card className="no-print !p-6">
        <h2 className="mb-4 text-base font-semibold">Informations de la mission</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3.5">
          <Field label="Objet"><input className={inputCls} value={info.objet} onChange={(e) => setInfo({ ...info, objet: e.target.value })} /></Field>
          <Field label="Bénéficiaire"><input className={inputCls} value={info.benef} onChange={(e) => setInfo({ ...info, benef: e.target.value })} /></Field>
          <Field label="Catégorie">
            <select className={inputCls} value={info.cat} onChange={(e) => setInfo({ ...info, cat: e.target.value })}>
              {['1', '2', '3'].map((c) => <option key={c} value={c}>Catégorie {c}</option>)}
            </select>
          </Field>
          <Field label="Période"><input className={inputCls} value={info.periode} onChange={(e) => setInfo({ ...info, periode: e.target.value })} /></Field>
        </div>
      </Card>

      <section className="flex flex-wrap items-start gap-4">
        <Card className="print-area min-w-0 flex-[3_1_440px]">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2.5">
            <div>
              <h2 className="text-base font-semibold">Dépenses</h2>
              <p className="text-xs text-muted">{info.objet} · {info.benef} · catégorie {info.cat} · {info.periode}</p>
            </div>
          </div>
          <form onSubmit={add} className="no-print mb-3 flex flex-wrap items-end gap-2.5">
            <Field label="Rubrique" className="flex-[1_1_160px]">
              <select className={inputCls} value={draft.rubrique} onChange={(e) => setDraft({ ...draft, rubrique: e.target.value })}>
                {Object.keys(table).map((r) => <option key={r}>{r}</option>)}
              </select>
            </Field>
            <Field label="Montant (MAD)" className="flex-[1_1_140px]">
              <input type="number" className={inputCls} value={draft.amount} onChange={(e) => setDraft({ ...draft, amount: e.target.value })} />
            </Field>
            <Btn type="submit">+ Ajouter une ligne</Btn>
          </form>
          <DataTable columns={cols} rows={lines} minWidth={520} />
        </Card>

        <div className="flex min-w-0 flex-[2_1_300px] flex-col gap-4">
          <Card className="flex flex-col gap-3">
            <h2 className="text-base font-semibold">Récapitulatif</h2>
            <div className="flex justify-between text-sm"><span className="text-muted">Total</span><span className="font-semibold">{fmt(total)} MAD</span></div>
            <div className="flex items-center justify-between gap-3 text-sm">
              <span className="text-muted">Avance reçue</span>
              <input type="number" className={`${inputCls} !w-32 text-right`} value={advance} onChange={(e) => setAdvance(Number(e.target.value))} />
            </div>
            <div className="flex justify-between border-t border-[#EEF1F6] pt-3 text-base">
              <span className="font-semibold">Reste à rembourser</span>
              <span className="font-bold text-brand">{fmt(total - advance)} MAD</span>
            </div>
            <Btn variant="primary" onClick={() => setSent(true)} className="no-print">
              {sent ? 'Envoyée pour validation ✓' : 'Envoyer pour validation'}
            </Btn>
          </Card>

          <Card className="no-print">
            <h2 className="mb-2 text-base font-semibold">Barème (catégorie {info.cat})</h2>
            {Object.entries(table).map(([k, v]) => (
              <div key={k} className="flex justify-between border-t border-[#EEF1F6] py-2 text-sm">
                <span>{k}</span>
                <span className="font-semibold">{v ?? 'à l’identique'}</span>
              </div>
            ))}
            <div className="flex justify-between border-t border-[#EEF1F6] py-2 text-sm">
              <span>Indemnité km (cat. 1 sans carte carburant)</span>
              <span className="font-semibold">1,30 MAD/km</span>
            </div>
          </Card>
        </div>
      </section>
    </>
  )
}
