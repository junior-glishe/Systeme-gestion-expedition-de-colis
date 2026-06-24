<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Recu extends Model
{
    protected $table = 'recus';
    protected $primaryKey = 'id_recu';

    protected $fillable = [
        'numero',
        'montant_total',
        'date_generation',
        'id_paiement',
    ];

    protected $casts = [
        'montant_total' => 'decimal:2',
        'date_generation' => 'datetime',
    ];

    // RELATIONS
    public function paiement()
    {
        return $this->belongsTo(Paiement::class, 'id_paiement', 'id_paiement');
    }
}