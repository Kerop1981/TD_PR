import { Component, inject } from '@angular/core';
import { TodoService } from './todo-service';
import { TodoItem, TodoStatus } from '../../models/todo.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-component.html',
  styleUrl: './todo-component.css',
})
export class TodoComponent {
  private filter$ = new BehaviorSubject<'all' | TodoStatus>('all');
  private todoService = inject(TodoService);

  todos$: Observable<TodoItem[]> = this.todoService.todos$;

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

    this.todoService.addTodo(this.newTitle.trim(), this.newDueDate);
    this.newTitle = '';
    this.newDueDate = '';
  }

  editTitle(id: string, newTitle: string): void {
    this.todoService.editTitle(id, newTitle);
  }

  deleteTodo(id: string): void {
    this.todoService.deleteTodo(id);
  }

  updateStatus(id: string, newStatus: TodoStatus): void {
    this.todoService.updateStatus(id, newStatus);
  }

  updateDueDate(id: string, newDueDate: string): void {
    this.todoService.updateDueDate(id, newDueDate);
  }
}
