<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Boost\Install\Agents\Agent;

class Paiement extends Model
{
    protected $table = 'paiements';
    protected $primaryKey = 'id_paiement';

    protected $fillable = [
        'montant',
        'mode_paiement',
        'statut',
        'date_paiement',
        'id_expedition',
        'id_agent',
    ];

    protected $casts = [
        'montant' => 'decimal:2',
        'date_paiement' => 'datetime',
    ];

    // RELATIONS
    public function expedition()
    {
        return $this->belongsTo(Expedition::class, 'id_expedition', 'id_expedition');
    }

    public function agent()
    {
        return $this->belongsTo(Agent::class, 'id_agent', 'id_agent');
    }

    public function recu()
    {
        return $this->hasOne(Recu::class, 'id_paiement', 'id_paiement');
    }
}