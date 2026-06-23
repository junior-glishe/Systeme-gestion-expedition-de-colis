<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
{
    Schema::create('notifications', function (Blueprint $table) {
        $table->id('id_notification');
        $table->text('message');
        $table->string('type', 50);
        $table->string('statut'); 
        $table->timestamp('date_envoi')->useCurrent();
        $table->string('destinataire', 255);

        $table->unsignedBigInteger('id_colis');

        $table->foreign('id_colis')
              ->references('id_colis')
              ->on('colis')
              ->onDelete('cascade');

        $table->timestamps();
    });

    DB::statement("ALTER TABLE notifications ALTER COLUMN statut TYPE statut_notification USING statut::statut_notification");
    DB::statement("ALTER TABLE notifications ALTER COLUMN statut SET DEFAULT 'en_attente'");
}

    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};