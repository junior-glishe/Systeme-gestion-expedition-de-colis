<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Expedition extends Model
{
    protected $table = 'expeditions';
    protected $primaryKey = 'id_expedition';

    protected $fillable = [
        'reference',
        'date_depart',
        'date_arrivee_estimee',
        'date_livraison',
        'statut',
        'cout_total',
        'id_client',
        'id_agent',
        'id_agence',
        'id_chauffeur',
        'id_trajet',
        'id_tarif',
    ];

    protected $casts = [
        'date_depart' => 'datetime',
        'date_arrivee_estimee' => 'datetime',
        'date_livraison' => 'datetime',
        'cout_total' => 'decimal:2',
    ];

    // RELATIONS
    public function client()
    {
        return $this->belongsTo(Client::class, 'id_client', 'id_client');
    }

    public function agent()
    {
        return $this->belongsTo(Agent::class, 'id_agent', 'id_agent');
    }

    public function agence()
    {
        return $this->belongsTo(Agence::class, 'id_agence', 'id_agence');
    }

    public function chauffeur()
    {
        return $this->belongsTo(Chauffeur::class, 'id_chauffeur', 'id_chauffeur');
    }

    public function trajet()
    {
        return $this->belongsTo(Trajet::class, 'id_trajet', 'id_trajet');
    }

    public function tarif()
    {
        return $this->belongsTo(Tarif::class, 'id_tarif', 'id_tarif');
    }

    public function colis()
    {
        return $this->hasMany(Colis::class, 'id_expedition', 'id_expedition');
    }

    public function paiements()
    {
        return $this->hasMany(Paiement::class, 'id_expedition', 'id_expedition');
    }

    public function incidents()
    {
        return $this->hasMany(Incident::class, 'id_expedition', 'id_expedition');
    }
}