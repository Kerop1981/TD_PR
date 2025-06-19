import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../todo-serve'; 
import { TodoItem } from '../../models/todo.model';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-component.html',
  styleUrl: './todo-component.css'
})
export class TodoComponent {
  /** Массив всех задач */
  todos: TodoItem[] = [];

  /** Введённый заголовок новой задачи */
  newTitle: string = '';

  /**
   * @param todoService Сервис для работы с задачами
   */
  constructor(private todoService: TodoService) {}

  /**
   * Инициализация компонента — загружаем список задач
   */
  ngOnInit(): void {
    this.todos = this.todoService.getTodos();
  }

  /**
   * Добавляет новую задачу в список, если поле не пустое
   */
  addTodo(): void {
    if (!this.newTitle.trim()) return;

    this.todoService.addTodo(this.newTitle.trim());
    this.newTitle = '';
    this.todos = this.todoService.getTodos();
  }

  /**
   * Удаляет задачу по её ID
   * @param id Идентификатор задачи
   */
  deleteTodo(id: string): void {
    this.todoService.deleteTodo(id);
    this.todos = this.todoService.getTodos();
  }

  updateStatus(id:string,status:TodoItem['status']):void {
    this.todoService.updateStatus(id,status)
  }

  editTitle( id:string, newTitle:string):void{
    this.todoService.editTitle(id,newTitle.trim());
  }
}
