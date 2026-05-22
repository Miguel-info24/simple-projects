
import { Injectable, inject, signal, effect } from '@angular/core';
import { Task } from '../models/task.model';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class TaskService {

  private storage = inject(StorageService);
  // Signal que armazena a lista de atividades
  private tasksSignal = signal<Task[]>(this.loadFromStorage());
  
  // Exposição pública do Signal (apenas leitura)
  tasks = this.tasksSignal.asReadonly();

  constructor() {
    // Effect que salva automaticamente no LocalStorage sempre que o Signal mudar
    effect(() => {
      this.storage.setItem('tasks', JSON.stringify(this.tasksSignal()));
    });
  }

  private loadFromStorage(): Task[] {

      const data = this.storage.getItem('tasks');
      return data ? JSON.parse(data) : [];
  }

  addTask(task: Task) {
    this.tasksSignal.update(list => [...list, task]);
  }

  removeTask(id: string) {
    this.tasksSignal.update(list => list.filter(a => a.id !== id));
  }
}
