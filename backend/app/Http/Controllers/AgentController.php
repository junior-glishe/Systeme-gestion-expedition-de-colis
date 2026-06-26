<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Colis;
use App\Models\Expedition;
use App\Models\Notification;
use App\Models\Paiement;
use App\Models\Recu;
use App\Models\Tarif;
use App\Models\Trajet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class AgentController extends Controller
{
    //  1. GESTION DES CLIENTS (CRUD)
    public function getClients()
    {
        $clients = Client::all();
        return response()->json(['clients' => $clients], 200);
    }

    public function createClient(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:100',
            'prenom' => 'required|string|max:100',
            'adresse' => 'nullable|string',
            'ville' => 'nullable|string|max:100',
            'telephone' => 'required|string|max:30',
            'email' => 'nullable|email|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $client = Client::create($request->all());

        return response()->json(['message' => 'Client créé avec succès', 'client' => $client], 201);
    }

    public function updateClient(Request $request, $id)
    {
        $client = Client::findOrFail($id);
        $client->update($request->all());

        return response()->json(['message' => 'Client mis à jour', 'client' => $client], 200);
    }

    public function deleteClient($id)
    {
        $client = Client::findOrFail($id);
        $client->delete();

        return response()->json(['message' => 'Client supprimé'], 200);
    }

    //  2. GESTION DES COLIS (CRUD)
public function getColis()
{
    $colis = Colis::with('expedition')->get();
    return response()->json(['colis' => $colis], 200);
}

public function createColis(Request $request)
{
    // 1. Validation
    $validator = Validator::make($request->all(), [
        'reference' => 'required|string|unique:colis,reference',
        'description' => 'nullable|string',
        'poids' => 'required|numeric',
        'longueur' => 'nullable|numeric',
        'largeur' => 'nullable|numeric',
        'hauteur' => 'nullable|numeric',
        'valeur_declaree' => 'nullable|numeric',
        'id_expedition' => 'required|exists:expeditions,id_expedition',
    ]);

    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 422);
    }

    // 2. Création du colis
    $colis = Colis::create([
        'reference' => $request->reference,
        'description' => $request->description,
        'poids' => $request->poids,
        'longueur' => $request->longueur,
        'largeur' => $request->largeur,
        'hauteur' => $request->hauteur,
        'valeur_declaree' => $request->valeur_declaree ?? 0,
        'statut' => 'en_transit',
        'date_creation' => now(),
        'id_expedition' => $request->id_expedition,
    ]);

    // 3. CALCUL AUTOMATIQUE
    $this->calculerCoutTotal($request->id_expedition);

    // 4. Notification
    $this->createNotification($colis, 'Création de colis');

    // 5. Récupérer l'expédition mise à jour
    $expedition = Expedition::find($request->id_expedition);

    return response()->json([
        'message' => 'Colis créé avec succès',
        'colis' => $colis,
        'cout_total' => $expedition->cout_total ?? 0,
    ], 201);
}

public function updateColis(Request $request, $id)
{
    $colis = Colis::findOrFail($id);
    $old_expedition_id = $colis->id_expedition;
    
    $colis->update($request->all());

    //  Recalcul si le poids ou l'expédition change
    if ($request->has('poids') || $request->has('id_expedition')) {
        $new_expedition_id = $request->id_expedition ?? $old_expedition_id;
        $this->calculerCoutTotal($new_expedition_id);
        
        // Si l'expédition a changé, recalculer aussi l'ancienne
        if ($request->has('id_expedition') && $old_expedition_id != $new_expedition_id) {
            $this->calculerCoutTotal($old_expedition_id);
        }
    }

    return response()->json([
        'message' => 'Colis mis à jour',
        'colis' => $colis,
    ], 200);
}

public function deleteColis($id)
{
    $colis = Colis::findOrFail($id);
    $expedition_id = $colis->id_expedition;
    
    $colis->delete();

    //  Recalcul après suppression
    $this->calculerCoutTotal($expedition_id);

    return response()->json(['message' => 'Colis supprimé'], 200);
}

//  MÉTHODE PRIVÉE POUR RECALCULER LE COUT_TOTAL
private function calculerCoutTotal($expedition_id)
{
    $expedition = Expedition::find($expedition_id);
    if (!$expedition) return;

    $tarif = Tarif::find($expedition->id_tarif);
    $trajet = Trajet::find($expedition->id_trajet);

    if (!$tarif || !$trajet) return;

    $poids_total = Colis::where('id_expedition', $expedition_id)->sum('poids');

    $cout_total = ($tarif->prix_par_kg * $poids_total) + ($tarif->prix_par_km * $trajet->distance_km);

    $expedition->cout_total = $cout_total;
    $expedition->save();
}

    //  3. GESTION DES EXPÉDITIONS (CRUD)
    public function getExpeditions()
    {
        $expeditions = Expedition::with(['client', 'agent', 'chauffeur', 'trajet', 'colis'])->get();
        return response()->json(['expeditions' => $expeditions], 200);
    }

    public function createExpedition(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'reference' => 'required|string|unique:expeditions,reference',
            'date_depart' => 'nullable|date',
            'date_arrivee_estimee' => 'nullable|date',
            'id_client' => 'required|exists:clients,id_client',
            'id_agent' => 'required|exists:agents_expedition,id_agent',
            'id_agence' => 'required|exists:agences,id_agence',
            'id_chauffeur' => 'nullable|exists:chauffeurs,id_chauffeur',
            'id_trajet' => 'required|exists:trajets,id_trajet',
            'id_tarif' => 'nullable|exists:tarifs,id_tarif',
            'cout_total' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $expedition = Expedition::create($request->all());

        //  GÉNÉRER UNE NOTIFICATION
        $this->createNotificationForExpedition($expedition, 'Création d\'expédition');

        return response()->json(['message' => 'Expédition créée avec succès', 'expedition' => $expedition], 201);
    }

    public function updateExpedition(Request $request, $id)
    {
        $expedition = Expedition::findOrFail($id);
        $expedition->update($request->all());

        return response()->json(['message' => 'Expédition mise à jour', 'expedition' => $expedition], 200);
    }

    public function deleteExpedition($id)
    {
        $expedition = Expedition::findOrFail($id);
        $expedition->delete();

        return response()->json(['message' => 'Expédition supprimée'], 200);
    }

    //  4. PAIEMENTS
    public function createPaiement(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'montant' => 'required|numeric',
            'mode_paiement' => 'required|in:especes,cheque,virement',
            'id_expedition' => 'required|exists:expeditions,id_expedition',
            'id_agent' => 'required|exists:agents_expedition,id_agent',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $paiement = Paiement::create([
            'montant' => $request->montant,
            'mode_paiement' => $request->mode_paiement,
            'statut' => 'paye',
            'date_paiement' => now(),
            'id_expedition' => $request->id_expedition,
            'id_agent' => $request->id_agent,
        ]);

        //  GÉNÉRER UN REÇU
        $recu = Recu::create([
            'numero' => 'REC-' . Str::random(10),
            'montant_total' => $request->montant,
            'date_generation' => now(),
            'id_paiement' => $paiement->id_paiement,
        ]);

        //  GÉNÉRER UNE NOTIFICATION
        $this->createNotificationForPaiement($paiement);

        return response()->json([
            'message' => 'Paiement effectué avec succès',
            'paiement' => $paiement,
            'recu' => $recu
        ], 201);
    }

    //  5. RECHERCHE DE COLIS
    public function searchColis(Request $request)
    {
        $q = $request->query('q');
        
        if (!$q) {
            return response()->json(['colis' => []], 200);
        }

        $colis = Colis::where('reference', 'LIKE', "%{$q}%")
                      ->orWhere('description', 'LIKE', "%{$q}%")
                      ->with('expedition')
                      ->get();

        return response()->json(['colis' => $colis], 200);
    }

    //  6. HISTORIQUE
    public function getHistorique(Request $request)
    {
        $expeditions = Expedition::with(['client', 'agent', 'chauffeur'])
                                 ->orderBy('created_at', 'desc')
                                 ->get();

        return response()->json(['historique' => $expeditions], 200);
    }

    //  7. NOTIFICATIONS (automatiques)
    private function createNotification($colis, $type)
    {
        Notification::create([
            'message' => "Nouveau colis {$colis->reference} enregistré avec succès.",
            'type' => $type,
            'statut' => 'envoyee',
            'date_envoi' => now(),
            'destinataire' => 'agent',
            'id_colis' => $colis->id_colis,
        ]);
    }

    private function createNotificationForExpedition($expedition, $type)
    {
        // Notification pour l'agent
        Notification::create([
            'message' => "Expédition {$expedition->reference} créée avec succès.",
            'type' => $type,
            'statut' => 'envoyee',
            'date_envoi' => now(),
            'destinataire' => 'agent',
            'id_colis' => null,
        ]);

        // Notification pour le chauffeur
        if ($expedition->id_chauffeur) {
            Notification::create([
                'message' => "Nouvelle expédition {$expedition->reference} vous est affectée.",
                'type' => 'affectation',
                'statut' => 'envoyee',
                'date_envoi' => now(),
                'destinataire' => 'chauffeur',
                'id_colis' => null,
            ]);
        }
    }

    private function createNotificationForPaiement($paiement)
    {
        Notification::create([
            'message' => "Paiement de {$paiement->montant} FCFA effectué avec succès.",
            'type' => 'paiement',
            'statut' => 'envoyee',
            'date_envoi' => now(),
            'destinataire' => 'client',
            'id_colis' => null,
        ]);
    }
}