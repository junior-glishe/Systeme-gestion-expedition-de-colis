<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('expeditions', function (Blueprint $table) {
            $table->id('id_expedition');
            $table->string('reference', 100)->unique();
            $table->timestamp('date_depart')->nullable();
            $table->timestamp('date_arrivee_estimee')->nullable();
            $table->timestamp('date_livraison')->nullable();
            $table->string('statut');  
            $table->decimal('cout_total', 12, 2)->default(0);

            // Clés étrangères
            $table->unsignedBigInteger('id_client');
            $table->unsignedBigInteger('id_agent');
            $table->unsignedBigInteger('id_agence');
            $table->unsignedBigInteger('id_chauffeur')->nullable();
            $table->unsignedBigInteger('id_trajet');
            $table->unsignedBigInteger('id_tarif')->nullable();

            // Foreign keys
            $table->foreign('id_client')->references('id_client')->on('clients');
            $table->foreign('id_agent')->references('id_agent')->on('agents_expedition');
            $table->foreign('id_agence')->references('id_agence')->on('agences');
            $table->foreign('id_chauffeur')->references('id_chauffeur')->on('chauffeurs')->onDelete('set null');
            $table->foreign('id_trajet')->references('id_trajet')->on('trajets');
            $table->foreign('id_tarif')->references('id_tarif')->on('tarifs')->onDelete('set null');

            $table->timestamps();
        });

        // 1. Convertir en ENUM
        DB::statement("ALTER TABLE expeditions ALTER COLUMN statut TYPE statut_expedition USING statut::statut_expedition");
        
        // 2. Ajouter le DEFAULT après conversion
        DB::statement("ALTER TABLE expeditions ALTER COLUMN statut SET DEFAULT 'brouillon'");
    }

    public function down(): void
    {
        Schema::dropIfExists('expeditions');
    }
};