export interface Task {
  id: number;
  taskTitle: string;
  taskDescription: string;
  assignedTo: string;
  assignedOn: string;
  dueOn: string;
  finishedOn: string;
  assignedOnHumanised: string;
  dueOnHumanised: string;
}

export interface AppState {
  tasks: Task[];
}
