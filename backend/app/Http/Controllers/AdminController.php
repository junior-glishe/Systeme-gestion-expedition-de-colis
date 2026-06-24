<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Agence;
use App\Models\Vehicule;
use App\Models\Tarif;
use App\Models\Rapport;
use App\Models\Trajet;  // 👈 AJOUTÉ
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller
{
    // 📌 1. DASHBOARD ADMIN
    public function dashboard()
    {
        $stats = [
            'total_users' => User::count(),
            'total_agences' => Agence::count(),
            'total_vehicules' => Vehicule::count(),
            'total_tarifs' => Tarif::count(),
            'total_trajets' => Trajet::count(),  // 👈 AJOUTÉ
            'users_actifs' => User::where('actif', true)->count(),
        ];

        return response()->json(['stats' => $stats], 200);
    }

    // 📌 2. GESTION DES UTILISATEURS (CRUD)
    public function getUsers()
    {
        $users = User::all();
        return response()->json(['users' => $users], 200);
    }

    public function createUser(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:255',
            'email' => 'required|email|unique:utilisateurs,email',
            'mot_de_passe' => 'required|string|min:6',
            'role' => 'required|in:ADMIN,AGENT,CHAUFFEUR',
            'actif' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::create([
            'nom' => $request->nom,
            'email' => $request->email,
            'mot_de_passe' => Hash::make($request->mot_de_passe),
            'role' => $request->role,
            'actif' => $request->actif ?? false,
        ]);

        return response()->json(['message' => 'Utilisateur créé avec succès', 'user' => $user], 201);
    }

    public function updateUser(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'nom' => 'string|max:255',
            'email' => 'email|unique:utilisateurs,email,' . $id . ',id_user',
            'mot_de_passe' => 'nullable|string|min:6',
            'role' => 'in:ADMIN,AGENT,CHAUFFEUR',
            'actif' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $request->except('mot_de_passe');
        if ($request->filled('mot_de_passe')) {
            $data['mot_de_passe'] = Hash::make($request->mot_de_passe);
        }

        $user->update($data);

        return response()->json(['message' => 'Utilisateur mis à jour', 'user' => $user], 200);
    }

    public function deleteUser($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return response()->json(['message' => 'Utilisateur supprimé'], 200);
    }

    // 📌 3. GESTION DES AGENCES (CRUD)
    public function getAgences()
    {
        $agences = Agence::all();
        return response()->json(['agences' => $agences], 200);
    }

    public function createAgence(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:150',
            'adresse' => 'nullable|string',
            'ville' => 'nullable|string|max:100',
            'telephone' => 'nullable|string|max:30',
            'email' => 'nullable|email|max:255',
            'actif' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $agence = Agence::create($request->all());

        return response()->json(['message' => 'Agence créée avec succès', 'agence' => $agence], 201);
    }

    public function updateAgence(Request $request, $id)
    {
        $agence = Agence::findOrFail($id);
        $agence->update($request->all());

        return response()->json(['message' => 'Agence mise à jour', 'agence' => $agence], 200);
    }

    public function deleteAgence($id)
    {
        $agence = Agence::findOrFail($id);
        $agence->delete();

        return response()->json(['message' => 'Agence supprimée'], 200);
    }

    // 📌 4. GESTION DES VÉHICULES (CRUD)
    public function getVehicules()
    {
        $vehicules = Vehicule::all();
        return response()->json(['vehicules' => $vehicules], 200);
    }

    public function createVehicule(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'immatriculation' => 'required|string|max:50|unique:vehicules',
            'marque' => 'required|string|max:100',
            'modele' => 'required|string|max:100',
            'capacite_kg' => 'required|numeric',
            'statut' => 'required|in:disponible,en_mission,maintenance,hors_service',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $vehicule = Vehicule::create($request->all());

        return response()->json(['message' => 'Véhicule créé avec succès', 'vehicule' => $vehicule], 201);
    }

    public function updateVehicule(Request $request, $id)
    {
        $vehicule = Vehicule::findOrFail($id);
        $vehicule->update($request->all());

        return response()->json(['message' => 'Véhicule mis à jour', 'vehicule' => $vehicule], 200);
    }

    public function deleteVehicule($id)
    {
        $vehicule = Vehicule::findOrFail($id);
        $vehicule->delete();

        return response()->json(['message' => 'Véhicule supprimé'], 200);
    }

    // 📌 5. GESTION DES TARIFS (CRUD)
    public function getTarifs()
    {
        $tarifs = Tarif::all();
        return response()->json(['tarifs' => $tarifs], 200);
    }

    public function createTarif(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'zone_depart' => 'required|string|max:100',
            'zone_arrivee' => 'required|string|max:100',
            'prix_par_km' => 'required|numeric',
            'prix_par_kg' => 'required|numeric',
            'date_effet' => 'required|date',
            'actif' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $tarif = Tarif::create($request->all());

        return response()->json(['message' => 'Tarif créé avec succès', 'tarif' => $tarif], 201);
    }

    public function updateTarif(Request $request, $id)
    {
        $tarif = Tarif::findOrFail($id);
        $tarif->update($request->all());

        return response()->json(['message' => 'Tarif mis à jour', 'tarif' => $tarif], 200);
    }

    public function deleteTarif($id)
    {
        $tarif = Tarif::findOrFail($id);
        $tarif->delete();

        return response()->json(['message' => 'Tarif supprimé'], 200);
    }

    // 📌 6. GESTION DES TRAJETS (CRUD)  👈 NOUVEAU
    public function getTrajets()
    {
        $trajets = Trajet::all();
        return response()->json(['trajets' => $trajets], 200);
    }

    public function createTrajet(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'ville_depart' => 'required|string|max:100',
            'ville_arrivee' => 'required|string|max:100',
            'distance_km' => 'required|numeric',
            'duree_estimee_h' => 'required|integer',
            'actif' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $trajet = Trajet::create($request->all());

        return response()->json(['message' => 'Trajet créé avec succès', 'trajet' => $trajet], 201);
    }

    public function updateTrajet(Request $request, $id)
    {
        $trajet = Trajet::findOrFail($id);
        $trajet->update($request->all());

        return response()->json(['message' => 'Trajet mis à jour', 'trajet' => $trajet], 200);
    }

    public function deleteTrajet($id)
    {
        $trajet = Trajet::findOrFail($id);
        $trajet->delete();

        return response()->json(['message' => 'Trajet supprimé'], 200);
    }

    // 📌 7. GÉNÉRER UN RAPPORT
    public function genererRapport(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'type_rapport' => 'required|string|max:100',
            'periode_debut' => 'required|date',
            'periode_fin' => 'required|date',
            'format_export' => 'required|string|max:20',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $rapport = Rapport::create([
            'type_rapport' => $request->type_rapport,
            'periode_debut' => $request->periode_debut,
            'periode_fin' => $request->periode_fin,
            'format_export' => $request->format_export,
            'id_admin' => auth()->id(),
        ]);

        return response()->json([
            'message' => 'Rapport généré avec succès',
            'rapport' => $rapport,
            'data' => $this->getRapportData($request->type_rapport, $request->periode_debut, $request->periode_fin)
        ], 201);
    }

    private function getRapportData($type, $debut, $fin)
    {
        return [
            'type' => $type,
            'periode' => [$debut, $fin],
            'total_utilisateurs' => User::count(),
            'total_agences' => Agence::count(),
            'total_vehicules' => Vehicule::count(),
            'total_trajets' => Trajet::count(),  // 👈 AJOUTÉ
        ];
    }
}