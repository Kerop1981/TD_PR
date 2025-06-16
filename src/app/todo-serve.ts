import { Injectable } from '@angular/core';
import { TodoItem } from './models/todo.model'; 

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos: TodoItem[] = [];

  // Генерация ID по времени
  private generateId(): string {
    return Date.now().toString();
  }

  // Добавить новую задачу
  addTodo(title: string): void {
    const newTodo: TodoItem = {
      id: this.generateId(),
      title,
      status: 'active',
      completed: false
    };
    this.todos.push(newTodo);
  }

  // Изменить статус задачи
  updateStatus(id: string, newStatus: 'active' | 'completed' | 'archived'): void {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.status = newStatus;
    }
  }

  // Редактировать название задачи
  editTitle(id: string, newTitle: string): void {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.title = newTitle;
    }
  }

  // Удалить задачу
  deleteTodo(id: string): void {
    this.todos = this.todos.filter(t => t.id !== id);
  }

  // Получить список задач
  getTodos(): TodoItem[] {
    return this.todos;
  }
}