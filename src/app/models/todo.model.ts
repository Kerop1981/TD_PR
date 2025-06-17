
type TodoStatus = 'active' | 'completed' | 'archived';

/**
 * Интерфейс задачи
 */
export interface TodoItem {
  id: string;
  title: string;
  status: TodoStatus;
  createdAt?: string;
  dueDate?: string;
}
 type TodoStatus = 'active'| 'completed'|'archived'

export interface TodoItem {
    id:string;
    title:string;
    status: TodoStatus;
    createdAt?: string;
    dueDate?: string;
} 
