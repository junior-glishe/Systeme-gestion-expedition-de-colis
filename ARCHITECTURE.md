# Architecture

## Vue d'ensemble

Application **SPA React** organisée en couches strictes :

```
┌────────────────────────────────────────────────┐
│              Pages (par rôle)                  │  ← UI métier
├────────────────────────────────────────────────┤
│   Composants (common, landing, layout, sidebar)│  ← UI réutilisable
├────────────────────────────────────────────────┤
│         Contexts (AuthContext)                 │  ← État global
├────────────────────────────────────────────────┤
│         Services (axios) + Schémas (zod)       │  ← Logique I/O + validation
├────────────────────────────────────────────────┤
│              Utils (storage, security, format) │  ← Helpers purs
└────────────────────────────────────────────────┘
                       ↓
              ┌──────────────────┐
              │  API Laravel     │  (HTTP/JSON, JWT Bearer)
              │  PostgreSQL      │
              └──────────────────┘
```

## Flux d'authentification

```
[Login.jsx]
   │ validate(loginSchema, form)
   ▼
[AuthContext.login()]
   │
   ▼
[authService.login()] ──POST /api/auth/login──► Laravel
                                    ◄── { token, user }
   │
   ▼
[storage.set("token"), storage.set("user")]
[setUser(user)]
   │
   ▼
[Navigate vers /{role}/dashboard]
```

## Flux de garde de route (RBAC)

```
URL demandée → <ProtectedRoute roles={[ADMIN]}>
                       │
        ┌──────────────┴──────────────┐
        ▼                             ▼
   non authentifié              authentifié
        │                             │
        ▼                    ┌────────┴────────┐
   /login                    │                 │
                       rôle OK           rôle KO
                             │                 │
                             ▼                 ▼
                          <Outlet/>      /unauthorized
```

## Flux CRUD générique (CrudPage)

```
[CrudPage] ──useEffect──► service.list()
    │
    ├── recherche locale (filter sur JSON.stringify)
    │
    ├── openCreate / openEdit → ouvre modal
    │       │
    │       ▼
    │   submit() ──► validate(schema) ──► service.create/update()
    │                                              │
    │                                              ▼
    │                                          toast + reload
    │
    └── remove() → confirm → service.remove() → toast + reload
```

## Cas d'utilisation (UML) → Implémentation

### Agent d'expédition

| Use case | Page | Service appelé |
|----------|------|----------------|
| Se connecter | `Auth/Login` | `authService.login` |
| Enregistrer un client | `Agent/Clients` | `clientsService.create` |
| Enregistrer un colis | `Agent/Colis` | `colisService.create` |
| Créer une expédition | `Agent/Expeditions` | `expeditionsService.create` |
| Encaisser un paiement | `Agent/Paiements` | `paiementsService.create` |
| Rechercher un colis | `Agent/Recherche` | `colisService.list({ q })` |
| Consulter l'historique | `Agent/Historique` | `expeditionsService.list({ historique:1 })` |
| Générer une notification | _automatique côté backend_ | déclenchée par les services concernés |
| Générer un reçu | _déclenché par `paiementsService.create`_ | retour API contient le reçu |

### Chauffeur

| Use case | Page | Service appelé |
|----------|------|----------------|
| Se connecter | `Auth/Login` | `authService.login` |
| Consulter colis affectés | `Chauffeur/MesColis` | `colisChauffeurService.affectes` |
| Marquer le statut du colis | `Chauffeur/ModifierStatut` | `colisChauffeurService.marquerStatut` |
| Consulter les trajets | `Chauffeur/MesTrajets` | `colisChauffeurService.mesTrajets` |
| Signaler un incident | `Chauffeur/SignalerIncident` | `colisChauffeurService.signalerIncident` |

### Administrateur

| Use case | Page | Service appelé |
|----------|------|----------------|
| Gérer les comptes | `Admin/Utilisateurs` | `utilisateursService.*` |
| Gérer agences/véhicules | `Admin/Agences`, `Admin/Vehicules` | `agencesService`, `vehiculesService` |
| Définir les tarifs | `Admin/Tarifs` | `tarifsService.*` |
| Consulter le tableau de bord | `Admin/Dashboard` | `dashboardService.admin` |
| Générer des rapports | `Admin/Rapports` | `rapportsService.create` |

## Diagramme de contexte → réalisation

```
        CHAUFFEUR ─────► /chauffeur/*    ◄───── ADMINISTRATEUR ──► /admin/*
                              │
                              ▼
                   ┌──────────────────────────┐
                   │   Frontend React (SPA)   │
                   └──────────┬───────────────┘
                              │ Axios (Bearer JWT)
                              ▼
                   ┌──────────────────────────┐
                   │   API Laravel + Postgres │
                   └──────────┬───────────────┘
                              │ déclenche
                              ▼
                   ┌──────────────────────────┐
                   │  Système de Notification │  (email/SMS/push)
                   └──────────────────────────┘
        AGENT D'EXPÉDITION ─────► /agent/*
```

## Conventions de code

- **Aliases** : `@/...` pointe vers `src/...` (cf. `vite.config.js`, `jsconfig.json`).
- **Composants** : un fichier `.jsx` par composant, export default.
- **Services** : un fichier par entité, export nommé `{entite}Service`.
- **Schémas** : centralisés dans `src/schemas/index.js`.
- **Pas de couleurs hard-codées** dans les classes Tailwind métier — utiliser les variables CSS de `styles.css` ou les tokens `brand-500`, `brand-600`.
- **Pas de `dangerouslySetInnerHTML`**. Tout HTML provenant d'une source non sûre passe par `sanitizeHtml()`.
- **Pas de `console.log`** en production (un linter peut être ajouté).
- **Validation systématique** : tout formulaire passe par `validate(schema, payload)` avant l'appel API.

## Points d'extension

- **i18n** : ajouter `react-i18next` et extraire les chaînes françaises.
- **Refresh token** : adapter `api.js` pour rafraîchir le JWT sur 401 avant de purger la session.
- **Code splitting** : `React.lazy()` sur les routes admin pour réduire le bundle initial (actuellement 862 kB minifié).
- **Tests** : ajouter Vitest + React Testing Library, cibler en priorité `AuthContext`, `ProtectedRoute`, `CrudPage`, et les schémas Zod.
- **Realtime** : Laravel Echo + Pusher/Soketi pour les notifications temps réel.
