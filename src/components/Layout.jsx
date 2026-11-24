import { NavLink, Outlet, Link } from 'react-router-dom'
import { nav } from '../data.js'

export default function Layout() {
  return (
    <div className="min-h-screen lg:flex">
      <aside className="no-print flex flex-col gap-3 border-b border-line bg-white p-4 lg:w-60 lg:shrink-0 lg:gap-6 lg:border-b-0 lg:border-r lg:p-5">
        <div className="flex items-center gap-2.5 px-1">
          <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-brand font-bold text-white">DB</div>
          <div className="flex flex-col">
            <span className="text-[15px] font-bold">Distrib Boissons</span>
            <span className="text-xs text-muted">Gestion commerciale</span>
          </div>
        </div>

        <nav className="flex gap-1 overflow-x-auto lg:flex-col">
          {nav.map(([to, label]) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `whitespace-nowrap rounded-[10px] px-3.5 py-3 text-sm ${
                  isActive ? 'bg-brand font-semibold text-white' : 'font-medium text-ink hover:bg-surface'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto hidden rounded-xl bg-surface p-3 lg:block">
          <div className="text-[13px] font-semibold">Utilisateur démo</div>
          <div className="text-xs text-muted">Responsable recouvrement</div>
          <Link to="/login" className="mt-2 inline-block text-xs font-semibold text-brand">
            Se déconnecter
          </Link>
        </div>
      </aside>

      <main className="flex min-w-0 flex-1 flex-col gap-6 p-4 sm:p-8">
        <Outlet />
      </main>
    </div>
  )
}
