<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
class Conta extends Model
{
    protected $fillable = [
        'user_id',
        'saldo',
        'limite',
        'bloqueada',
    ];

    protected function casts(): array
    {
        return [
            'saldo' => 'decimal:2',
            'limite' => 'decimal:2',
            'bloqueada' => 'boolean',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    public function solicitacoesLimite(): HasMany
    {
        return $this->hasMany(SolicitacaoLimite::class);
    }
}