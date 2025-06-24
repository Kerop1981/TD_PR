import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../todo-serve';
import { TodoItem } from '../../models/todo.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StatusFilterPipe } from '../../pipes/status-filter-pipe';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule,StatusFilterPipe],
  templateUrl: './todo-component.html',
  styleUrl: './todo-component.css'
})
export class TodoComponent implements OnInit {
  todos: TodoItem[] = [];
  newTitle: string = '';
  newDueDate?: string;
  selectedStatus: string = 'all';


  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todos = this.todoService.getTodos(); 
  }


  addTodo(): void {
    if (!this.newTitle.trim()) return;

    this.todoService.addTodo(this.newTitle.trim(), this.newDueDate);
    this.todos = this.todoService.getTodos(); 
    this.newTitle = '';
    this.newDueDate = '';
  }

  editTitle(id: string, newTitle: string): void {
    this.todoService.editTitle(id, newTitle);
    this.todos = this.todoService.getTodos();
  }

  deleteTodo(id: string): void {
    this.todoService.deleteTodo(id);
    this.todos = this.todoService.getTodos();
  }

  updateStatus(id: string, newStatus: 'active' | 'completed' | 'archived'): void {
    this.todoService.updateStatus(id, newStatus);
    this.todos = this.todoService.getTodos();
  }

  updateDueDate(id: string, newDueDate: string): void {
    this.todoService.updateDueDate(id, newDueDate);
    this.todos = this.todoService.getTodos();
  }

  get totalCount(): number {
    return this.todos.length;
  }

  get activeCount():number {
    return this.todos.filter(todo => todo.status === 'active').length
  }

  get CompletedCount(): number {
    return this.todos.filter(todo => todo.status === 'completed').length
  }

  get arhiveCount(): number {
    return this.todos.filter(todo => todo.status === 'archived').length
  }

  clearCompleted(): void {
    this.todoService.clearCompleted();
    this.todos = this.todoService.getTodos()
  }
}
