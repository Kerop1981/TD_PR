import { Injectable } from '@angular/core';
import { TodoItem } from '../../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todos: TodoItem[] = [];

  constructor() {
    this.loadFromLocalStorage();
  }

  private loadFromLocalStorage(): void {
    const data = localStorage.getItem('todos');
    if (data) {
      this.todos = JSON.parse(data);
    }
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  private generateId(): string {
    return Date.now().toString();
  }

  addTodo(title: string, dueDate?: string): void {
    const newTodo: TodoItem = {
      id: this.generateId(),
      title,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0],
      dueDate: dueDate || '',
    };
    this.todos.push(newTodo);
    this.saveToLocalStorage();
  }

  updateStatus(id: string, newStatus: 'active' | 'completed' | 'archived'): void {
    const todo = this.todos.find((t) => t.id === id);
    if (todo) {
      todo.status = newStatus;
      this.saveToLocalStorage();
    }
  }

  editTitle(id: string, newTitle: string): void {
    const todo = this.todos.find((t) => t.id === id);
    if (todo) {
      todo.title = newTitle;
      this.saveToLocalStorage();
    }
  }

  deleteTodo(id: string): void {
    this.todos = this.todos.filter((t) => t.id !== id);
    this.saveToLocalStorage();
  }

  getTodos(): TodoItem[] {
    return this.todos;
  }

  updateDueDate(id: string, newDueDate: string): void {
    const todo = this.todos.find((t) => t.id === id);
    if (todo) {
      todo.dueDate = newDueDate;
      this.saveToLocalStorage();
    }
  }

  clearCompleted(): void {
    this.todos = this.todos.filter((todo) => todo.status !== 'completed');
    this.saveToLocalStorage();
  }
}
