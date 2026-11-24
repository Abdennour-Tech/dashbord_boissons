export const inputCls =
  'h-11 w-full rounded-[10px] border border-[#C9D0DE] bg-white px-3.5 text-sm text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand/20'

export const fmt = (n) =>
  Number(n).toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

export const fmtDate = (iso) => {
  const [y, m, d] = iso.split('-')
  return `${d}/${m}/${y}`
}

export function Card({ className = '', children }) {
  return <div className={`rounded-2xl border border-line bg-white p-5 ${className}`}>{children}</div>
}

export function Btn({ variant = 'outline', className = '', ...props }) {
  const v =
    variant === 'primary'
      ? 'bg-brand text-white border-transparent hover:opacity-90'
      : 'bg-white text-ink border-[#C9D0DE] hover:bg-surface'
  return (
    <button
      type="button"
      {...props}
      className={`h-11 cursor-pointer rounded-[10px] border px-4 text-sm font-semibold ${v} ${className}`}
    />
  )
}

const tones = {
  blue: 'bg-[#E3EBFF] text-[#1B3FA0]',
  green: 'bg-[#DCF5E6] text-[#0B5B2E]',
  red: 'bg-[#FDE7E4] text-[#912018]',
  amber: 'bg-[#FEF0D6] text-[#7A4A06]',
  purple: 'bg-[#EDE7F9] text-[#4A2A8C]',
}

export function Badge({ tone = 'blue', children }) {
  return (
    <span className={`inline-block whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${tones[tone]}`}>
      {children}
    </span>
  )
}

export const statusTone = {
  'À encaisser': 'blue',
  Encaissé: 'green',
  Impayé: 'red',
  Accepté: 'green',
  'En attente': 'amber',
  Refusé: 'red',
  Actif: 'green',
  'À surveiller': 'amber',
  Nouveau: 'blue',
  OK: 'green',
  'DLC proche': 'amber',
  Critique: 'red',
}

export function Field({ label, children, className = '' }) {
  return (
    <label className={`flex flex-col gap-1 text-xs font-semibold text-muted ${className}`}>
      {label}
      {children}
    </label>
  )
}

export function PageHeader({ title, subtitle, children }) {
  return (
    <header className="no-print flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="mt-1 text-sm text-muted">{subtitle}</p>
      </div>
      <div className="flex flex-wrap gap-2.5">{children}</div>
    </header>
  )
}

export function DataTable({ columns, rows, minWidth = 640 }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm" style={{ minWidth }}>
        <thead>
          <tr className="text-left text-xs text-muted">
            {columns.map((c) => (
              <th key={c.label} className={`px-2 py-2.5 font-semibold ${c.align === 'right' ? 'text-right' : ''}`}>
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-[#EEF1F6]">
              {columns.map((c) => (
                <td key={c.label} className={`px-2 py-3.5 ${c.align === 'right' ? 'text-right' : ''} ${c.bold ? 'font-semibold' : ''}`}>
                  {c.render ? c.render(r) : r[c.key]}
                </td>
              ))}
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="px-2 py-8 text-center text-muted">
                Aucun résultat
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

// Export "Excel" : fichier CSV (séparateur ;) qui s'ouvre directement dans Excel / WPS.
export function downloadCSV(filename, columns, rows) {
  const head = columns.map((c) => c.label).join(';')
  const body = rows
    .map((r) =>
      columns
        .map((c) => {
          const v = c.csv ? c.csv(r) : r[c.key]
          return `"${String(v ?? '').replace(/"/g, '""')}"`
        })
        .join(';')
    )
    .join('\n')
  const blob = new Blob(['﻿' + head + '\n' + body], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
