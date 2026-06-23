<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('agents_expedition', function (Blueprint $table) {
            $table->id('id_agent');
            $table->unsignedBigInteger('id_user')->unique();
            $table->unsignedBigInteger('id_agence');
            
            $table->foreign('id_user')
                  ->references('id_user')
                  ->on('utilisateurs')
                  ->onDelete('restrict');
            
            $table->foreign('id_agence')
                  ->references('id_agence')
                  ->on('agences')
                  ->onDelete('restrict');
            
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('agents_expedition');
    }
};