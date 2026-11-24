import { useState } from 'react'
import { Card, Btn, Badge, Field, PageHeader, inputCls, statusTone } from '../components/ui.jsx'
import { retours } from '../data.js'

const today = new Date().toLocaleDateString('fr-FR')

export default function Retours() {
  const [list, setList] = useState(retours)
  const [f, setF] = useState({
    client: 'C33714 · Restaurant Les Dunes',
    ville: 'Essaouira',
    date: today,
    facture: '26022646',
    code: '1BCE05',
    article: 'Bière blonde 33 cl',
    unites: '360',
    obs: 'À remplacer par une autre référence. DLC : 02/03/2027. Cartons fermés.',
  })
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })

  const save = () =>
    setList([
      { client: f.client.split('·').pop().trim(), article: `${f.article} × ${f.unites}`, date: f.date, status: 'En attente' },
      ...list,
    ])

  return (
    <>
      <PageHeader title="Retours marchandise" subtitle="Demandes de retour et bons à imprimer · données de démonstration">
        <Btn variant="primary" onClick={save}>+ Ajouter à la liste</Btn>
      </PageHeader>

      <section className="flex flex-wrap items-start gap-4">
        <Card className="no-print flex min-w-0 flex-[3_1_420px] flex-col gap-4 !p-6">
          <h2 className="text-base font-semibold">Demande de retour marchandise</h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-3.5">
            <Field label="Client"><input className={inputCls} value={f.client} onChange={set('client')} /></Field>
            <Field label="Ville"><input className={inputCls} value={f.ville} onChange={set('ville')} /></Field>
            <Field label="Date"><input className={inputCls} value={f.date} onChange={set('date')} /></Field>
            <Field label="N° facture"><input className={inputCls} value={f.facture} onChange={set('facture')} /></Field>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-3.5">
            <Field label="Code article"><input className={inputCls} value={f.code} onChange={set('code')} /></Field>
            <Field label="Article"><input className={inputCls} value={f.article} onChange={set('article')} /></Field>
            <Field label="Unités"><input className={inputCls} value={f.unites} onChange={set('unites')} /></Field>
          </div>
          <Field label="Observations">
            <textarea rows={3} className={`${inputCls} h-auto py-3`} value={f.obs} onChange={set('obs')} />
          </Field>
          <div className="flex flex-wrap gap-2.5">
            <Btn variant="primary" onClick={() => window.print()}>Générer le bon PDF</Btn>
          </div>
        </Card>

        <div className="flex min-w-0 flex-[2_1_320px] flex-col gap-4">
          {/* Aperçu du bon : c'est ce bloc qui est imprimé en PDF */}
          <Card className="print-area">
            <div className="text-center text-sm font-bold">DISTRIB BOISSONS</div>
            <div className="mt-2 bg-[#C9D3EA] py-1.5 text-center text-xs font-bold tracking-wide">DEMANDE DE RETOUR MARCHANDISE</div>
            <dl className="mt-4 grid grid-cols-[100px_1fr] gap-y-1.5 text-sm">
              <dt className="font-semibold">Client :</dt><dd>{f.client}</dd>
              <dt className="font-semibold">Ville :</dt><dd>{f.ville}</dd>
              <dt className="font-semibold">Date :</dt><dd>{f.date}</dd>
              <dt className="font-semibold">N° facture :</dt><dd>{f.facture}</dd>
            </dl>
            <table className="mt-4 w-full border-collapse text-xs">
              <thead>
                <tr className="bg-[#C9D3EA]">
                  <th className="border border-[#9AA6C4] p-1.5">CODE</th>
                  <th className="border border-[#9AA6C4] p-1.5">ARTICLE</th>
                  <th className="border border-[#9AA6C4] p-1.5">UNITÉ</th>
                  <th className="border border-[#9AA6C4] p-1.5">OBSERVATIONS</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-[#9AA6C4] p-1.5 text-center">{f.code}</td>
                  <td className="border border-[#9AA6C4] p-1.5 text-center">{f.article}</td>
                  <td className="border border-[#9AA6C4] p-1.5 text-center">{f.unites}</td>
                  <td className="border border-[#9AA6C4] p-1.5">{f.obs}</td>
                </tr>
              </tbody>
            </table>
          </Card>

          <Card className="no-print">
            <h2 className="mb-2 text-base font-semibold">Retours récents</h2>
            {list.map((r, i) => (
              <div key={i} className="flex items-center justify-between gap-3 border-t border-[#EEF1F6] py-3">
                <div className="min-w-0">
                  <div className="text-sm font-semibold">{r.client}</div>
                  <div className="text-xs text-muted">{r.article} · {r.date}</div>
                </div>
                <Badge tone={statusTone[r.status]}>{r.status}</Badge>
              </div>
            ))}
          </Card>
        </div>
      </section>
    </>
  )
}
