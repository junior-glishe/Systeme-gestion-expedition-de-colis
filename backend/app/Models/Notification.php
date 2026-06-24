<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    protected $table = 'notifications';
    protected $primaryKey = 'id_notification';

    protected $fillable = [
        'message',
        'type',
        'statut',
        'date_envoi',
        'destinataire',
        'id_colis',
    ];

    protected $casts = [
        'date_envoi' => 'datetime',
    ];

    // RELATIONS
    public function colis()
    {
        return $this->belongsTo(Colis::class, 'id_colis', 'id_colis');
    }
}