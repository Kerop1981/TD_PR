export enum TodoStatus {
  Active = 'active',
  Completed = 'completed',
  Archived = 'archived',
}

export interface TodoItem {
  id: string;
  title: string;
  status: TodoStatus;
  createdAt?: string;
  dueDate?: string;
}
