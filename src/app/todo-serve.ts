import { Injectable } from '@angular/core';
import { TodoItem } from './models/todo.model'; 

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos: TodoItem[] = [];

  /**
   * Генерирует уникальный идентификатор задачи на основе текущего времени.
   * @returns {string} Уникальный ID
   */
  private generateId(): string {
    return Date.now().toString();
  }

  /**
   * Добавляет новую задачу в список.
   * @param {string} title Название задачи
   */
  addTodo(title: string): void {
    const newTodo: TodoItem = {
      id: this.generateId(),
      title,
      status: 'active',
      
    };
    this.todos.push(newTodo);
  }

  /**
   * Обновляет статус существующей задачи.
   * @param {string} id ID задачи
   * @param {'active' | 'completed' | 'archived'} newStatus Новый статус задачи
   */
  updateStatus(id: string, newStatus: 'active' | 'completed' | 'archived'): void {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.status = newStatus;
    }
  }

  /**
   * Изменяет заголовок задачи.
   * @param {string} id ID задачи
   * @param {string} newTitle Новый заголовок
   */
  editTitle(id: string, newTitle: string): void {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.title = newTitle;
    }
  }

  /**
   * Удаляет задачу из списка по ID.
   * @param {string} id ID задачи
   */
  deleteTodo(id: string): void {
    this.todos = this.todos.filter(t => t.id !== id);
  }

  /**
   * Возвращает текущий список всех задач.
   * @returns {TodoItem[]} Массив всех задач
   */
  getTodos(): TodoItem[] {
    return this.todos;
  }
}
