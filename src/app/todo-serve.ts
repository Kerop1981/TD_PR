import { Injectable } from '@angular/core';
import { Todo } from './models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todus: Todo[] = [];

  //получаю список задач
  getTodos(): Todo[] {
    return this.todus;
  }

  //Добавить зодачу
  addTodo(title: string):void {
    const newTodo: Todo = {
      id: Date.now().toString(),
      title,
      completed: false
    };
    this.todus.push(newTodo)
  }

  //Удалить задачу
  deleteTodo(id:string):void{
    this.todus = this.todus.filter(todo => todo.id === id);
  }

  //Переключить статус задачи
  toggleTodo(id: string): void{
    const todo = this.todus.find(t => t.id === id);
    if(todo){
      todo.completed = todo.completed
    }
  }
}
