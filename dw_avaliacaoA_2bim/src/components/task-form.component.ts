import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()" class="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-200">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input formControlName="name" placeholder="Nome da atividade" class="border p-2 rounded w-full" />
        <select formControlName="type" class="border p-2 rounded w-full">
          <option value="">Selecione o tipo</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Estudo">Estudo</option>
          <option value="Lazer">Lazer</option>
        </select>
        <input type="date" formControlName="date" class="border p-2 rounded w-full" />
      </div>
      <button type="submit" [disabled]="form.invalid" class="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50">
        Cadastrar Atividade
      </button>
    </form>
  `
})
export class TaskFormComponent {

  private fb = inject(NonNullableFormBuilder);
  private taskService = inject(TaskService);

  form = this.fb.group({
    name: ['', [Validators.required]],
    type: ['', [Validators.required]],
    date: ['', [Validators.required]]
  });

  submit() {
    if (this.form.valid) {
      this.taskService.addTask({
        ...this.form.getRawValue(),
        id: crypto.randomUUID()
      });
      this.form.reset();
    }
  }
}
