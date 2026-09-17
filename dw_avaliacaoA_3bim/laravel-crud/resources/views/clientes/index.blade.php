<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            Clientes
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">

            @if (session('success'))
                <div class="mb-4 p-4 bg-green-100 text-green-800 rounded">
                    {{ session('success') }}
                </div>
            @endif

            <div class="mb-4">
                <a
                    href="{{ route('clientes.create') }}"
                    class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Novo Cliente
                </a>
            </div>

            <div class="bg-white shadow-sm sm:rounded-lg overflow-hidden">
                <table class="w-full">
                    <thead class="bg-gray-100">
                        <tr>
                            <th class="px-6 py-3 text-left">ID</th>
                            <th class="px-6 py-3 text-left">Nome</th>
                            <th class="px-6 py-3 text-left">E-mail</th>
                            <th class="px-6 py-3 text-left">Saldo</th>
                            <th class="px-6 py-3 text-left">Limite</th>
                            <th class="px-6 py-3 text-left">Ações</th>
                            <th class="px-6 py-3">Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        @forelse ($clientes as $cliente)
                            <tr class="border-t">
                                <td class="px-6 py-4">
                                    {{ $cliente->id }}
                                </td>

                                <td class="px-6 py-4">
                                    {{ $cliente->name }}
                                </td>

                                <td class="px-6 py-4">
                                    {{ $cliente->email }}
                                </td>

                                <td class="px-6 py-4">
                                    R$ {{ number_format((float) $cliente->conta->saldo, 2, ',', '.') }}
                                </td>

                                <td class="px-6 py-4">
                                    R$ {{ number_format((float) $cliente->conta->limite, 2, ',', '.') }}
                                </td>
                                <td class="px-6 py-4">
                                    @if ($cliente->conta->bloqueada)
                                        <span class="text-red-600 font-semibold">
                                            Bloqueada
                                        </span>
                                    @else
                                        <span class="text-green-600 font-semibold">
                                            Ativa
                                        </span>
                                    @endif
                                </td>

                                <td class="px-4 py-3">
                                    <div class="flex gap-2">

                                        <a
                                            href="{{ route('clientes.edit', $cliente->id) }}"
                                            class="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                        >
                                            Editar
                                        </a>

                                        @if ($cliente->conta->bloqueada)

                                            <form
                                                action="{{ route('clientes.desbloquear', $cliente->id) }}"
                                                method="POST"
                                            >
                                                @csrf

                                                <button
                                                    type="submit"
                                                    class="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                                >
                                                    Desbloquear
                                                </button>
                                            </form>

                                        @else

                                            <form
                                                action="{{ route('clientes.bloquear', $cliente->id) }}"
                                                method="POST"
                                            >
                                                @csrf

                                                <button
                                                    type="submit"
                                                    class="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                                >
                                                    Bloquear
                                                </button>
                                            </form>

                                        @endif

                                        <form
                                            action="{{ route('clientes.destroy', $cliente->id) }}"
                                            method="POST"
                                        >
                                            @csrf
                                            @method('DELETE')

                                            <button
                                                type="submit"
                                                class="px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                                            >
                                                Excluir
                                            </button>
                                        </form>

                                    </div>
                                </td>
                            </tr>
                        @empty
                            <tr>
                                <td
                                    colspan="6"
                                    class="px-6 py-4 text-center"
                                >
                                    Nenhum cliente cadastrado.
                                </td>
                            </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>

        </div>
    </div>
</x-app-layout>