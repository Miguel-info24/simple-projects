import type { Task } from '../types/Task';

export const createTaskTable = (
    tasks: Task[],
    onDelete: (id: string) => void,
    onToggleStatus: (id: string) => void
) => {
    const wrapper = document.createElement('div');

    wrapper.className =
        'overflow-x-auto rounded-xl border border-slate-200';

    wrapper.innerHTML = `
        <table class="min-w-full divide-y divide-slate-200 bg-white">
            <thead class="bg-slate-50">
                <tr>
                    <th class="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Atividade
                    </th>

                    <th class="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Categoria
                    </th>

                    <th class="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Data
                    </th>

                    <th class="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Status
                    </th>

                    <th class="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Ações
                    </th>
                </tr>
            </thead>

            <tbody class="divide-y divide-slate-100">
                ${
                    tasks.length > 0
                        ? tasks
                              .map(
                                  (task) => `
                    <tr class="hover:bg-slate-50 transition-colors">
                        
                        <td class="px-6 py-4 text-sm text-slate-700 font-medium">
                            ${task.task}
                        </td>

                        <td class="px-6 py-4 text-sm">
                            <span class="px-2 py-1 rounded-md text-xs font-semibold ${getCategoryColor(task.category)}">
                                ${task.category}
                            </span>
                        </td>

                        <td class="px-6 py-4 text-sm text-slate-500">
                            ${task.date}
                        </td>

                        <td class="px-6 py-4 text-sm">
                            <span class="${
                                task.completed
                                    ? 'text-green-600 font-semibold'
                                    : 'text-yellow-600 font-semibold'
                            }">
                                ${
                                    task.completed
                                        ? 'Concluído'
                                        : 'Pendente'
                                }
                            </span>
                        </td>

                        <td class="px-6 py-4 text-sm flex gap-2">
                            <button
                                class="toggle-btn bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md"
                                data-id="${task.id}"
                            >
                                ${
                                    task.completed
                                        ? 'Desfazer'
                                        : 'Finalizar'
                                }
                            </button>

                            <button
                                class="delete-btn bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md"
                                data-id="${task.id}"
                            >
                                Excluir
                            </button>
                        </td>
                    </tr>
                `
                              )
                              .join('')
                        : `
                    <tr>
                        <td colspan="5" class="px-6 py-10 text-center text-slate-400 italic">
                            Nenhuma atividade cadastrada.
                        </td>
                    </tr>
                `
                }
            </tbody>
        </table>
    `;

    wrapper
        .querySelectorAll('.delete-btn')
        .forEach((button) => {
            button.addEventListener('click', () => {
                const id = (
                    button as HTMLButtonElement
                ).dataset.id;

                if (id) {
                    onDelete(id);
                }
            });
        });

    wrapper
        .querySelectorAll('.toggle-btn')
        .forEach((button) => {
            button.addEventListener('click', () => {
                const id = (
                    button as HTMLButtonElement
                ).dataset.id;

                if (id) {
                    onToggleStatus(id);
                }
            });
        });

    return wrapper;
};

function getCategoryColor(category: string) {
    switch (category) {
        case 'Trabalho':
            return 'bg-amber-100 text-amber-700';

        case 'Estudos':
            return 'bg-purple-100 text-purple-700';

        default:
            return 'bg-blue-100 text-blue-700';
    }
}



 
