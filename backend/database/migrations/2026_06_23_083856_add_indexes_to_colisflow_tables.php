<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Index sur les références
        Schema::table('expeditions', function (Blueprint $table) {
            $table->index('reference');
        });

        Schema::table('colis', function (Blueprint $table) {
            $table->index('reference');
        });

        // Index sur les clés étrangères
        Schema::table('expeditions', function (Blueprint $table) {
            $table->index('id_client');
            $table->index('id_agent');
            $table->index('id_agence');
            $table->index('id_chauffeur');
            $table->index('id_trajet');
            $table->index('id_tarif');
        });

        Schema::table('colis', function (Blueprint $table) {
            $table->index('id_expedition');
        });

        Schema::table('paiements', function (Blueprint $table) {
            $table->index('id_expedition');
            $table->index('id_agent');
        });

        Schema::table('notifications', function (Blueprint $table) {
            $table->index('id_colis');
        });

        Schema::table('incidents', function (Blueprint $table) {
            $table->index('id_expedition');
            $table->index('id_chauffeur');
        });

        Schema::table('agents_expedition', function (Blueprint $table) {
            $table->index('id_user');
            $table->index('id_agence');
        });

        Schema::table('chauffeurs', function (Blueprint $table) {
            $table->index('id_user');
            $table->index('id_vehicule');
        });

        Schema::table('recus', function (Blueprint $table) {
            $table->index('id_paiement');
        });

        Schema::table('rapports', function (Blueprint $table) {
            $table->index('id_admin');
        });

        Schema::table('tarifs', function (Blueprint $table) {
            $table->index('zone_depart');
            $table->index('zone_arrivee');
        });

        Schema::table('trajets', function (Blueprint $table) {
            $table->index('ville_depart');
            $table->index('ville_arrivee');
        });
    }

    public function down(): void
    {
        Schema::table('expeditions', function (Blueprint $table) {
            $table->dropIndex(['reference']);
            $table->dropIndex(['id_client']);
            $table->dropIndex(['id_agent']);
            $table->dropIndex(['id_agence']);
            $table->dropIndex(['id_chauffeur']);
            $table->dropIndex(['id_trajet']);
            $table->dropIndex(['id_tarif']);
        });

        Schema::table('colis', function (Blueprint $table) {
            $table->dropIndex(['reference']);
            $table->dropIndex(['id_expedition']);
        });

        Schema::table('paiements', function (Blueprint $table) {
            $table->dropIndex(['id_expedition']);
            $table->dropIndex(['id_agent']);
        });

        Schema::table('notifications', function (Blueprint $table) {
            $table->dropIndex(['id_colis']);
        });

        Schema::table('incidents', function (Blueprint $table) {
            $table->dropIndex(['id_expedition']);
            $table->dropIndex(['id_chauffeur']);
        });

        Schema::table('agents_expedition', function (Blueprint $table) {
            $table->dropIndex(['id_user']);
            $table->dropIndex(['id_agence']);
        });

        Schema::table('chauffeurs', function (Blueprint $table) {
            $table->dropIndex(['id_user']);
            $table->dropIndex(['id_vehicule']);
        });

        Schema::table('recus', function (Blueprint $table) {
            $table->dropIndex(['id_paiement']);
        });

        Schema::table('rapports', function (Blueprint $table) {
            $table->dropIndex(['id_admin']);
        });

        Schema::table('tarifs', function (Blueprint $table) {
            $table->dropIndex(['zone_depart']);
            $table->dropIndex(['zone_arrivee']);
        });

        Schema::table('trajets', function (Blueprint $table) {
            $table->dropIndex(['ville_depart']);
            $table->dropIndex(['ville_arrivee']);
        });
    }
};