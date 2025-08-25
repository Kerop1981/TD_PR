import { Component, inject } from '@angular/core';
import { TodoService } from './todo-service';
import { TodoItem, TodoStatus } from '../../models/todo.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-component.html',
  styleUrl: './todo-component.css',
})
export class TodoComponent {
  private filter$ = new BehaviorSubject<'all' | TodoStatus>('all');
  private Storage = inject(TodoService);

  todos$: Observable<TodoItem[]> = this.Storage.todos$.pipe(
    map((todos) =>
      this.selectedStatus === 'all' ? todos : todos.filter((t) => t.status === this.selectedStatus)
    )
  );

  newTitle = '';
  newDueDate = '';
  selectedStatus: 'all' | TodoStatus = 'all';
  protected readonly TodoStatus = TodoStatus;

  setFilter(value: 'all' | TodoStatus) {
    this.selectedStatus = value;
    this.filter$.next(value);
  }

  addTodo(): void {
    if (!this.newTitle.trim()) return;

    this.Storage.addTodo(this.newTitle.trim(), this.newDueDate);
    this.newTitle = '';
    this.newDueDate = '';
  }

  editTitle(id: string, newTitle: string): void {
    this.Storage.editTitle(id, newTitle);
  }

  deleteTodo(id: string): void {
    this.Storage.deleteTodo(id);
  }

  updateStatus(id: string, newStatus: TodoStatus): void {
    this.Storage.updateStatus(id, newStatus);
  }

  updateDueDate(id: string, newDueDate: string): void {
    this.Storage.updateDueDate(id, newDueDate);
  }
}
