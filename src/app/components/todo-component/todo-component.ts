import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { TodoService } from './todo-service';
import { TodoItem } from '../../models/todo.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-component.html',
  styleUrl: './todo-component.css',
})
export class TodoComponent implements OnInit, OnDestroy {
  private todoService = inject(TodoService);
  takedestroy$ = new Subject<void>();

  todos$: Observable<TodoItem[]> = this.todoService.todos$;
  newTitle = '';
  newDueDate?: string;
  selectedStatus = 'all';

  constructor(private todoservice: TodoService) {}

  addTodo(): void {
    if (!this.newTitle.trim()) return;

    this.todoService.addTodo(this.newTitle.trim(), this.newDueDate);
    this.newTitle = '';
    this.newDueDate = '';
  }

  ngOnInit(): void {
    this.todoService.todos$.pipe(takeUntil(this.takedestroy$)).subscribe((todos) => {
      console.log(todos);
    });
  }

  ngOnDestroy(): void {
    this.takedestroy$.next();
    this.takedestroy$.complete();
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
