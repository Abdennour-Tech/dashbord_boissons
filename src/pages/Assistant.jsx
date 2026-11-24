import { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { Card, Btn, Badge, Field, PageHeader, inputCls, fmt } from '../components/ui.jsx'
import { clientNames } from '../aiData.js'
import { parseRequest } from '../lib/mockAI.js'

const KEY = 'db_documents'
const load = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || []
  } catch {
    return []
  }
}
const store = (docs) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(docs))
  } catch {
    /* ignore */
  }
}

const TVA = 0.2
const totals = (lines) => {
  const ht = lines.reduce((s, l) => s + l.qty * l.prix, 0)
  return { ht, tva: ht * TVA, ttc: ht * (1 + TVA) }
}
const qrValue = (d) => `DISTRIB-BOISSONS|${d.id}|${d.client}|${d.ttc.toFixed(2)}`

const suggestions = [
  "Dir facture l Restaurant Les Dunes, 20 caisses bière w 10 caisses eau",
  'Fais une facture pour Hôtel Atlas, 15 caisses tonic et 8 caisses ginger',
  'Dir facture l Traiteur Soleil 30 caisses soda',
]

export default function Assistant() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Salam ! Goul liya chno bghiti (b darija wla français), w ana nsawb lik l-brouillon.' },
  ])
  const [draft, setDraft] = useState(null)
  const [saved, setSaved] = useState(null)
  const [docs, setDocs] = useState(load)

  const send = (text) => {
    const t = text.trim()
    if (!t) return
    const r = parseRequest(t)
    const next = [...messages, { role: 'user', text: t }]
    if (r.lines.length === 0) {
      next.push({ role: 'ai', text: 'Ma fhemt-ch chno l-articles. 3awd gol liya: smiyt l-client w l-caisses (mital: "20 caisses bière").' })
      setMessages(next)
    } else {
      next.push({
        role: 'ai',
        text: r.client
          ? 'Hak l-brouillon. Chouf-o w ila kan s7i7, dghat 3la Valider.'
          : 'Hak l-brouillon, walakin ma l9it-ch l-client. Khtar-o mn l-liste.',
      })
      setMessages(next)
      setDraft({ client: r.client, lines: r.lines, editing: false })
      setSaved(null)
    }
    setInput('')
  }

  const setLine = (i, k, v) =>
    setDraft({ ...draft, lines: draft.lines.map((l, j) => (j === i ? { ...l, [k]: Number(v) || 0 } : l)) })
  const removeLine = (i) => setDraft({ ...draft, lines: draft.lines.filter((_, j) => j !== i) })

  const valider = () => {
    const n = Math.max(0, ...docs.map((d) => Number(d.id.split('-')[2]))) + 1
    const t = totals(draft.lines)
    const doc = {
      id: `FA-2026-${String(n).padStart(4, '0')}`,
      client: draft.client,
      lines: draft.lines,
      ...t,
      date: new Date().toLocaleDateString('fr-FR'),
    }
    const all = [doc, ...docs]
    setDocs(all)
    store(all)
    setSaved(doc)
    setDraft(null)
    setMessages([...messages, { role: 'ai', text: `Tsjelt l-facture ${doc.id} f l-système b QR code.` }])
  }

  const deleteDoc = (id) => {
    const all = docs.filter((d) => d.id !== id)
    setDocs(all)
    store(all)
    if (saved?.id === id) setSaved(null)
  }

  const t = draft ? totals(draft.lines) : null

  return (
    <>
      <PageHeader title="Assistant IA" subtitle="Parlez ou écrivez, l'IA prépare le document, vous vérifiez puis validez · réponses simulées (démo)" />

      <section className="flex flex-wrap items-start gap-4">
        <Card className="no-print flex min-w-0 flex-[2_1_340px] flex-col gap-4">
          <div className="flex max-h-[360px] flex-col gap-3 overflow-y-auto pr-1">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[90%] rounded-2xl px-4 py-2.5 text-sm ${
                  m.role === 'user' ? 'self-end bg-brand text-white' : 'self-start bg-surface text-ink'
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => send(s)}
                className="cursor-pointer rounded-full border border-[#C9D0DE] bg-white px-3 py-2 text-left text-xs font-medium hover:bg-surface"
              >
                {s}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              send(input)
            }}
            className="flex gap-2"
          >
            <input
              className={inputCls}
              placeholder="Mital : dir facture l Hôtel Atlas, 15 caisses tonic…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Btn variant="primary" type="submit">Envoyer</Btn>
          </form>
        </Card>

        <div className="flex min-w-0 flex-[3_1_420px] flex-col gap-4">
          {draft && (
            <Card className="no-print flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-base font-semibold">Brouillon de facture</h2>
                <Badge tone="amber">À vérifier</Badge>
              </div>

              <Field label="Client">
                {draft.editing || !draft.client ? (
                  <select className={inputCls} value={draft.client} onChange={(e) => setDraft({ ...draft, client: e.target.value })}>
                    <option value="">— Choisir un client —</option>
                    {clientNames.map((c) => <option key={c}>{c}</option>)}
                  </select>
                ) : (
                  <span className="text-base font-semibold text-ink">{draft.client}</span>
                )}
              </Field>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[460px] border-collapse text-sm">
                  <thead>
                    <tr className="text-left text-xs text-muted">
                      <th className="px-2 py-2 font-semibold">Article</th>
                      <th className="px-2 py-2 text-right font-semibold">Caisses</th>
                      <th className="px-2 py-2 text-right font-semibold">Prix / caisse</th>
                      <th className="px-2 py-2 text-right font-semibold">Total</th>
                      {draft.editing && <th />}
                    </tr>
                  </thead>
                  <tbody>
                    {draft.lines.map((l, i) => (
                      <tr key={i} className="border-t border-[#EEF1F6]">
                        <td className="px-2 py-3 font-semibold">{l.article}</td>
                        <td className="px-2 py-3 text-right">
                          {draft.editing ? (
                            <input type="number" className={`${inputCls} !h-9 !w-20 text-right`} value={l.qty} onChange={(e) => setLine(i, 'qty', e.target.value)} />
                          ) : (
                            l.qty
                          )}
                        </td>
                        <td className="px-2 py-3 text-right">
                          {draft.editing ? (
                            <input type="number" className={`${inputCls} !h-9 !w-24 text-right`} value={l.prix} onChange={(e) => setLine(i, 'prix', e.target.value)} />
                          ) : (
                            fmt(l.prix)
                          )}
                        </td>
                        <td className="px-2 py-3 text-right font-semibold">{fmt(l.qty * l.prix)}</td>
                        {draft.editing && (
                          <td className="px-2 py-3 text-right">
                            <button type="button" onClick={() => removeLine(i)} className="cursor-pointer text-xs font-semibold text-[#912018]">
                              Retirer
                            </button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="ml-auto flex w-full max-w-[280px] flex-col gap-1.5 text-sm">
                <div className="flex justify-between"><span className="text-muted">Total HT</span><span>{fmt(t.ht)} MAD</span></div>
                <div className="flex justify-between"><span className="text-muted">TVA 20 %</span><span>{fmt(t.tva)} MAD</span></div>
                <div className="flex justify-between border-t border-[#EEF1F6] pt-2 text-base font-bold"><span>Total TTC</span><span className="text-brand">{fmt(t.ttc)} MAD</span></div>
              </div>

              <div className="flex flex-wrap gap-2.5">
                <Btn onClick={() => setDraft({ ...draft, editing: !draft.editing })}>
                  {draft.editing ? 'Terminer la modification' : 'Modifier'}
                </Btn>
                <Btn
                  onClick={() => {
                    setDraft(null)
                    setMessages([...messages, { role: 'ai', text: 'Brouillon msse7. Gol liya chno bghiti nsawb.' }])
                  }}
                  className="!border-[#F2B8B0] !text-[#912018]"
                >
                  Supprimer
                </Btn>
                <Btn variant="primary" onClick={valider} disabled={!draft.client || draft.lines.length === 0} className="disabled:opacity-40">
                  Valider et enregistrer
                </Btn>
              </div>
            </Card>
          )}

          {saved && (
            <Card className="print-area flex flex-col gap-4 !border-[#9AD8B4]">
              <div className="no-print flex items-center gap-2">
                <Badge tone="green">Enregistrée dans le système</Badge>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold text-muted">N° de facture (ID)</div>
                  <div className="text-2xl font-bold">{saved.id}</div>
                  <div className="mt-1 text-sm">{saved.client}</div>
                  <div className="text-xs text-muted">{saved.date}</div>
                  <div className="mt-2 text-lg font-bold text-brand">{fmt(saved.ttc)} MAD TTC</div>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <QRCodeSVG value={qrValue(saved)} size={120} />
                  <span className="text-[11px] text-muted">Scanner pour vérifier</span>
                </div>
              </div>
              <div className="no-print flex flex-wrap gap-2.5">
                <Btn onClick={() => window.print()}>Imprimer / PDF</Btn>
                <Btn onClick={() => setSaved(null)}>Fermer</Btn>
              </div>
            </Card>
          )}

          {!draft && !saved && (
            <Card className="no-print text-sm text-muted">
              Le brouillon ghadi yban hna mni t-ssift talab l-l'assistant.
            </Card>
          )}
        </div>
      </section>

      <Card className="no-print">
        <h2 className="mb-3 text-base font-semibold">Documents enregistrés</h2>
        {docs.length === 0 && <p className="py-4 text-sm text-muted">Hta wa7ed l-facture mssjla.</p>}
        {docs.map((d) => (
          <div key={d.id} className="flex flex-wrap items-center gap-4 border-t border-[#EEF1F6] py-3">
            <QRCodeSVG value={qrValue(d)} size={48} />
            <div className="min-w-[160px] flex-1">
              <div className="text-sm font-bold">{d.id}</div>
              <div className="text-xs text-muted">{d.client} · {d.date}</div>
            </div>
            <div className="text-sm font-semibold">{fmt(d.ttc)} MAD</div>
            <div className="flex gap-2">
              <Btn className="!h-9" onClick={() => setSaved(d)}>Ouvrir</Btn>
              <Btn className="!h-9 !text-[#912018]" onClick={() => deleteDoc(d.id)}>Supprimer</Btn>
            </div>
          </div>
        ))}
      </Card>
    </>
  )
}
