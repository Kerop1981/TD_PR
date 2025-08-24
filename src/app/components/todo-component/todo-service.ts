import { BehaviorSubject, Observable } from 'rxjs';
import { TodoItem, TodoStatus } from '../../models/todo.model';
import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from '../../local-storage';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todosSubject = new BehaviorSubject<TodoItem[]>([]);
  public todos$: Observable<TodoItem[]> = this.todosSubject.asObservable();
  private storage = inject(LocalStorageService);

  constructor() {
    this.loadFromLocalStorage();
  }

  private loadFromLocalStorage(): void {
    const todos = this.storage.get<TodoItem[]>('todos');
    if (todos) {
      this.todosSubject.next(todos);
    }
  }

  private saveToLocalStorage(): void {
    this.storage.set('todos', this.todosSubject.getValue());
  }

  private generateId(): string {
    return Date.now().toString();
  }

  addTodo(title: string, dueDate?: string): void {
    const todos = this.todosSubject.getValue();
    const newTodo: TodoItem = {
      id: this.generateId(),
      title,
      status: TodoStatus.Active,
      createdAt: new Date().toISOString().split('T')[0],
      dueDate: dueDate || '',
    };
    this.todosSubject.next([...todos, newTodo]);
    this.saveToLocalStorage();
  }

  updateStatus(id: string, newStatus: TodoStatus): void {
    const todos = this.todosSubject
      .getValue()
      .map((todo) => (todo.id === id ? { ...todo, status: newStatus } : todo));
    this.todosSubject.next(todos);
    this.saveToLocalStorage();
  }

  editTitle(id: string, newTitle: string): void {
    const todos = this.todosSubject
      .getValue()
      .map((todo) => (todo.id === id ? { ...todo, title: newTitle } : todo));
    this.todosSubject.next(todos);
    this.saveToLocalStorage();
  }

  deleteTodo(id: string): void {
    const todos = this.todosSubject.getValue().filter((todo) => todo.id !== id);
    this.todosSubject.next(todos);
    this.saveToLocalStorage();
  }

  updateDueDate(id: string, newDueDate: string): void {
    const todos = this.todosSubject
      .getValue()
      .map((todo) => (todo.id === id ? { ...todo, dueDate: newDueDate } : todo));
    this.todosSubject.next(todos);
    this.saveToLocalStorage();
  }

  saveTodosToLocalStorage(): void {
    const todos = this.todosSubject.getValue().filter((todo) => todo.status !== 'completed');
    this.todosSubject.next(todos);
    this.saveToLocalStorage();
  }
}
