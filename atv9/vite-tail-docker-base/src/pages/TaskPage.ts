import { TaskService } from '../api/TaskService';
import { createTaskForm } from '../components/form';
import { createTaskTable } from '../components/table';

export const TaskPage = () => {
    const container = document.createElement('div');

    container.className =
        'min-h-screen bg-slate-100 py-12 px-4 sm:px-6 lg:px-8';

    const renderContent = () => {
        container.innerHTML = `
            <div class="max-w-4xl mx-auto">
                <header class="text-center mb-10">
                    <h1 class="text-4xl font-extrabold text-slate-900 tracking-tight">
                        Sistema Gerenciador de Atividades
                    </h1>

                    <p class="mt-2 text-lg text-slate-600">
                        Minhas Tarefas
                    </p>
                </header>

                <div id="form-container"></div>

                <div
                    id="table-container"
                    class="mt-8 shadow-sm"
                ></div>
            </div>
        `;

        const tasks = TaskService.getTasks();

        const form = createTaskForm((newTask) => {
            TaskService.saveTask(newTask);
            renderContent();
        });

        container
            .querySelector('#form-container')
            ?.appendChild(form);

        const table = createTaskTable(
            tasks,

            (id: string) => {
                TaskService.deleteTask(id);
                renderContent();
            },

            (id: string) => {
                TaskService.toggleTaskStatus(id);
                renderContent();
            }
        );

        container
            .querySelector('#table-container')
            ?.appendChild(table);
    };

    renderContent();

    return container;
};



 
