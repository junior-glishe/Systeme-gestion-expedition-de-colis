<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('utilisateurs', function (Blueprint $table) {
            $table->id('id_user');
            $table->string('nom', 150);
            $table->string('email', 255)->unique();
            $table->text('mot_de_passe');
            $table->string('role'); // On va utiliser le ENUM avec DB::raw()
            $table->boolean('actif')->default(true);
            $table->timestamps();
        });

        // On modifie la colonne role pour utiliser l'ENUM
        DB::statement("ALTER TABLE utilisateurs ALTER COLUMN role TYPE role_utilisateur USING role::role_utilisateur");
    }

    public function down(): void
    {
        Schema::dropIfExists('utilisateurs');
    }
};