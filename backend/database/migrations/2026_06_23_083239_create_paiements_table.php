<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('paiements', function (Blueprint $table) {
            $table->id('id_paiement');
            $table->decimal('montant', 12, 2);
            $table->string('mode_paiement');  
            $table->string('statut');         
            $table->timestamp('date_paiement')->useCurrent();

            $table->unsignedBigInteger('id_expedition');
            $table->unsignedBigInteger('id_agent');

            $table->foreign('id_expedition')
                  ->references('id_expedition')
                  ->on('expeditions');

            $table->foreign('id_agent')
                  ->references('id_agent')
                  ->on('agents_expedition');

            $table->timestamps();
        });

        // Convertir mode_paiement en ENUM
        DB::statement("ALTER TABLE paiements ALTER COLUMN mode_paiement TYPE mode_paiement USING mode_paiement::mode_paiement");
        
        // Convertir statut en ENUM
        DB::statement("ALTER TABLE paiements ALTER COLUMN statut TYPE statut_paiement USING statut::statut_paiement");
        
        // Ajouter les DEFAULT après conversion
        DB::statement("ALTER TABLE paiements ALTER COLUMN statut SET DEFAULT 'en_attente'");
    }

    public function down(): void
    {
        Schema::dropIfExists('paiements');
    }
};