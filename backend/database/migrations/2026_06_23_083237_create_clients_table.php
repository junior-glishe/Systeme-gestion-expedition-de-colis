<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('clients', function (Blueprint $table) {
            $table->id('id_client');
            $table->string('nom', 100);
            $table->string('prenom', 100);
            $table->text('adresse')->nullable();
            $table->string('ville', 100)->nullable();
            $table->string('telephone', 30);
            $table->string('email', 255)->nullable();
            $table->date('date_inscription')->default(now());
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('clients');
    }
};