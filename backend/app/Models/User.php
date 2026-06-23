<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
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
}