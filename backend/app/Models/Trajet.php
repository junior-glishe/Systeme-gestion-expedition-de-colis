<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Trajet extends Model
{
    protected $table = 'trajets';
    protected $primaryKey = 'id_trajet';

    protected $fillable = [
        'ville_depart',
        'ville_arrivee',
        'distance_km',
        'duree_estimee_h',
        'actif',
    ];

    protected $casts = [
        'actif' => 'boolean',
    ];

    // RELATIONS
    public function expeditions()
    {
        return $this->hasMany(Expedition::class, 'id_trajet', 'id_trajet');
    }
}