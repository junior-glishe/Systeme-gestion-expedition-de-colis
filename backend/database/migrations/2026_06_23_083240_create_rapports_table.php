<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('rapports', function (Blueprint $table) {
            $table->id('id_rapport');
            $table->string('type_rapport', 100);
            $table->date('periode_debut');
            $table->date('periode_fin');
            $table->timestamp('date_generation')->useCurrent();
            $table->string('format_export', 20);

            $table->unsignedBigInteger('id_admin');

            $table->foreign('id_admin')
                  ->references('id_user')
                  ->on('utilisateurs');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('rapports');
    }
};