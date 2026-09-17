<?php

namespace App\Services;

use App\Models\Conta;
use App\Models\SolicitacaoLimite;
use App\Repositories\SolicitacaoLimiteRepository;

class SolicitacaoLimiteService
{
    public function __construct(
        private SolicitacaoLimiteRepository $repository
    ) {}

    public function listar()
    {
        return $this->repository->all();
    }

    public function buscar(int $id): SolicitacaoLimite
    {
        return $this->repository->find($id);
    }

    public function solicitar(
        Conta $conta,
        float $limiteSolicitado,
        ?string $motivo = null
    ): SolicitacaoLimite {
        return $this->repository->create([
            'conta_id' => $conta->id,
            'limite_atual' => $conta->limite,
            'limite_solicitado' => $limiteSolicitado,
            'status' => 'Pendente',
            'motivo' => $motivo,
        ]);
    }

    public function aprovar(
        SolicitacaoLimite $solicitacao,
        int $usuarioId
    ): bool {
        if ($solicitacao->status !== 'Pendente') {
            return false;
        }

        $conta = $solicitacao->conta;

        $conta->update([
            'limite' => $solicitacao->limite_solicitado,
        ]);

        return $this->repository->update($solicitacao, [
            'status' => 'Aprovada',
            'aprovado_por' => $usuarioId,
            'aprovado_em' => now(),
        ]);
    }

    public function reprovar(
        SolicitacaoLimite $solicitacao,
        int $usuarioId
    ): bool {
        if ($solicitacao->status !== 'Pendente') {
            return false;
        }

        return $this->repository->update($solicitacao, [
            'status' => 'Reprovada',
            'aprovado_por' => $usuarioId,
            'aprovado_em' => now(),
        ]);
    }
}