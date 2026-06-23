<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
{
    // Crée d'abord la table sans le DEFAULT
    Schema::create('vehicules', function (Blueprint $table) {
        $table->id('id_vehicule');
        $table->string('immatriculation', 50)->unique();
        $table->string('marque', 100);
        $table->string('modele', 100);
        $table->decimal('capacite_kg', 10, 2);
        $table->string('statut'); 
        $table->timestamps();
    });

    // Ensuite, convertit la colonne en ENUM
    DB::statement("ALTER TABLE vehicules ALTER COLUMN statut TYPE statut_vehicule USING statut::statut_vehicule");

    // Puis ajoute la valeur par défaut
    DB::statement("ALTER TABLE vehicules ALTER COLUMN statut SET DEFAULT 'disponible'");
}

    public function down(): void
    {
        Schema::dropIfExists('vehicules');
    }
};