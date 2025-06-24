import { Pipe, PipeTransform } from '@angular/core';
import { TodoItem } from '../models/todo.model';

@Pipe({
  name: 'statusFilter',
  standalone: true
})
export class StatusFilterPipe implements PipeTransform {

  transform(todos: TodoItem[], status: string): TodoItem[] {
   if (!todos) return [];

   if(status === 'all') return todos;
   return todos.filter(todo => todo.status === status);

  }

}
