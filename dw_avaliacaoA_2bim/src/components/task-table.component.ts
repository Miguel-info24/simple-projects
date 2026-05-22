import { Component, inject } from '@angular/core';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-table',
  standalone: true,
  template: `
    <div class="overflow-x-auto bg-white rounded-lg shadow-md border border-gray-200">
      <table class="w-full text-left border-collapse">
        <thead class="bg-gray-50">
          <tr>
            <th class="p-4 border-b">Nome</th>
            <th class="p-4 border-b">Tipo</th>
            <th class="p-4 border-b">Data</th>
            <th class="p-4 border-b">Ações</th>
          </tr>
        </thead>
        <tbody>
          @for (item of tasks(); track item.id) {
            <tr class="hover:bg-gray-50">
              <td class="p-4 border-b">{{ item.name }}</td>
              <td class="p-4 border-b">
                <span class="px-2 py-1 rounded text-xs bg-gray-200">{{ item.type }}</span>
              </td>
              <td class="p-4 border-b">{{ item.date }}</td>
              <td class="p-4 border-b">
                <button (click)="remove(item.id)" class="text-red-500 hover:underline">Excluir</button>
              </td>
            </tr>
          } @empty {
            <tr>
              <td colspan="4" class="p-8 text-center text-gray-500">Nenhuma atividade cadastrada.</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `
})
export class TaskTableComponent {

  private taskService = inject(TaskService);
  tasks = this.taskService.tasks; // Referência direta ao Signal

  remove(id: string) {
    this.taskService.removeTask(id);
  }
}
