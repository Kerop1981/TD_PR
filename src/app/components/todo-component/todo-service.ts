import { BehaviorSubject, delay, Observable, of } from 'rxjs';
import { TodoItem } from '../../models/todo.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todosSubject = new BehaviorSubject<TodoItem[]>([]);
  public todos$: Observable<TodoItem[]> = this.todosSubject.asObservable();

  private FAKE_USER_TODOS: TodoItem[] = [
    {
      id: '1',
      title: 'устроиться на работу',
      status: 'active',
      createdAt: '25.05.2025',
    },

    {
      id: '2',
      title: 'зарабатываать 350к',
      status: 'active',
      createdAt: '25.05.2025',
    },

    {
      id: '3',
      title: 'купить машину',
      status: 'active',
      createdAt: '25.05.2025',
    },
  ];

  constructor() {
    this.loadFromLocalStorage();
  }

  private loadTodos(): void {
    of(this.FAKE_USER_TODOS)
      .pipe(delay(1000))
      .subscribe((todos) => {
        this.todosSubject.next(todos);
      });
  }

  private loadFromLocalStorage(): void {
    const data = localStorage.getItem('todos');
    if (data) {
      const todos = JSON.parse(data) as TodoItem[];
      this.todosSubject.next(todos);
    }
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('todos', JSON.stringify(this.todosSubject.getValue()));
  }

  private generateId(): string {
    return Date.now().toString();
  }

  addTodo(title: string, dueDate?: string): void {
    const todos = this.todosSubject.getValue();
    const newTodo: TodoItem = {
      id: this.generateId(),
      title,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0],
      dueDate: dueDate || '',
    };
    this.todosSubject.next([...todos, newTodo]);
    this.saveToLocalStorage();
  }

  updateStatus(id: string, newStatus: 'active' | 'completed' | 'archived'): void {
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
