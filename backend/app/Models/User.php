<?php

namespace App\Models;

use App\Models\Agence;
use App\Models\Chauffeur;
use App\Models\Expedition;
use App\Models\Rapport;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Boost\Install\Agents\Agent;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'utilisateurs';
    protected $primaryKey = 'id_user';

    protected $fillable = [
        'nom',
        'email',
        'mot_de_passe',
        'role',
        'actif',
    ];

    protected $hidden = [
        'mot_de_passe',
    ];

    protected $casts = [
        'actif' => 'boolean',
    ];

    // Mutateur pour hacher le mot de passe
    public function setMotDePasseAttribute($value)
    {
        $this->attributes['mot_de_passe'] = bcrypt($value);
    }

    //  RELATIONS
    public function agence()
    {
        return $this->hasOne(Agence::class, 'id_user', 'id_user');
    }

    public function chauffeur()
    {
        return $this->hasOne(Chauffeur::class, 'id_user', 'id_user');
    }

    public function agent()
    {
        return $this->hasOne(Agent::class, 'id_user', 'id_user');
    }

    public function expeditions()
    {
        return $this->hasMany(Expedition::class, 'id_agent', 'id_user');
    }

    public function rapports()
    {
        return $this->hasMany(Rapport::class, 'id_admin', 'id_user');
    }
    
}