<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tarifs', function (Blueprint $table) {
            $table->id('id_tarif');
            $table->string('zone_depart', 100);
            $table->string('zone_arrivee', 100);
            $table->decimal('prix_par_km', 10, 2);
            $table->decimal('prix_par_kg', 10, 2);
            $table->date('date_effet');
            $table->boolean('actif')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tarifs');
    }
};