import type { Task } from '../types/Task';
const STORAGE_KEY = 'vite_tasks_app';
export const TaskService = {
    getTasks(): Task[] {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    },
    saveTask(task: Task): void {
        const tasks = this.getTasks();
        tasks.push(task);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    },
    deleteTask(id: string): void {
        const tasks = this.getTasks();
        const filteredTasks = tasks.filter(task => task.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredTasks));
    },  
    toggleTaskStatus(id: string): void {
        const tasks = this.getTasks();
        const updatedTasks = tasks.map(task => {
            if (task.id === id) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));
    }
};
