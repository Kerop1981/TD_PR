 type TodoStatus = 'active'| 'completed'|'archived'

export interface TodoItem {
    id:string;
    title:string;
    completed:boolean;
    status: TodoStatus;
    createdAt?: string;
    dueDate?: string;
}