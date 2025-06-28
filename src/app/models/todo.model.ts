type TodoStatus = 'active' | 'completed' | 'archived';

export interface TodoItem {
  id: string;
  title: string;
  status: TodoStatus;
  createdAt?: string;
  dueDate?: string;
}
