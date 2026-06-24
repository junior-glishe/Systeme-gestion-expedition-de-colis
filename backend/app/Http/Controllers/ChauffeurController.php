<?php

namespace App\Http\Controllers;

use App\Models\Colis;
use App\Models\Expedition;
use App\Models\Incident;
use App\Models\Notification;
use App\Models\Trajet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ChauffeurController extends Controller
{
    // 📌 1. COLIS AFFECTÉS
    public function getColisAffectes(Request $request)
    {
        $user = $request->user();
        $chauffeur = $user->chauffeur;

        if (!$chauffeur) {
            return response()->json(['message' => 'Vous n\'êtes pas un chauffeur'], 403);
        }

        $colis = Colis::whereHas('expedition', function ($query) use ($chauffeur) {
            $query->where('id_chauffeur', $chauffeur->id_chauffeur);
        })->with('expedition')->get();

        return response()->json(['colis' => $colis], 200);
    }

    // 📌 2. MODIFIER LE STATUT D'UN COLIS
    public function marquerStatut(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'statut' => 'required|in:en_transit,arrive_destination,retour_expediteur,perdu,endommage,annule',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $colis = Colis::findOrFail($id);
        $colis->statut = $request->statut;
        $colis->date_modification = now();
        $colis->save();

        // 📧 NOTIFICATION
        Notification::create([
            'message' => "Statut du colis {$colis->reference} mis à jour : {$request->statut}",
            'type' => 'statut_colis',
            'statut' => 'envoyee',
            'date_envoi' => now(),
            'destinataire' => 'agent',
            'id_colis' => $colis->id_colis,
        ]);

        return response()->json(['message' => 'Statut mis à jour avec succès', 'colis' => $colis], 200);
    }

    // 📌 3. MES TRAJETS
    public function getMesTrajets(Request $request)
    {
        $user = $request->user();
        $chauffeur = $user->chauffeur;

        if (!$chauffeur) {
            return response()->json(['message' => 'Vous n\'êtes pas un chauffeur'], 403);
        }

        $trajets = Trajet::whereHas('expeditions', function ($query) use ($chauffeur) {
            $query->where('id_chauffeur', $chauffeur->id_chauffeur);
        })->get();

        return response()->json(['trajets' => $trajets], 200);
    }

    // 📌 4. SIGNALER UN INCIDENT
    public function signalerIncident(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'type_incident' => 'required|string|max:100',
            'description' => 'required|string',
            'id_expedition' => 'required|exists:expeditions,id_expedition',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = $request->user();
        $chauffeur = $user->chauffeur;

        if (!$chauffeur) {
            return response()->json(['message' => 'Vous n\'êtes pas un chauffeur'], 403);
        }

        $incident = Incident::create([
            'type_incident' => $request->type_incident,
            'description' => $request->description,
            'statut' => 'ouvert',
            'date_signalement' => now(),
            'id_expedition' => $request->id_expedition,
            'id_chauffeur' => $chauffeur->id_chauffeur,
        ]);

        // 📧 NOTIFICATION
        Notification::create([
            'message' => "Incident signalé sur l'expédition : {$request->type_incident}",
            'type' => 'incident',
            'statut' => 'envoyee',
            'date_envoi' => now(),
            'destinataire' => 'admin',
            'id_colis' => null,
        ]);

        return response()->json(['message' => 'Incident signalé avec succès', 'incident' => $incident], 201);
    }
}