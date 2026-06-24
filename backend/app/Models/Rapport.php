<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rapport extends Model
{
    protected $table = 'rapports';
    protected $primaryKey = 'id_rapport';

    protected $fillable = [
        'type_rapport',
        'periode_debut',
        'periode_fin',
        'date_generation',
        'format_export',
        'id_admin',
    ];

    protected $casts = [
        'periode_debut' => 'date',
        'periode_fin' => 'date',
        'date_generation' => 'datetime',
    ];

    // RELATIONS
    public function admin()
    {
        return $this->belongsTo(User::class, 'id_admin', 'id_user');
    }
}