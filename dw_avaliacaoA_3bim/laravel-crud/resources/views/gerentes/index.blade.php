<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            Gerentes de Conta
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
                    href="{{ route('gerentes.create') }}"
                    class="px-4 py-2 bg-blue-600 text-white rounded"
                >
                    Novo Gerente
                </a>
            </div>

            <div class="bg-white shadow-sm sm:rounded-lg overflow-hidden">
                <table class="w-full">
                    <thead class="bg-gray-100">
                        <tr>
                            <th class="px-6 py-3 text-left">ID</th>
                            <th class="px-6 py-3 text-left">Nome</th>
                            <th class="px-6 py-3 text-left">E-mail</th>
                            <th class="px-6 py-3 text-left">Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        @forelse ($gerentes as $gerente)
                            <tr class="border-t">
                                <td class="px-6 py-4">
                                    {{ $gerente->id }}
                                </td>

                                <td class="px-6 py-4">
                                    {{ $gerente->name }}
                                </td>

                                <td class="px-6 py-4">
                                    {{ $gerente->email }}
                                </td>

                                <td class="px-6 py-4 flex gap-2">
                                    <a
                                        href="{{ route('gerentes.edit', $gerente->id) }}"
                                        class="px-3 py-1 bg-yellow-500 text-white rounded"
                                    >
                                        Editar
                                    </a>

                                    <form
                                        action="{{ route('gerentes.destroy', $gerente->id) }}"
                                        method="POST"
                                    >
                                        @csrf
                                        @method('DELETE')

                                        <button
                                            type="submit"
                                            class="px-3 py-1 bg-red-600 text-white rounded"
                                        >
                                            Excluir
                                        </button>
                                    </form>
                                </td>
                            </tr>
                        @empty
                            <tr>
                                <td
                                    colspan="4"
                                    class="px-6 py-4 text-center"
                                >
                                    Nenhum Gerente de Conta cadastrado.
                                </td>
                            </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>

        </div>
    </div>
</x-app-layout>