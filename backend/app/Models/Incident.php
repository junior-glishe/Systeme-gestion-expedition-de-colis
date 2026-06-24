<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Incident extends Model
{
    protected $table = 'incidents';
    protected $primaryKey = 'id_incident';

    protected $fillable = [
        'type_incident',
        'description',
        'statut',
        'date_signalement',
        'date_resolution',
        'id_expedition',
        'id_chauffeur',
    ];

    protected $casts = [
        'date_signalement' => 'datetime',
        'date_resolution' => 'datetime',
    ];

    // RELATIONS
    public function expedition()
    {
        return $this->belongsTo(Expedition::class, 'id_expedition', 'id_expedition');
    }

    public function chauffeur()
    {
        return $this->belongsTo(Chauffeur::class, 'id_chauffeur', 'id_chauffeur');
    }
}