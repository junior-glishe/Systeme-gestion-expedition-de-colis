<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('agences', function (Blueprint $table) {
            $table->id('id_agence');
            $table->string('nom', 150);
            $table->text('adresse')->nullable();
            $table->string('ville', 100)->nullable();
            $table->string('telephone', 30)->nullable();
            $table->string('email', 255)->nullable();
            $table->boolean('actif')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('agences');
    }
};