import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { inputCls } from '../components/ui.jsx'

const chips = ['Paiements', 'Stock & DLC', 'Retours PDF', 'Notes de frais']

export default function Login() {
  const nav = useNavigate()
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')

  const submit = (e) => {
    e.preventDefault()
    // Démo : accepte tout. Plus tard : appel API d'authentification.
    nav('/')
  }

  return (
    <div className="flex min-h-screen flex-wrap">
      <section className="flex min-w-0 basis-full flex-col justify-between gap-8 bg-ink p-6 text-white md:basis-[440px] md:flex-1 md:p-14">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand text-lg font-bold">DB</div>
          <span className="text-lg font-bold">Distrib Boissons</span>
        </div>
        <div className="flex max-w-[480px] flex-col gap-5">
          <h1 className="text-3xl font-bold leading-tight md:text-4xl">Tout votre suivi commercial, au même endroit.</h1>
          <p className="leading-relaxed text-[#C5CCDB]">
            Paiements, stock, retours et notes de frais : plus besoin de ressaisir dans Excel ou en PDF. Tout est
            enregistré, daté et exportable.
          </p>
          <div className="flex flex-wrap gap-2.5">
            {chips.map((c) => (
              <span key={c} className="rounded-full bg-[#22325A] px-3.5 py-2 text-[13px] font-semibold">
                {c}
              </span>
            ))}
          </div>
        </div>
        <span className="text-[13px] text-[#C5CCDB]">© 2026 Distrib Boissons · Version de démonstration</span>
      </section>

      <section className="flex min-w-0 basis-full items-center justify-center bg-surface p-5 md:basis-[440px] md:flex-1 md:p-8">
        <form onSubmit={submit} className="flex w-full max-w-[400px] flex-col gap-5 rounded-[18px] border border-line bg-white p-8">
          <div>
            <h2 className="text-2xl font-bold">Connexion</h2>
            <p className="mt-1.5 text-sm text-muted">Entrez vos identifiants pour accéder au tableau de bord.</p>
          </div>

          <label className="flex flex-col gap-1.5 text-[13px] font-semibold">
            Adresse email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="prenom.nom@societe.ma"
              autoComplete="email"
              className={inputCls}
            />
          </label>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="pwd" className="text-[13px] font-semibold">Mot de passe</label>
              <a href="#" className="text-[13px] font-semibold text-brand">Mot de passe oublié ?</a>
            </div>
            <div className="flex items-center gap-2 rounded-[10px] border border-[#C9D0DE] bg-white pl-3.5 pr-1.5 focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/20">
              <input
                id="pwd"
                type={show ? 'text' : 'password'}
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                placeholder="Votre mot de passe"
                autoComplete="current-password"
                className="h-11 min-w-0 flex-1 bg-transparent text-sm outline-none"
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="h-9 cursor-pointer rounded-lg bg-surface px-3 text-[13px] font-semibold"
              >
                {show ? 'Masquer' : 'Afficher'}
              </button>
            </div>
          </div>

          <label className="flex items-center gap-2.5 text-sm">
            <input type="checkbox" defaultChecked className="h-[18px] w-[18px] accent-brand" />
            Rester connecté sur cet appareil
          </label>

          <button type="submit" className="h-12 cursor-pointer rounded-[10px] bg-brand font-semibold text-white hover:opacity-90">
            Se connecter
          </button>
          <p className="text-center text-[13px] text-muted">Un problème d'accès ? Contactez l'administrateur.</p>
        </form>
      </section>
    </div>
  )
}
