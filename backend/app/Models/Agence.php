<?php

namespace App\Models;

use App\Models\Expedition;
use Illuminate\Database\Eloquent\Model;
use Laravel\Boost\Install\Agents\Agent;

class Agence extends Model
{
    protected $table = 'agences';
    protected $primaryKey = 'id_agence';

    protected $fillable = [
        'nom',
        'adresse',
        'ville',
        'telephone',
        'email',
        'actif',
    ];

    protected $casts = [
        'actif' => 'boolean',
    ];

    // RELATIONS
    public function agents()
    {
        return $this->hasMany(Agent::class, 'id_agence', 'id_agence');
    }

    public function expeditions()
    {
        return $this->hasMany(Expedition::class, 'id_agence', 'id_agence');
    }
}