<?php

namespace App\Repositories;

use App\Models\User;

class ClienteRepository
{
    public function all()
    {
        return User::where('role_id', 3)
            ->with('conta')
            ->orderBy('name')
            ->get();
    }

    public function find(int $id): User
    {
        return User::where('role_id', 3)
            ->with('conta')
            ->findOrFail($id);
    }

    public function create(array $data): User
    {
        return User::create($data);
    }

    public function update(User $cliente, array $data): bool
    {
        return $cliente->update($data);
    }

    public function delete(User $cliente): bool
    {
        return $cliente->delete();
    }
}