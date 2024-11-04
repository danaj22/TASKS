export interface Task {
  id: string;
  name: string;
  isDone?: boolean;
}

export interface TaskCollection {
  id: number;
  name: string;
  tasks: Task[];
}
