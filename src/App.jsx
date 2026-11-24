import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Paiements from './pages/Paiements.jsx'
import Stock from './pages/Stock.jsx'
import Retours from './pages/Retours.jsx'
import Clients from './pages/Clients.jsx'
import Notes from './pages/Notes.jsx'
import Historique from './pages/Historique.jsx'
import Assistant from './pages/Assistant.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/paiements" element={<Paiements />} />
        <Route path="/stock" element={<Stock />} />
        <Route path="/retours" element={<Retours />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/historique" element={<Historique />} />
        <Route path="/assistant" element={<Assistant />} />
      </Route>
    </Routes>
  )
}
