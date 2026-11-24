// Données de démonstration (fausses). À remplacer plus tard par l'API du backend.

export const nav = [
  ['/', 'Dashboard'],
  ['/paiements', 'Paiements'],
  ['/stock', 'Stock / Articles'],
  ['/retours', 'Retours marchandise'],
  ['/clients', 'Clients'],
  ['/notes', 'Notes de frais'],
  ['/historique', 'Historique'],
  ['/assistant', 'Assistant IA'],
]

export const bars = [
  { label: 'Non échu', value: 412300, color: '#2457D6' },
  { label: '+ 30 j', value: 286900, color: '#5B7FE0' },
  { label: '+ 60 j', value: 338700, color: '#D9822B' },
  { label: '+ 90 j', value: 246660, color: '#C0392B' },
]

export const payments = [
  { id: 1, client: 'Restaurant Le Jardin', cheque: '308755', date: '2026-12-15', amount: 181179.84, status: 'À encaisser' },
  { id: 2, client: 'Hôtel Atlas Démo', cheque: '308756', date: '2026-12-30', amount: 150606.0, status: 'À encaisser' },
  { id: 3, client: 'Café de la Corniche', cheque: '412093', date: '2026-10-19', amount: 23745.6, status: 'Encaissé' },
  { id: 4, client: 'Riad Les Palmiers', cheque: '412077', date: '2026-10-12', amount: 98359.15, status: 'Impayé' },
  { id: 5, client: 'Traiteur Soleil', cheque: '511820', date: '2026-11-02', amount: 62461.44, status: 'Encaissé' },
]

export const chequeLines = [
  { cheque: '308755', client: 'Restaurant Le Jardin', facture: 'FA-26021351', amount: 20116.8, status: 'À encaisser' },
  { cheque: '308755', client: 'Restaurant Le Jardin', facture: 'FA-26021573', amount: 80185.2, status: 'À encaisser' },
  { cheque: '308756', client: 'Hôtel Atlas Démo', facture: 'FA-26022969', amount: 19908.0, status: 'À encaisser' },
  { cheque: '308756', client: 'Hôtel Atlas Démo', facture: 'FA-26023186', amount: 30771.6, status: 'À encaisser' },
  { cheque: '412093', client: 'Café de la Corniche', facture: 'FA-26020856', amount: 2651.4, status: 'Encaissé' },
  { cheque: '412077', client: 'Riad Les Palmiers', facture: 'FA-26008969', amount: 1792.8, status: 'Impayé' },
  { cheque: '511820', client: 'Traiteur Soleil', facture: 'FA-26023067', amount: 6890.4, status: 'Encaissé' },
]

export const debts = [
  { client: 'Groupe Nuit Démo', amount: 6180656.24, color: '#C0392B', comment: 'Groupe · suivi en cours' },
  { client: 'Riad Les Agdalines', amount: 1558466.38, color: '#C0392B', comment: 'Contentieux' },
  { client: 'Hôtel Malta Démo', amount: 791103.12, color: '#D9822B', comment: 'Chèque prévu lundi' },
  { client: 'Casa Emma Démo', amount: 757213.3, color: '#D9822B', comment: 'Contentieux' },
  { client: 'Park Palmeraie Démo', amount: 619173.6, color: '#2457D6', comment: 'Stand by' },
]

export const stock = [
  { code: 'EAU05', name: 'Eau minérale 150 cl', colisage: 6, qty: 4768, caisses: 795, dlc: '2028-04-20' },
  { code: 'EAU10', name: 'Eau minérale 100 cl', colisage: 12, qty: 13909, caisses: 1159, dlc: '2028-04-27' },
  { code: 'EAU20', name: 'Eau minérale 33 cl', colisage: 24, qty: 37752, caisses: 1573, dlc: '2028-03-31' },
  { code: 'TON15', name: 'Tonic méditerranéen 20 cl', colisage: 24, qty: 7075, caisses: 295, dlc: '2026-11-30' },
  { code: 'SOD25', name: 'Pink grapefruit 20 cl', colisage: 24, qty: 24192, caisses: 1008, dlc: '2026-12-31' },
  { code: 'GIN05', name: 'Ginger ale 20 cl', colisage: 24, qty: 43872, caisses: 1828, dlc: '2027-02-28' },
  { code: 'ENE10', name: 'Boisson énergisante 25 cl', colisage: 24, qty: 16107, caisses: 671, dlc: '2027-02-10' },
  { code: 'BIE05', name: 'Bière blonde 33 cl', colisage: 24, qty: 8640, caisses: 360, dlc: '2027-03-02' },
]

export const retours = [
  { client: 'Restaurant Les Dunes', article: 'Bière 33 cl × 360', date: '29/09/2026', status: 'Accepté' },
  { client: 'Hôtel Atlas Démo', article: 'Tonic 20 cl × 120', date: '14/10/2026', status: 'En attente' },
  { client: 'Café de la Corniche', article: 'Eau 33 cl × 48', date: '02/11/2026', status: 'Refusé' },
  { client: 'Traiteur Soleil', article: 'Soda 20 cl × 72', date: '10/11/2026', status: 'Accepté' },
]

export const clients = [
  { code: 'C41873', name: 'Hôtel Atlas Démo', canal: 'CHR', rep: 'Marrakech Médina', first: '12/01/2026', balance: 181179.84, status: 'Actif' },
  { code: 'C42530', name: 'Riad Les Palmiers', canal: 'CHR', rep: 'Marrakech Palmeraie', first: '01/04/2026', balance: 98359.15, status: 'À surveiller' },
  { code: 'C33714', name: 'Restaurant Les Dunes', canal: 'CHR', rep: 'Casa Corniche', first: '06/04/2026', balance: 23745.6, status: 'Actif' },
  { code: 'C63408', name: 'Café de la Corniche', canal: 'CHR', rep: 'Casa Corniche', first: '24/03/2026', balance: 0, status: 'Actif' },
  { code: 'C63750', name: 'Traiteur Soleil', canal: 'GMS', rep: 'Agadir Sud', first: '10/04/2026', balance: 62461.44, status: 'À surveiller' },
  { code: 'C66012', name: 'Bistrot du Port', canal: 'CHR', rep: 'Agadir Sud', first: '18/11/2026', balance: 0, status: 'Nouveau' },
  { code: 'C66027', name: 'Pizzeria Atlantique', canal: 'CHR', rep: 'Casa Corniche', first: '20/11/2026', balance: 0, status: 'Nouveau' },
]

// Barème par catégorie (plafonds par rubrique). null = facturation à l'identique.
export const bareme = {
  1: { Hôtel: 500, Déjeuner: 100, Dîner: 150, 'Tournée nocturne': null, Péage: null, Train: null },
  2: { Hôtel: 750, Déjeuner: 150, Dîner: 200, 'Tournée nocturne': 300, Péage: null, Train: null },
  3: { Hôtel: 1300, Déjeuner: 200, Dîner: 300, 'Tournée nocturne': 350, Péage: null, Train: null },
}

export const events = [
  { module: 'Paiements', action: 'Chèque 308755 enregistré', detail: 'Restaurant Le Jardin · 181 179,84 MAD · 5 factures liées', user: 'Utilisateur démo', time: "Aujourd'hui 11:21" },
  { module: 'Stock', action: 'Alerte DLC créée', detail: 'Tonic méditerranéen 20 cl · DLC 30/11/2026', user: 'Système', time: "Aujourd'hui 08:00" },
  { module: 'Retours', action: 'Bon de retour généré (PDF)', detail: 'Restaurant Les Dunes · facture 26022646 · 360 unités', user: 'Utilisateur démo', time: 'Hier 16:42' },
  { module: 'Clients', action: 'Nouveau client créé', detail: 'Bistrot du Port · canal CHR · Agadir Sud', user: 'Commercial démo', time: 'Hier 10:05' },
  { module: 'Notes de frais', action: 'Note envoyée pour validation', detail: 'Réunion siège · total 1 300,00 MAD', user: 'Employé démo', time: '21/11/2026 17:30' },
  { module: 'Paiements', action: 'Chèque 412077 passé en impayé', detail: 'Riad Les Palmiers · 98 359,15 MAD', user: 'Utilisateur démo', time: '20/11/2026 14:12' },
  { module: 'Stock', action: 'Import Excel du stock', detail: '46 articles mis à jour', user: 'Utilisateur démo', time: '19/11/2026 09:48' },
]
