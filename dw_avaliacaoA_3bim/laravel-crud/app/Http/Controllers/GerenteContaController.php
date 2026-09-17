<?php

namespace App\Http\Controllers;

use App\Services\GerenteContaService;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Gate;

class GerenteContaController extends Controller
{
    public function __construct(
        private GerenteContaService $service
    ) {}

    public function index()
    {
        Gate::authorize('viewGerentes', User::class);        
        $gerentes = $this->service->listar();

        return view('gerentes.index', compact('gerentes'));
    }

    public function create()
    {
        Gate::authorize('createGerente', User::class);
        return view('gerentes.create');
    }

    public function store(Request $request)
    {
        Gate::authorize('createGerente', User::class);
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        $this->service->criar($data);

        return redirect()
            ->route('gerentes.index')
            ->with('success', 'Gerente de Conta criado com sucesso.');
    }

    public function edit(int $id)
    {
        Gate::authorize('editGerente', User::class);
        $gerente = $this->service->buscar($id);

        return view('gerentes.edit', compact('gerente'));
    }

    public function update(Request $request, int $id)
    {
        Gate::authorize('editGerente', User::class);
        $gerente = $this->service->buscar($id);

        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'email',
                'max:255',
                Rule::unique('users', 'email')->ignore($gerente->id),
            ],
            'password' => ['nullable', 'string', 'min:8', 'confirmed'],
        ]);

        $this->service->atualizar($gerente, $data);

        return redirect()
            ->route('gerentes.index')
            ->with('success', 'Gerente de Conta atualizado com sucesso.');
    }

    public function destroy(int $id)
    {
        Gate::authorize('deleteGerente', User::class);
        $gerente = $this->service->buscar($id);

        $this->service->excluir($gerente);

        return redirect()
            ->route('gerentes.index')
            ->with('success', 'Gerente de Conta removido com sucesso.');
    }
}