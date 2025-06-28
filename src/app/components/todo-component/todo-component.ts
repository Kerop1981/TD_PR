import { Component, inject } from '@angular/core';
import { TodoService } from './todo-service';
import { TodoItem } from '../../models/todo.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-component.html',
  styleUrl: './todo-component.css',
})
export class TodoComponent {
  private todoService = inject(TodoService);

  todos$: Observable<TodoItem[]> = this.todoService.todos$;

  newTitle = '';
  newDueDate?: string;
  selectedStatus = 'all';

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

  updateStatus(id: string, newStatus: 'active' | 'completed' | 'archived'): void {
    this.todoService.updateStatus(id, newStatus);
  }

  updateDueDate(id: string, newDueDate: string): void {
    this.todoService.updateDueDate(id, newDueDate);
  }
}
