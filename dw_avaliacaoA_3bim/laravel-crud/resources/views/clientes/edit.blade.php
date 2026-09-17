<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            Editar Cliente
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-2xl mx-auto sm:px-6 lg:px-8">

            <div class="bg-white shadow-sm sm:rounded-lg p-6">

                <form
                    action="{{ route('clientes.update', $cliente->id) }}"
                    method="POST"
                >
                    @csrf
                    @method('PUT')

                    <div class="mb-4">
                        <label class="block mb-1">
                            Nome
                        </label>

                        <input
                            type="text"
                            name="name"
                            value="{{ old('name', $cliente->name) }}"
                            class="w-full border rounded"
                        >

                        @error('name')
                            <p class="text-red-600 text-sm">
                                {{ $message }}
                            </p>
                        @enderror
                    </div>

                    <div class="mb-4">
                        <label class="block mb-1">
                            E-mail
                        </label>

                        <input
                            type="email"
                            name="email"
                            value="{{ old('email', $cliente->email) }}"
                            class="w-full border rounded"
                        >

                        @error('email')
                            <p class="text-red-600 text-sm">
                                {{ $message }}
                            </p>
                        @enderror
                    </div>

                    <div class="mb-4">
                        <label class="block mb-1">
                            Nova senha
                        </label>

                        <input
                            type="password"
                            name="password"
                            class="w-full border rounded"
                        >

                        <p class="text-sm text-gray-500">
                            Deixe vazio para manter a senha atual.
                        </p>

                        @error('password')
                            <p class="text-red-600 text-sm">
                                {{ $message }}
                            </p>
                        @enderror
                    </div>

                    <div class="mb-6">
                        <label class="block mb-1">
                            Confirmar nova senha
                        </label>

                        <input
                            type="password"
                            name="password_confirmation"
                            class="w-full border rounded"
                        >
                    </div>

                    <div class="flex gap-2">
                        <a
                            href="{{ route('clientes.index') }}"
                            class="px-4 py-2 bg-gray-500 text-white rounded"
                        >
                            Voltar
                        </a>

                        <button
                            type="submit"
                            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Atualizar
                        </button>
                    </div>
                </form>

            </div>

        </div>
    </div>
</x-app-layout>