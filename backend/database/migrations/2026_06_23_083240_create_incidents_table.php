<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('incidents', function (Blueprint $table) {
            $table->id('id_incident');
            $table->string('type_incident', 100);
            $table->text('description');
            $table->string('statut'); 
            $table->timestamp('date_signalement')->useCurrent();
            $table->timestamp('date_resolution')->nullable();

            $table->unsignedBigInteger('id_expedition');
            $table->unsignedBigInteger('id_chauffeur');

            $table->foreign('id_expedition')
                  ->references('id_expedition')
                  ->on('expeditions');

            $table->foreign('id_chauffeur')
                  ->references('id_chauffeur')
                  ->on('chauffeurs');

            $table->timestamps();
        });

        // 1. Convertir en ENUM
        DB::statement("ALTER TABLE incidents ALTER COLUMN statut TYPE statut_incident USING statut::statut_incident");
        
        // 2. Ajouter le DEFAULT après conversion
        DB::statement("ALTER TABLE incidents ALTER COLUMN statut SET DEFAULT 'ouvert'");
    }

    public function down(): void
    {
        Schema::dropIfExists('incidents');
    }
};