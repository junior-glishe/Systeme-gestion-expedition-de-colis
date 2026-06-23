<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('chauffeurs', function (Blueprint $table) {
            $table->id('id_chauffeur');
            $table->unsignedBigInteger('id_user')->unique();
            $table->string('permis', 50);
            $table->unsignedBigInteger('id_vehicule')->nullable()->unique();
            
            $table->foreign('id_user')
                  ->references('id_user')
                  ->on('utilisateurs')
                  ->onDelete('restrict');
            
            $table->foreign('id_vehicule')
                  ->references('id_vehicule')
                  ->on('vehicules')
                  ->onDelete('set null');
            
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('chauffeurs');
    }
};