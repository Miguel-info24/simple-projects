<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SolicitacaoLimite extends Model
{
    protected $fillable = [
        'conta_id',
        'limite_atual',
        'limite_solicitado',
        'status',
        'motivo',
        'aprovado_por',
        'aprovado_em',
    ];

    protected function casts(): array
    {
        return [
            'limite_atual' => 'decimal:2',
            'limite_solicitado' => 'decimal:2',
            'aprovado_em' => 'datetime',
        ];
    }

    public function conta(): BelongsTo
    {
        return $this->belongsTo(Conta::class);
    }

    public function aprovador(): BelongsTo
    {
        return $this->belongsTo(User::class, 'aprovado_por');
    }
}