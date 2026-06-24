<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vehicule extends Model
{
    protected $table = 'vehicules';
    protected $primaryKey = 'id_vehicule';

    protected $fillable = [
        'immatriculation',
        'marque',
        'modele',
        'capacite_kg',
        'statut',
    ];

    // RELATIONS
    public function chauffeur()
    {
        return $this->hasOne(Chauffeur::class, 'id_vehicule', 'id_vehicule');
    }

    public function expeditions()
    {
        return $this->hasMany(Expedition::class, 'id_vehicule', 'id_vehicule');
    }
}