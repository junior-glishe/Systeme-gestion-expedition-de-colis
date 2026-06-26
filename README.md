
# 🚚 ColisFlow - Backend Laravel

Application backend Laravel pour la gestion et le suivi des expéditions de colis par transport routier. Cette API REST est consommée par le frontend React (TrackPulse) et gère toute la logique métier, l'authentification, et la persistance des données dans PostgreSQL.

---

## 📋 À propos du projet

 C'est le backend qui alimente l'application ColisFlow. Il implémente fidèlement les diagrammes UML fournis (contexte, cas d'utilisation, classes) et expose une API RESTful sécurisée pour :

| Acteur | Modules | Fonctionnalités principales |
|--------|---------|----------------------------|
| **Administrateur** | `/admin` | Dashboard, gestion des comptes, agences, véhicules, chauffeurs, trajets, tarifs, rapports |
| **Agent d'expédition** | `/agent` | Enregistrer clients, colis, expéditions, encaisser paiements, rechercher, historique |
| **Chauffeur** | `/chauffeur` | Consulter colis affectés, marquer statut, trajets, signaler incidents |

---

## 🛠️ Stack technique

| Composant | Technologie | Version |
|-----------|-------------|---------|
| **Framework** | Laravel | 12.x |
| **Langage** | PHP | 8.2+ |
| **Base de données** | PostgreSQL | 16+ |
| **Authentification** | Laravel Sanctum | - |
| **ORM** | Eloquent ORM | - |
| **Migrations** | Laravel Schema | - |
| **API** | RESTful | - |
| **Validation** | Laravel Validator | - |

---

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **PHP** 8.2 ou supérieur
- **Composer** (gestionnaire de dépendances PHP)
- **PostgreSQL** 16 ou supérieur
- **Git** (pour le versionnement)

---

## ⚙️ Installation

### 1. Cloner le dépôt

```bash
git clone https://github.com/votre-username/colisflow-backend.git
cd colisflow-backend
```

### 2. Installer les dépendances PHP

```bash
composer install
```

### 3. Configuration de l'environnement

```bash
# Copier le fichier d'environnement
cp .env.example .env

# Générer la clé d'application
php artisan key:generate
```

### 4. Installer Sanctum (authentification API)

```bash
php artisan sanctum:install
```

---

## 🗄️ Base de données PostgreSQL

### 1. Créer la base de données

```sql
CREATE DATABASE colisflow;
```

### 2. Configurer les identifiants dans `.env`

Éditez le fichier `.env` :

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=colisflow
DB_USERNAME=postgres
DB_PASSWORD=votre_mot_de_passe
```

### 3. Exécuter les migrations

```bash
php artisan migrate
```

### 4. (Optionnel) Remplir avec des données de test

```bash
php artisan db:seed
```

Cela créera :
- Un administrateur par défaut (`admin@colisflow.com` / `password`)
- Des agents et chauffeurs
- Des agences, véhicules, trajets et tarifs de test

---

## 🚀 Lancement du serveur

```bash
php artisan serve
```

Le serveur sera accessible à : **http://127.0.0.1:8000**

Pour utiliser avec le frontend React, assurez-vous que `VITE_API_URL` pointe vers :

```env
VITE_API_URL=http://127.0.0.1:8000/api
```

---

## 📁 Structure du projet



## 🔐 Mapping UML → Code

| Classe UML | Modèle Eloquent | Contrôleur | Routes API |
|------------|-----------------|------------|------------|
| Utilisateur | User.php | AuthController | `/api/auth/*` |
| Client | Client.php | ClientController | `/api/agent/clients` |
| Colis | Colis.php | ColisController | `/api/agent/colis` |
| Expedition | Expedition.php | ExpeditionController | `/api/agent/expeditions` |
| Trajet | Trajet.php | TrajetController | `/api/admin/trajets` |
| Vehicule | Vehicule.php | VehiculeController | `/api/admin/vehicules` |
| Agence | Agence.php | AgenceController | `/api/admin/agences` |
| Chauffeur | Chauffeur.php | ChauffeurController | `/api/admin/chauffeurs` |
| Paiement | Paiement.php | PaiementController | `/api/agent/paiements` |
| Tarif | Tarif.php | TarifController | `/api/admin/tarifs` |
| Incident | Incident.php | IncidentController | `/api/chauffeur/incidents` |
| Notification | Notification.php | NotificationController | `/api/admin/notifications` |
| Rapport | Rapport.php | RapportController | `/api/admin/rapports` |

---

## 📚 Documentation API

### Base URL

```
http://127.0.0.1:8000/api
```

---

### 🔑 Authentification (Public)

| Méthode | Endpoint | Body | Description |
|---------|----------|------|-------------|
| POST | `/auth/register` | `nom, email, mot_de_passe, mot_de_passe_confirmation` | Créer un compte |
| POST | `/auth/login` | `email, mot_de_passe` | Se connecter |
| POST | `/auth/logout` | ❌ (token requis) | Se déconnecter |
| GET | `/auth/me` | ❌ (token requis) | Infos utilisateur |

#### Exemple de connexion

**Requête :**
```bash
curl -X POST http://127.0.0.1:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@colisflow.com",
    "mot_de_passe": "password"
  }'
```

**Réponse :**
```json
{
  "message": "Connexion réussie",
  "user": {
    "id": 1,
    "nom": "Admin Colisflow",
    "email": "admin@colisflow.com",
    "role": "ADMIN",
    "actif": true
  },
  "token": "15|xxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "dashboard": "/admin/dashboard"
}
```

**Erreurs possibles :**
- `401` : Identifiants incorrects
- `403` : Compte en attente de validation

---

### 👑 Routes ADMIN (`/api/admin/*`)

**Token requis - ROLE: ADMIN**

#### Dashboard

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/admin/dashboard` | Statistiques globales |

#### Utilisateurs (CRUD)

| Méthode | Endpoint | Body |
|---------|----------|------|
| GET | `/admin/utilisateurs` | ❌ |
| POST | `/admin/utilisateurs` | `nom, email, mot_de_passe, role, actif` |
| PUT | `/admin/utilisateurs/{id}` | `nom, email, mot_de_passe, role, actif` |
| DELETE | `/admin/utilisateurs/{id}` | ❌ |

#### Agences (CRUD)

| Méthode | Endpoint | Body |
|---------|----------|------|
| GET | `/admin/agences` | ❌ |
| POST | `/admin/agences` | `nom, adresse, ville, telephone, email, actif` |
| PUT | `/admin/agences/{id}` | `nom, adresse, ville, telephone, email, actif` |
| DELETE | `/admin/agences/{id}` | ❌ |

#### Véhicules (CRUD)

| Méthode | Endpoint | Body |
|---------|----------|------|
| GET | `/admin/vehicules` | ❌ |
| POST | `/admin/vehicules` | `immatriculation, marque, modele, capacite_kg, statut` |
| PUT | `/admin/vehicules/{id}` | `immatriculation, marque, modele, capacite_kg, statut` |
| DELETE | `/admin/vehicules/{id}` | ❌ |

**Statuts véhicule :** `disponible`, `en_mission`, `maintenance`, `hors_service`

#### Tarifs (CRUD)

| Méthode | Endpoint | Body |
|---------|----------|------|
| GET | `/admin/tarifs` | ❌ |
| POST | `/admin/tarifs` | `zone_depart, zone_arrivee, prix_par_km, prix_par_kg, date_effet, actif` |
| PUT | `/admin/tarifs/{id}` | `zone_depart, zone_arrivee, prix_par_km, prix_par_kg, date_effet, actif` |
| DELETE | `/admin/tarifs/{id}` | ❌ |

#### Trajets (CRUD)

| Méthode | Endpoint | Body |
|---------|----------|------|
| GET | `/admin/trajets` | ❌ |
| POST | `/admin/trajets` | `ville_depart, ville_arrivee, distance_km, duree_estimee_h, actif` |
| PUT | `/admin/trajets/{id}` | `ville_depart, ville_arrivee, distance_km, duree_estimee_h, actif` |
| DELETE | `/admin/trajets/{id}` | ❌ |

#### Rapports

| Méthode | Endpoint | Body |
|---------|----------|------|
| POST | `/admin/rapports` | `type_rapport, periode_debut, periode_fin, format_export` |

---

### 👨‍💼 Routes AGENT (`/api/agent/*`)

**Token requis - ROLE: AGENT**

#### Clients (CRUD)

| Méthode | Endpoint | Body |
|---------|----------|------|
| GET | `/agent/clients` | ❌ |
| POST | `/agent/clients` | `nom, prenom, adresse, ville, telephone, email` |
| PUT | `/agent/clients/{id}` | `nom, prenom, adresse, ville, telephone, email` |
| DELETE | `/agent/clients/{id}` | ❌ |

#### Colis (CRUD)

| Méthode | Endpoint | Body |
|---------|----------|------|
| GET | `/agent/colis` | ❌ |
| POST | `/agent/colis` | `reference, description, poids, longueur, largeur, hauteur, valeur_declaree, id_expedition` |
| PUT | `/agent/colis/{id}` | `reference, description, poids, longueur, largeur, hauteur, valeur_declaree, id_expedition` |
| DELETE | `/agent/colis/{id}` | ❌ |

**Statuts colis :** `en_transit`, `arrive_destination`, `retour_expediteur`, `perdu`, `endommage`, `annule`

#### Expéditions (CRUD)

| Méthode | Endpoint | Body |
|---------|----------|------|
| GET | `/agent/expeditions` | ❌ |
| POST | `/agent/expeditions` | `reference, id_client, id_agent, id_agence, id_chauffeur, id_trajet, id_tarif, cout_total` |
| PUT | `/agent/expeditions/{id}` | `reference, id_client, id_agent, id_agence, id_chauffeur, id_trajet, id_tarif, cout_total` |
| DELETE | `/agent/expeditions/{id}` | ❌ |

**Statuts expédition :** `brouillon`, `planifiee`, `en_cours`, `terminee`, `suspendue`, `annulee`

#### Paiements

| Méthode | Endpoint | Body |
|---------|----------|------|
| POST | `/agent/paiements` | `montant, mode_paiement, id_expedition, id_agent` |

**Modes paiement :** `especes`, `cheque`, `virement`

#### Recherche

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/agent/recherche?q=COL-001` | Rechercher par référence |

#### Historique

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/agent/historique` | Historique des opérations |

---

### 🚛 Routes CHAUFFEUR (`/api/chauffeur/*`)

**Token requis - ROLE: CHAUFFEUR**

#### Colis affectés

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/chauffeur/colis-affectes` | Liste des colis à transporter |

#### Modifier statut colis

| Méthode | Endpoint | Body |
|---------|----------|------|
| PUT | `/chauffeur/colis/{id}/statut` | `{ "statut": "arrive_destination" }` |

#### Trajets

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/chauffeur/trajets` | Trajets assignés |

#### Signaler un incident

| Méthode | Endpoint | Body |
|---------|----------|------|
| POST | `/chauffeur/incidents` | `type_incident, description, id_expedition` |

---

## 🔑 Rôles et permissions

| Rôle | Accès | Routes |
|------|-------|--------|
| **ADMIN** | Administration complète | `/api/admin/*` |
| **AGENT** | Gestion des expéditions | `/api/agent/*` |
| **CHAUFFEUR** | Suivi des livraisons | `/api/chauffeur/*` |

---

## 📊 Noms des champs (IMPORTANT)

✅ **À utiliser (snake_case)** :

```
nom, email, mot_de_passe, mot_de_passe_confirmation
zone_depart, zone_arrivee, prix_par_km, prix_par_kg
date_effet, ville_depart, ville_arrivee, distance_km
duree_estimee_h, immatriculation, capacite_kg
```

❌ **À éviter** :

```
password, motDePasse, zoneDepart, prixParKm
dateEffet, villeDepart, distanceKm, motDePasse
```

---

## 📊 Tableau récapitulatif des statuts

| Type | Valeurs possibles |
|------|-------------------|
| **Rôle utilisateur** | `ADMIN`, `AGENT`, `CHAUFFEUR` |
| **Statut colis** | `en_transit`, `arrive_destination`, `retour_expediteur`, `perdu`, `endommage`, `annule` |
| **Statut expédition** | `brouillon`, `planifiee`, `en_cours`, `terminee`, `suspendue`, `annulee` |
| **Statut paiement** | `en_attente`, `paye`, `rembourse`, `echec`, `annule` |
| **Mode paiement** | `especes`, `cheque`, `virement` |
| **Statut véhicule** | `disponible`, `en_mission`, `maintenance`, `hors_service` |
| **Statut incident** | `ouvert`, `en_cours`, `resolu`, `ferme` |

---

## 🔒 Sécurité

### Authentification JWT via Sanctum

- ✅ Tokens stockés côté client
- ✅ Middleware `auth:sanctum` protège les endpoints
- ✅ Expiration configurable des tokens

### RBAC (Role-Based Access Control)

```php
// Exemple de middleware dans les routes
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    // Routes réservées aux admins
});
```

### Mesures de sécurité implémentées

| Sécurité | Implémentation |
|----------|----------------|
| **Hash des mots de passe** | bcrypt/argon2 |
| **Validation des données** | Laravel Validator |
| **Protection CSRF** | Sanctum |
| **Rate Limiting** | `throttle:5,1` sur login |
| **CORS** | Configuré pour le frontend |
| **Logging** | Activités sensibles |
| **Pas de secrets** | Aucune clé en clair |

---

## 🧪 Tests

### Lancer les tests

```bash
# Tests unitaires
php artisan test

# Tests avec couverture
php artisan test --coverage

# Tester un fichier spécifique
php artisan test tests/Feature/AuthTest.php
```

### Exemple de test

```php
public function test_user_can_login()
{
    $response = $this->post('/api/auth/login', [
        'email' => 'admin@colisflow.com',
        'mot_de_passe' => 'password'
    ]);
    
    $response->assertStatus(200);
    $response->assertJsonStructure(['token', 'user']);
}
```

---

## 🚢 Déploiement en production

### 1. Configurer les variables d'environnement

```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://votre-domaine.com

DB_CONNECTION=pgsql
DB_HOST=votre-host
DB_DATABASE=colisflow
DB_USERNAME=votre-user
DB_PASSWORD=votre-pass
```

### 2. Optimiser Laravel

```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache
```

### 3. Configurer CORS

Dans `config/cors.php` :

```php
'allowed_origins' => ['https://frontend-trackpulse.com'],
'supports_credentials' => true,
```

### 4. Rate Limiting

```php
Route::post('/auth/login', [AuthController::class, 'login'])
    ->middleware('throttle:5,1');
```

---

## 📦 Variables d'environnement

| Variable | Description | Exemple |
|----------|-------------|---------|
| `APP_NAME` | Nom application | ColisFlow |
| `APP_ENV` | Environnement | local / production |
| `APP_DEBUG` | Mode debug | true / false |
| `DB_CONNECTION` | Type BDD | pgsql |
| `DB_HOST` | Hôte | 127.0.0.1 |
| `DB_PORT` | Port | 5432 |
| `DB_DATABASE` | Nom BDD | colisflow |
| `DB_USERNAME` | Utilisateur | postgres |
| `DB_PASSWORD` | Mot de passe | ****** |


✅ Présentation du projet  
✅ Stack technique (Laravel, PHP, PostgreSQL)  
✅ Installation pas à pas  
✅ Configuration PostgreSQL  
✅ Structure du projet  
✅ Documentation API complète avec tous les endpoints  
✅ Mapping UML → Code  
✅ Rôles et permissions  
✅ Sécurité et bonnes pratiques  
✅ Tests  
✅ Déploiement  
✅ Variables d'environnement  
