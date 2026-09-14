<?php

namespace App\Services;

use App\Models\User;
use App\Repositories\GerenteContaRepository;
use Illuminate\Support\Facades\Hash;

class GerenteContaService
{
    public function __construct(
        private GerenteContaRepository $repository
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
        $data['role_id'] = 2;
        $data['password'] = Hash::make($data['password']);

        return $this->repository->create($data);
    }

    public function atualizar(User $gerente, array $data): bool
    {
        $data['role_id'] = 2;

        if (!empty($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']);
        }

        return $this->repository->update($gerente, $data);
    }

    public function excluir(User $gerente): bool
    {
        return $this->repository->delete($gerente);
    }
}