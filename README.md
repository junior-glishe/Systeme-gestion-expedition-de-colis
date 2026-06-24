# TrackPulse — Frontend de Suivi des Expéditions de Colis

Application **React 18 + Vite** pour la gestion et le suivi des expéditions de colis par transport routier.
Le backend est prévu en **Laravel + PostgreSQL** et est consommé via une API REST. Cette application est uniquement le **frontend** : aucune base de données n'est embarquée.

##  Fonctionnalités

L'application implémente fidèlement les diagrammes UML fournis (contexte, cas d'utilisation, classes) :

### Acteurs et modules

| Rôle | Module | Principales fonctionnalités |
|------|--------|------------------------------|
| **Administrateur** | `/admin` | Tableau de bord, gestion des comptes, agences, véhicules, chauffeurs, trajets, tarifs, rapports, paramètres, notifications |
| **Agent d'expédition** | `/agent` | Enregistrer clients, enregistrer colis, créer expéditions, encaisser paiements, rechercher un colis, consulter l'historique |
| **Chauffeur** | `/chauffeur` | Consulter colis affectés, marquer le statut, consulter les trajets, signaler un incident |

### Routes publiques
- `/` — Landing page (Hero, Features, Technology, Steps, Metrics, Testimonials, CTA, Footer)
- `/login` — Connexion (formulaire validé avec Zod)
- `/register` — Demande d'inscription
- `/unauthorized` — Accès refusé
- `*` — Page 404

##  Démarrage rapide

```bash
# 1. Installation
bun install        # ou npm install / pnpm install

# 2. Variables d'environnement
cp .env.example .env
# Éditer VITE_API_URL pour pointer vers votre API Laravel

# 3. Lancer en développement
bun run dev        # http://localhost:5173

# 4. Build de production
bun run build
bun run preview
```

##  Sécurité

L'application applique plusieurs couches de sécurité côté client :

1. **Authentification JWT** : token stocké en `localStorage` (namespace `tp_`), injecté automatiquement par un intercepteur Axios.
2. **Gestion 401** : l'intercepteur de réponse purge la session et redirige vers `/login` à toute réponse 401.
3. **RBAC (Role-Based Access Control)** : composant `<ProtectedRoute roles={[...]}>` qui filtre les routes par rôle.
4. **Validation Zod** : tous les formulaires sont validés contre des schémas (`src/schemas/index.js`) avant envoi.
5. **Limites de longueur** : tous les `<input>` ont un `maxLength` explicite (255 par défaut, 128 pour les mots de passe, 1000 pour les textarea).
6. **Sanitization XSS** : utilitaire `sanitizeHtml` (DOMPurify) et `escapeText` dans `src/utils/security.js`. **L'application n'utilise jamais `dangerouslySetInnerHTML`**.
7. **Politique de mot de passe** : minimum 8 caractères, 1 majuscule, 1 chiffre (côté client). À renforcer côté Laravel.
8. **Timeout des requêtes** : 15 s par défaut sur Axios.
9. **Pas de secret en clair** : aucune clé d'API n'est embarquée dans le bundle.

### À configurer côté backend Laravel

- CORS restreint au domaine du frontend
- HTTPS obligatoire en production
- Rate limiting sur `/auth/login` (par exemple `throttle:5,1`)
- Cookies HttpOnly + SameSite=Strict si vous migrez vers une auth par cookie de session
- CSRF si vous passez en auth cookie
- Hash bcrypt/argon2 des mots de passe
- Vérification des rôles côté serveur sur **toutes** les routes (ne jamais se fier au RBAC client seul)

##  Architecture

Voir [`ARCHITECTURE.md`](./ARCHITECTURE.md) pour la cartographie complète.

```
src/
├── assets/                  # Images de la landing
├── components/
│   ├── common/              # Composants UI réutilisables (Button, Input, CrudPage…)
│   ├── landing/             # Sections de la landing page
│   ├── layout/              # AdminLayout, AgentLayout, ChauffeurLayout, Navbar
│   └── sidebar/             # Sidebar + menus par rôle
├── contexts/
│   └── AuthContext.jsx      # Session, login/logout, hasRole(), ROLES
├── pages/
│   ├── Admin/               # 16 pages admin (CRUD + rapports + dashboard)
│   ├── Agent/               # 7 pages agent
│   ├── Chauffeur/           # Dashboard, colis, trajets, incident
│   ├── Auth/                # Login, Register
│   ├── NotFound.jsx
│   └── Unauthorized.jsx
├── routes/
│   └── ProtectedRoute.jsx   # Garde de route par rôle
├── schemas/
│   └── index.js             # Validations Zod (login, client, colis, expédition…)
├── services/
│   ├── api.js               # Instance Axios + intercepteurs JWT
│   ├── auth.service.js
│   └── *.service.js         # Un service par entité du diagramme de classe
├── utils/
│   ├── storage.js           # Wrapper localStorage namespacé
│   ├── security.js          # sanitizeHtml, escapeText
│   └── format.js            # formatDate, formatMoney, formatKg
├── App.jsx                  # Routes + ProtectedRoute
├── main.jsx                 # Entrée + AuthProvider + Toaster
└── styles.css               # Tailwind + design tokens
```

## 🔌 Contrat API attendu (Laravel)

Le frontend interroge ces endpoints. Le contrat respecte le **diagramme de classe** fourni.

### Authentification
```
POST   /api/auth/login      { email, motDePasse }  → { token, user: { id, nom, email, role } }
POST   /api/auth/register   { nom, email, motDePasse, role }
POST   /api/auth/logout
GET    /api/auth/me         → user
```

### Ressources CRUD (génériques)
Pour chaque ressource ci-dessous : `GET /api/{r}`, `GET /api/{r}/{id}`, `POST /api/{r}`, `PUT /api/{r}/{id}`, `DELETE /api/{r}/{id}`.

| Ressource | URL |
|-----------|-----|
| Clients | `/api/clients` |
| Colis | `/api/colis` |
| Expéditions | `/api/expeditions` |
| Trajets | `/api/trajets` |
| Véhicules | `/api/vehicules` |
| Agences | `/api/agences` |
| Chauffeurs | `/api/chauffeurs` |
| Utilisateurs | `/api/utilisateurs` |
| Paiements | `/api/paiements` |
| Tarifs | `/api/tarifs` |
| Incidents | `/api/incidents` |
| Notifications | `/api/notifications` |
| Rapports | `/api/rapports` |

### Endpoints spécifiques chauffeur
```
GET    /api/chauffeur/colis                  → colis affectés
PATCH  /api/chauffeur/colis/{id}/statut      { statut }
GET    /api/chauffeur/trajets
POST   /api/chauffeur/incidents              { typeIncident, description, expeditionId? }
```

### Tableaux de bord
```
GET /api/dashboard/admin       → { colis, expeditions, clients, revenus, incidents }
GET /api/dashboard/agent       → { colis, expeditions, clients, paiements }
GET /api/dashboard/chauffeur   → { colisAffectes, trajetsJour, incidents }
```

## 🗺️ Mapping UML → Code

| Classe UML | Service frontend | Schéma de validation |
|-----------|------------------|----------------------|
| `Utilisateur` | `authService`, `utilisateursService` | `registerSchema`, `loginSchema` |
| `Client` | `clientsService` | `clientSchema` |
| `Colis` | `colisService` | `colisSchema` |
| `Expedition` | `expeditionsService` | `expeditionSchema` |
| `Trajet` | `trajetsService` | `trajetSchema` |
| `Vehicule` | `vehiculesService` | `vehiculeSchema` |
| `Agence` | `agencesService` | `agenceSchema` |
| `Chauffeur` | `chauffeursService` + `colisChauffeurService` | schéma inline |
| `Paiement` | `paiementsService` | `paiementSchema` |
| `Tarif` | `tarifsService` | `tarifSchema` |
| `Incident` | `incidentsService` | `incidentSchema` |
| `Notification` | `notificationsService` | — (lecture seule) |
| `Rapport` | `rapportsService` | — (form inline) |

## 🧪 Tests locaux sans backend

Sans API démarrée, les pages CRUD affichent simplement « Aucune donnée » et les actions affichent un toast d'erreur — l'application **ne plante pas**. Dès que `VITE_API_URL` pointe vers une API Laravel conforme, tout devient fonctionnel sans modification du code.

##  Stack technique

- **React 18.3** + **Vite 5**
- **React Router 6** (routing déclaratif + nested routes)
- **Tailwind CSS 3** + design tokens custom
- **Axios** (HTTP + intercepteurs)
- **Zod** (validation typée)
- **DOMPurify** (anti-XSS)
- **lucide-react** (icônes)
- **react-hot-toast** (notifications)
- **@lottiefiles/dotlottie-react** (animation login)



Projet.


Les differents chemin : 

http://localhost:5173/admin/dashboard
http://localhost:5173/admin/utilisateurs
http://localhost:5173/admin/agences

http://localhost:5173/agent/dashboard
http://localhost:5173/agent/clients
http://localhost:5173/agent/colis
http://localhost:5173/agent/expeditions
http://localhost:5173/agent/paiements

http://localhost:5173/chauffeur/dashboard
http://localhost:5173/chauffeur/mes-colis
http://localhost:5173/chauffeur/mes-trajets
http://localhost:5173/chauffeur/modifier-statut
http://localhost:5173/chauffeur/incident
