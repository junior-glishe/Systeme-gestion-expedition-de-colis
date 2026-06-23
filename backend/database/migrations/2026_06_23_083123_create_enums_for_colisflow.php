<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Crée les ENUMS
        DB::statement("CREATE TYPE role_utilisateur AS ENUM ('ADMIN', 'AGENT', 'CHAUFFEUR')");
        DB::statement("CREATE TYPE statut_colis AS ENUM ('en_transit', 'arrive_destination', 'retour_expediteur', 'perdu', 'endommage', 'annule')");
        DB::statement("CREATE TYPE statut_expedition AS ENUM ('brouillon', 'planifiee', 'en_cours', 'terminee', 'suspendue', 'annulee')");
        DB::statement("CREATE TYPE statut_paiement AS ENUM ('en_attente', 'paye', 'rembourse', 'echec', 'annule')");
        DB::statement("CREATE TYPE mode_paiement AS ENUM ('especes', 'cheque', 'virement')");
        DB::statement("CREATE TYPE statut_incident AS ENUM ('ouvert', 'en_cours', 'resolu', 'ferme')");
        DB::statement("CREATE TYPE statut_notification AS ENUM ('en_attente', 'envoyee', 'lue', 'echec')");
        DB::statement("CREATE TYPE statut_vehicule AS ENUM ('disponible', 'en_mission', 'maintenance', 'hors_service')");
    }

    public function down(): void
    {
        // Supprime les ENUMS
        DB::statement("DROP TYPE IF EXISTS role_utilisateur CASCADE");
        DB::statement("DROP TYPE IF EXISTS statut_colis CASCADE");
        DB::statement("DROP TYPE IF EXISTS statut_expedition CASCADE");
        DB::statement("DROP TYPE IF EXISTS statut_paiement CASCADE");
        DB::statement("DROP TYPE IF EXISTS mode_paiement CASCADE");
        DB::statement("DROP TYPE IF EXISTS statut_incident CASCADE");
        DB::statement("DROP TYPE IF EXISTS statut_notification CASCADE");
        DB::statement("DROP TYPE IF EXISTS statut_vehicule CASCADE");
    }
};




