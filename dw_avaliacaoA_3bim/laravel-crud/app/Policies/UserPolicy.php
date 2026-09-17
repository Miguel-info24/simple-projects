<?php

namespace App\Policies;

use App\Models\User;
use App\Services\PermissionService;

class UserPolicy
{
    public function __construct(
        private PermissionService $permissionService
    ) {}

    // Gerente Geral → Gerentes de Conta

    public function viewGerentes(User $user): bool
    {
        return $this->permissionService
            ->isAuthorized('gerentes.index', $user);
    }

    public function createGerente(User $user): bool
    {
        return $this->permissionService
            ->isAuthorized('gerentes.create', $user);
    }

    public function editGerente(User $user): bool
    {
        return $this->permissionService
            ->isAuthorized('gerentes.edit', $user);
    }

    public function deleteGerente(User $user): bool
    {
        return $this->permissionService
            ->isAuthorized('gerentes.delete', $user);
    }

    // Gerente de Conta -> Clientes

    public function viewClientes(User $user): bool
    {
        return $this->permissionService
            ->isAuthorized('clientes.index', $user);
        
    }

    public function createCliente(User $user): bool
    {
        return $this->permissionService
            ->isAuthorized('clientes.create', $user);
    }

    public function editCliente(User $user): bool
    {
        return $this->permissionService
            ->isAuthorized('clientes.edit', $user);
    }

    public function deleteCliente(User $user): bool
    {
        return $this->permissionService
            ->isAuthorized('clientes.delete', $user);
    }

        // Solicitação de aumento de limite

    public function viewSolicitacoesLimite(User $user): bool
    {
        return $this->permissionService
            ->isAuthorized('solicitacoes-limite.index', $user);
    }

    public function createSolicitacaoLimite(User $user): bool
    {
        return $this->permissionService
            ->isAuthorized('solicitacoes-limite.create', $user);
    }

    public function aprovarSolicitacaoLimite(User $user): bool
    {
        return $this->permissionService
            ->isAuthorized('solicitacoes-limite.approve', $user);
    }

    public function reprovarSolicitacaoLimite(User $user): bool
    {
        return $this->permissionService
            ->isAuthorized('solicitacoes-limite.reject', $user);
    }

    public function bloquearCliente(User $user): bool
    {
        return $this->permissionService
            ->isAuthorized('clientes.bloquear', $user);
    }

    public function desbloquearCliente(User $user): bool
    {
        return $this->permissionService
            ->isAuthorized('clientes.desbloquear', $user);
    }
}