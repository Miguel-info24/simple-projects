<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Dashboard') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900 dark:text-gray-100">
                    {{ __("You're logged in!") }}
                </div>
                
            </div>
            @if (auth()->user()->role_id === 1)

                {{-- Dashboard do Gerente Geral --}}
                <div class="mt-6">
                    <h2>Gerente Geral</h2>

                    <div class="mt-6 space-y-4">

                        <a
                            href="{{ route('gerentes.index') }}"
                            class="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Gerenciar Gerentes de Conta
                        </a>

                        <a
                            href="{{ route('solicitacoes-limite.index') }}"
                            class="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Solicitações de Aumento de Limite
                        </a>

                    </div>
                </div>

            @elseif (auth()->user()->role_id === 2)

                {{-- Dashboard do Gerente de Conta --}}
                <div class="mt-6">
                    <h2>Gerente de Conta</h2>

                    <div class="mt-6 space-y-4">

                        <a
                            href="{{ route('clientes.index') }}"
                            class="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Gerenciar Clientes
                        </a>

                        <a
                            href="{{ route('solicitacoes-limite.index') }}"
                            class="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Solicitações de Aumento de Limite
                        </a>

                    </div>
                </div>

            @elseif (auth()->user()->role_id === 3)

                {{-- Dashboard do Cliente --}}
                ...
            @endif
        </div>
    </div>
</x-app-layout>
