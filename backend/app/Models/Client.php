<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    protected $table = 'clients';
    protected $primaryKey = 'id_client';

    protected $fillable = [
        'nom',
        'prenom',
        'adresse',
        'ville',
        'telephone',
        'email',
        'date_inscription',
    ];

    protected $casts = [
        'date_inscription' => 'date',
    ];

    // RELATIONS
    public function expeditions()
    {
        return $this->hasMany(Expedition::class, 'id_client', 'id_client');
    }
}