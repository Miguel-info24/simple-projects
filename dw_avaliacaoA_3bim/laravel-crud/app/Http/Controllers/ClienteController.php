<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\ClienteService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;

class ClienteController extends Controller
{
    public function __construct(
        private ClienteService $service
    ) {}

    public function index()
    {
        Gate::authorize('viewClientes', User::class);

        $clientes = $this->service->listar();

        return view('clientes.index', compact('clientes'));
    }

    public function create()
    {
        Gate::authorize('createCliente', User::class);

        return view('clientes.create');
    }

    public function store(Request $request)
    {
        Gate::authorize('createCliente', User::class);

        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'saldo' => ['required', 'numeric', 'min:0'],
            'limite' => ['required', 'numeric', 'min:0'],
        ]);

        $this->service->criar($data);

        return redirect()
            ->route('clientes.index')
            ->with('success', 'Cliente criado com sucesso.');
    }

    public function edit(int $id)
    {
        Gate::authorize('editCliente', User::class);

        $cliente = $this->service->buscar($id);

        return view('clientes.edit', compact('cliente'));
    }

    public function update(Request $request, int $id)
    {
        Gate::authorize('editCliente', User::class);

        $cliente = $this->service->buscar($id);

        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'email',
                'max:255',
                Rule::unique('users', 'email')->ignore($cliente->id),
            ],
            'password' => ['nullable', 'string', 'min:8', 'confirmed'],
        ]);

        $this->service->atualizar($cliente, $data);

        return redirect()
            ->route('clientes.index')
            ->with('success', 'Cliente atualizado com sucesso.');
    }

    public function destroy(int $id)
    {
        Gate::authorize('deleteCliente', User::class);

        $cliente = $this->service->buscar($id);

        $this->service->excluir($cliente);

        return redirect()
            ->route('clientes.index')
            ->with('success', 'Cliente removido com sucesso.');
    }
    public function bloquear(int $id)
    {
        Gate::authorize('bloquearCliente', User::class);

        $cliente = $this->service->buscar($id);

        $this->service->bloquear($cliente);

        return redirect()
            ->route('clientes.index')
            ->with('success', 'Conta do cliente bloqueada com sucesso.');
    }

    public function desbloquear(int $id)
    {
        Gate::authorize('desbloquearCliente', User::class);

        $cliente = $this->service->buscar($id);

        $this->service->desbloquear($cliente);

        return redirect()
            ->route('clientes.index')
            ->with('success', 'Conta do cliente desbloqueada com sucesso.');
    }
}