<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('trajets', function (Blueprint $table) {
            $table->id('id_trajet');
            $table->string('ville_depart', 100);
            $table->string('ville_arrivee', 100);
            $table->decimal('distance_km', 10, 2);
            $table->integer('duree_estimee_h');
            $table->boolean('actif')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('trajets');
    }
};