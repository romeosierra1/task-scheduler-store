import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Task } from 'app/task';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let tasks: Task[] = [
      {
        id: 1,
        taskTitle: 'Create a demo app in Angular',
        taskDescription: 'Create an app which uses the angular and other libraries for practice',
        assignedTo: 'Rajbir',
        assignedOn: '2017-06-13',
        assignedOnHumanised: '',
        dueOn: '2017-06-19',
        dueOnHumanised: '',
        finishedOn: '2017-06-19'
      },
      {
        id: 2,
        taskTitle: 'Implement ngrx/store in your app',
        taskDescription: 'Use ngrx/store in the demo app',
        assignedTo: 'Rajbir',
        assignedOn: '2017-06-19',
        assignedOnHumanised: '',
        dueOn: '2017-06-21',
        dueOnHumanised: '',
        finishedOn: ''
      },
    ];
    return { tasks };
  }
}
