<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Chauffeur extends Model
{
    protected $table = 'chauffeurs';
    protected $primaryKey = 'id_chauffeur';

    protected $fillable = [
        'id_user',
        'permis',
        'id_vehicule',
    ];

    // RELATIONS
    public function user()
    {
        return $this->belongsTo(User::class, 'id_user', 'id_user');
    }

    public function vehicule()
    {
        return $this->belongsTo(Vehicule::class, 'id_vehicule', 'id_vehicule');
    }

    public function expeditions()
    {
        return $this->hasMany(Expedition::class, 'id_chauffeur', 'id_chauffeur');
    }

    public function incidents()
    {
        return $this->hasMany(Incident::class, 'id_chauffeur', 'id_chauffeur');
    }
}