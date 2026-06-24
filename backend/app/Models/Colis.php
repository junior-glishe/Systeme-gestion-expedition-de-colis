<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Colis extends Model
{
    protected $table = 'colis';
    protected $primaryKey = 'id_colis';

    protected $fillable = [
        'reference',
        'description',
        'poids',
        'longueur',
        'largeur',
        'hauteur',
        'valeur_declaree',
        'statut',
        'date_creation',
        'date_modification',
        'id_expedition',
    ];

    protected $casts = [
        'poids' => 'decimal:2',
        'longueur' => 'decimal:2',
        'largeur' => 'decimal:2',
        'hauteur' => 'decimal:2',
        'valeur_declaree' => 'decimal:2',
        'date_creation' => 'datetime',
        'date_modification' => 'datetime',
    ];

    // RELATIONS
    public function expedition()
    {
        return $this->belongsTo(Expedition::class, 'id_expedition', 'id_expedition');
    }

    public function notifications()
    {
        return $this->hasMany(Notification::class, 'id_colis', 'id_colis');
    }
}