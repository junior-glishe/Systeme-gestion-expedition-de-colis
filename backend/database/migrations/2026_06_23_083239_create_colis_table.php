<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('colis', function (Blueprint $table) {
            $table->id('id_colis');
            $table->string('reference', 100)->unique();
            $table->text('description')->nullable();
            $table->decimal('poids', 10, 2);
            $table->decimal('longueur', 10, 2)->nullable();
            $table->decimal('largeur', 10, 2)->nullable();
            $table->decimal('hauteur', 10, 2)->nullable();
            $table->decimal('valeur_declaree', 12, 2)->default(0);
            $table->string('statut'); 
            $table->timestamp('date_creation')->useCurrent();
            $table->timestamp('date_modification')->nullable();

            $table->unsignedBigInteger('id_expedition');

            $table->foreign('id_expedition')
                  ->references('id_expedition')
                  ->on('expeditions')
                  ->onDelete('cascade');

            $table->timestamps();
        });

        // 1. Convertir en ENUM
        DB::statement("ALTER TABLE colis ALTER COLUMN statut TYPE statut_colis USING statut::statut_colis");
        
        // 2. Ajouter le DEFAULT après conversion
        DB::statement("ALTER TABLE colis ALTER COLUMN statut SET DEFAULT 'en_transit'");
    }

    public function down(): void
    {
        Schema::dropIfExists('colis');
    }
};