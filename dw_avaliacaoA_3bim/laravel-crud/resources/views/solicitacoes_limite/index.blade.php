<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            Solicitações de Aumento de Limite
        </h2>
    </x-slot>

    <div class="py-8">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">

            @if (session('success'))
                <div class="mb-6 p-4 bg-green-100 text-green-800 rounded-lg">
                    {{ session('success') }}
                </div>
            @endif

            <div class="bg-white shadow-sm sm:rounded-lg p-6">

                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-lg font-semibold text-gray-800">
                        Solicitações
                    </h3>

                    @if (auth()->user()->role_id === 2)
                        <a
                            href="{{ route('solicitacoes-limite.create') }}"
                            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Nova Solicitação
                        </a>
                    @endif
                </div>

                @if ($solicitacoes->isEmpty())
                    <div class="text-center py-10 text-gray-500">
                        Nenhuma solicitação encontrada.
                    </div>
                @else
                    <div class="overflow-x-auto">
                        <table class="w-full border-collapse">
                            <thead>
                                <tr class="border-b text-left">
                                    <th class="px-4 py-3">ID</th>
                                    <th class="px-4 py-3">Cliente</th>
                                    <th class="px-4 py-3">Limite Atual</th>
                                    <th class="px-4 py-3">Limite Solicitado</th>
                                    <th class="px-4 py-3">Status</th>
                                    <th class="px-4 py-3">Motivo</th>
                                    <th class="px-4 py-3">Analisado por</th>
                                    <th class="px-4 py-3">Ações</th>
                                </tr>
                            </thead>

                            <tbody>
                                @foreach ($solicitacoes as $solicitacao)
                                    <tr class="border-b hover:bg-gray-50">

                                        <td class="px-4 py-3">
                                            {{ $solicitacao->id }}
                                        </td>

                                        <td class="px-4 py-3">
                                            {{ $solicitacao->conta->user->name }}
                                        </td>

                                        <td class="px-4 py-3">
                                            R$ {{ number_format($solicitacao->limite_atual, 2, ',', '.') }}
                                        </td>

                                        <td class="px-4 py-3">
                                            R$ {{ number_format($solicitacao->limite_solicitado, 2, ',', '.') }}
                                        </td>

                                        <td class="px-4 py-3">
                                            {{ $solicitacao->status }}
                                        </td>

                                        <td class="px-4 py-3">
                                            {{ $solicitacao->motivo ?? '—' }}
                                        </td>

                                        <td class="px-4 py-3">
                                            {{ $solicitacao->aprovador->name ?? '—' }}
                                        </td>

                                        <td class="px-4 py-3">
                                            @if (
                                                auth()->user()->role_id === 1 &&
                                                $solicitacao->status === 'Pendente'
                                            )
                                                <div class="flex gap-2">

                                                    <form
                                                        action="{{ route('solicitacoes-limite.aprovar', $solicitacao->id) }}"
                                                        method="POST"
                                                    >
                                                        @csrf

                                                        <button
                                                            type="submit"
                                                            class="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                                        >
                                                            Aprovar
                                                        </button>
                                                    </form>

                                                    <form
                                                        action="{{ route('solicitacoes-limite.reprovar', $solicitacao->id) }}"
                                                        method="POST"
                                                    >
                                                        @csrf

                                                        <button
                                                            type="submit"
                                                            class="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                                        >
                                                            Reprovar
                                                        </button>
                                                    </form>

                                                </div>
                                            @else
                                                <span class="text-gray-400">
                                                    —
                                                </span>
                                            @endif
                                        </td>

                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                @endif

            </div>
        </div>
    </div>
</x-app-layout>