export interface Task {
  id: string;
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
