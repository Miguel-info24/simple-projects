<?php

namespace App\Repositories;

use App\Models\SolicitacaoLimite;

class SolicitacaoLimiteRepository
{
    public function all()
    {
        return SolicitacaoLimite::with(['conta.user', 'aprovador'])
            ->orderByDesc('created_at')
            ->get();
    }

    public function find(int $id): SolicitacaoLimite
    {
        return SolicitacaoLimite::with(['conta.user', 'aprovador'])
            ->findOrFail($id);
    }

    public function create(array $data): SolicitacaoLimite
    {
        return SolicitacaoLimite::create($data);
    }

    public function update(
        SolicitacaoLimite $solicitacao,
        array $data
    ): bool {
        return $solicitacao->update($data);
    }
}