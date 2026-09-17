<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            Nova Solicitação de Aumento de Limite
        </h2>
    </x-slot>

    <div class="py-8">
        <div class="max-w-2xl mx-auto sm:px-6 lg:px-8">

            <div class="bg-white shadow-sm sm:rounded-lg p-6">

                <form
                    action="{{ route('solicitacoes-limite.store') }}"
                    method="POST"
                    class="space-y-6"
                >
                    @csrf

                    <div>
                        <label
                            for="conta_id"
                            class="block text-sm font-medium text-gray-700"
                        >
                            Cliente
                        </label>

                        <select
                            name="conta_id"
                            id="conta_id"
                            required
                            class="mt-1 block w-full rounded-lg border-gray-300 shadow-sm"
                        >
                            <option value="">
                                Selecione um cliente
                            </option>

                            @foreach ($contas as $conta)
                                <option
                                    value="{{ $conta->id }}"
                                    {{ old('conta_id') == $conta->id ? 'selected' : '' }}
                                >
                                    {{ $conta->user->name }}
                                    - Limite atual: R$
                                    {{ number_format($conta->limite, 2, ',', '.') }}
                                </option>
                            @endforeach
                        </select>

                        @error('conta_id')
                            <p class="mt-1 text-sm text-red-600">
                                {{ $message }}
                            </p>
                        @enderror
                    </div>

                    <div>
                        <label
                            for="limite_solicitado"
                            class="block text-sm font-medium text-gray-700"
                        >
                            Novo limite desejado
                        </label>

                        <input
                            type="number"
                            name="limite_solicitado"
                            id="limite_solicitado"
                            value="{{ old('limite_solicitado') }}"
                            min="0"
                            step="0.01"
                            required
                            class="mt-1 block w-full rounded-lg border-gray-300 shadow-sm"
                        >

                        @error('limite_solicitado')
                            <p class="mt-1 text-sm text-red-600">
                                {{ $message }}
                            </p>
                        @enderror
                    </div>

                    <div>
                        <label
                            for="motivo"
                            class="block text-sm font-medium text-gray-700"
                        >
                            Motivo da solicitação
                        </label>

                        <textarea
                            name="motivo"
                            id="motivo"
                            rows="4"
                            class="mt-1 block w-full rounded-lg border-gray-300 shadow-sm"
                            placeholder="Informe o motivo do aumento de limite"
                        >{{ old('motivo') }}</textarea>

                        @error('motivo')
                            <p class="mt-1 text-sm text-red-600">
                                {{ $message }}
                            </p>
                        @enderror
                    </div>

                    <div class="flex justify-end gap-3">

                        <a
                            href="{{ route('solicitacoes-limite.index') }}"
                            class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                        >
                            Cancelar
                        </a>

                        <button
                            type="submit"
                            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Enviar Solicitação
                        </button>

                    </div>

                </form>

            </div>

        </div>
    </div>
</x-app-layout>