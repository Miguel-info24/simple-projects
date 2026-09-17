<?php

namespace App\Services;

use App\Models\Conta;
use App\Models\User;
use App\Repositories\ClienteRepository;
use Illuminate\Support\Facades\Hash;

class ClienteService
{
    public function __construct(
        private ClienteRepository $repository
    ) {}

    public function listar()
    {
        return $this->repository->all();
    }

    public function buscar(int $id): User
    {
        return $this->repository->find($id);
    }

    public function criar(array $data): User
    {
        $saldo = $data['saldo'];
        $limite = $data['limite'];

        unset($data['saldo'], $data['limite']);

        $data['role_id'] = 3;
        $data['password'] = Hash::make($data['password']);

        $cliente = $this->repository->create($data);

        $cliente->conta()->create([
            'saldo' => $saldo,
            'limite' => $limite,
            'bloqueada' => false,
        ]);

        return $cliente;
    }

    public function atualizar(User $cliente, array $data): bool
    {
        unset($data['saldo'], $data['limite']);

        $data['role_id'] = 3;

        if (!empty($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']);
        }

        return $this->repository->update($cliente, $data);
    }

    public function excluir(User $cliente): bool
    {
        return $this->repository->delete($cliente);
    }

    public function bloquear(User $cliente): bool
    {
        return $cliente->conta->update([
            'bloqueada' => true,
        ]);
    }

    public function desbloquear(User $cliente): bool
    {
        return $cliente->conta->update([
            'bloqueada' => false,
        ]);
    }
}