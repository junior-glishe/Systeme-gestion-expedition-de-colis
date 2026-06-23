<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('recus', function (Blueprint $table) {
            $table->id('id_recu');
            $table->string('numero', 100)->unique();
            $table->decimal('montant_total', 12, 2);
            $table->timestamp('date_generation')->useCurrent();

            $table->unsignedBigInteger('id_paiement')->unique();

            $table->foreign('id_paiement')
                  ->references('id_paiement')
                  ->on('paiements')
                  ->onDelete('cascade');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('recus');
    }
};