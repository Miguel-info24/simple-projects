<?php

namespace App\Repositories;

use App\Models\User;

class GerenteContaRepository
{
    public function all()
    {
        return User::where('role_id', 2)
            ->orderBy('name')
            ->get();
    }

    public function find(int $id): User
    {
        return User::where('role_id', 2)
            ->findOrFail($id);
    }

    public function create(array $data): User
    {
        return User::create($data);
    }

    public function update(User $gerente, array $data): bool
    {
        return $gerente->update($data);
    }

    public function delete(User $gerente): bool
    {
        return $gerente->delete();
    }
}