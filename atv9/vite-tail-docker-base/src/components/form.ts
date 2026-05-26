export const createTaskForm = (
    onSubmit: (data: any) => void
) => {
    const form = document.createElement('form');

    form.className =
        'flex flex-col gap-4 bg-slate-50 p-6 rounded-xl border border-slate-200 mb-8';

    form.innerHTML = `
        <div class="flex flex-col md:flex-row gap-4">
            <input
                type="text"
                id="task"
                placeholder="Nome da atividade..."
                required
                class="flex-1 px-4 py-2 rounded-lg border border-slate-300
                focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />

            <select
                id="category"
                class="px-4 py-2 rounded-lg border border-slate-300 bg-white
                focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="Trabalho">Trabalho</option>
                <option value="Pessoal">Pessoal</option>
                <option value="Estudos">Estudos</option>
            </select>
        </div>

        <label class="flex items-center gap-2 text-slate-700 font-medium">
            <input
                type="checkbox"
                id="completed"
                class="w-4 h-4 text-blue-600 rounded border-slate-300
                focus:ring-blue-500"
            />
            Tarefa finalizada
        </label>

        <button
            type="submit"
            class="bg-blue-600 hover:bg-blue-700 text-white font-semibold
            px-6 py-2 rounded-lg transition-colors duration-200 self-start"
        >
            Adicionar
        </button>
    `;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const taskInput = form.querySelector(
            '#task'
        ) as HTMLInputElement;

        const categorySelect = form.querySelector(
            '#category'
        ) as HTMLSelectElement;

        const completedInput = form.querySelector(
            '#completed'
        ) as HTMLInputElement;

        onSubmit({
            id: crypto.randomUUID(),
            task: taskInput.value,
            category: categorySelect.value,
            completed: completedInput.checked,
            date: new Date().toLocaleDateString(),
        });

        form.reset();
    });

    return form;
};



