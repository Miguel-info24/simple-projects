<?php

namespace App\Http\Controllers;

use App\Models\Conta;
use App\Models\SolicitacaoLimite;
use App\Services\SolicitacaoLimiteService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use App\Models\User;

class SolicitacaoLimiteController extends Controller
{
    public function __construct(
        private SolicitacaoLimiteService $service
    ) {}

    public function index()
    {
        Gate::authorize('viewSolicitacoesLimite', User::class);

        $solicitacoes = $this->service->listar();

        return view('solicitacoes_limite.index', compact('solicitacoes'));
    }

    public function create()
    {
        Gate::authorize('createSolicitacaoLimite', User::class);

        $contas = Conta::with('user')
            ->orderBy('id')
            ->get();

        return view('solicitacoes_limite.create', compact('contas'));
    }

    public function store(Request $request)
    {
        Gate::authorize('createSolicitacaoLimite', User::class);

        $data = $request->validate([
            'conta_id' => ['required', 'exists:contas,id'],
            'limite_solicitado' => ['required', 'numeric', 'min:0'],
            'motivo' => ['nullable', 'string', 'max:1000'],
        ]);

        $conta = Conta::findOrFail($data['conta_id']);

        $this->service->solicitar(
            $conta,
            (float) $data['limite_solicitado'],
            $data['motivo'] ?? null
        );

        return redirect()
            ->route('solicitacoes-limite.index')
            ->with('success', 'Solicitação de aumento de limite criada com sucesso.');
    }

    public function aprovar(int $id)
    {
        Gate::authorize('aprovarSolicitacaoLimite', User::class);

        $solicitacao = $this->service->buscar($id);

        $this->service->aprovar(
            $solicitacao,
            auth()->id()
        );

        return redirect()
            ->route('solicitacoes-limite.index')
            ->with('success', 'Solicitação aprovada com sucesso.');
    }

    public function reprovar(int $id)
    {
        Gate::authorize('reprovarSolicitacaoLimite', User::class);

        $solicitacao = $this->service->buscar($id);

        $this->service->reprovar(
            $solicitacao,
            auth()->id()
        );

        return redirect()
            ->route('solicitacoes-limite.index')
            ->with('success', 'Solicitação reprovada com sucesso.');
    }
}