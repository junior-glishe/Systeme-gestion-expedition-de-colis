<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tarif extends Model
{
    protected $table = 'tarifs';
    protected $primaryKey = 'id_tarif';

    protected $fillable = [
        'zone_depart',
        'zone_arrivee',
        'prix_par_km',
        'prix_par_kg',
        'date_effet',
        'actif',
    ];

    protected $casts = [
        'actif' => 'boolean',
        'date_effet' => 'date',
        'prix_par_km' => 'decimal:2',
        'prix_par_kg' => 'decimal:2',
    ];

    // RELATIONS
    public function expeditions()
    {
        return $this->hasMany(Expedition::class, 'id_tarif', 'id_tarif');
    }
}