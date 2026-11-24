# Distrib Boissons — Dashboard (frontend démo)

React + Vite + Tailwind, données mockées (fausses) dans `src/data.js`.

## Lancer (Windows)

1. Dézipper le dossier, ouvrir CMD dedans.
2. `npm install`
3. `npm run dev`
4. Ouvrir http://localhost:5173 (page de connexion : /login)

## Écrans

- `/login` Connexion
- `/` Dashboard
- `/paiements` Paiements (chèques, factures liées, impayés)
- `/stock` Stock / Articles (DLC)
- `/retours` Retours marchandise (bon PDF via Imprimer > Enregistrer en PDF)
- `/clients` Clients
- `/notes` Notes de frais (barème + total automatique)
- `/historique` Historique

## Boutons

- Exporter Excel : télécharge un CSV qui s'ouvre dans Excel / WPS.
- Exporter PDF : ouvre l'impression, choisir « Enregistrer au format PDF ».

## Plus tard (backend)

Remplacer les imports de `src/data.js` par des appels API (Symfony ou Laravel + MySQL).
