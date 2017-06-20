import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Task, AppState } from 'app/common/task';
// import { TASKS } from "app/mock-tasks";
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Store } from '@ngrx/store';

import * as moment from 'moment';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class TaskService {
  store: Store<AppState>;
  id = 0;
  $tasks: Observable<Task[]>;

  private tasksUrl = 'api/tasks';
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http, store: Store<AppState>) {
    this.store = store;
  }

  getTasks(): Observable<Task[]> {
    return this.store.select<Task[]>('tasks');
  }

  update(task: Task): void {
    task.dueOn = moment(task.dueOn).format('YYYY-MM-DD');
    this.store.dispatch({
      type: 'UPDATE', payload: task
    });
  }

  create(taskTitle: string, taskDescription: string, assignedTo: string, dueOn: string): void {
    this.store.dispatch({
      type: 'CREATE', payload: {
        id: ++this.id,
        taskTitle: taskTitle,
        taskDescription: taskDescription,
        assignedTo: assignedTo,
        assignedOn: moment(moment.now()).format('YYYY-MM-DD'),
        dueOn: moment(dueOn, 'M/D/YYYY').format('YYYY-MM-DD'),
        finishedOn: '',
        assignedOnHumanised: '',
        dueOnHumanised: ''
      }
    });
  }

  delete(id: number): void {
    this.store.dispatch({
      type: 'DELETE', payload: id
    });
  }

  markAsFinished(task: Task): void {
    task.finishedOn = moment(moment.now()).format('YYYY-MM-DD');
    this.store.dispatch({
      type: 'MARK_AS_FINISHED', payload: task
    });
  }

  // getPendingTasks(): void {
  //   return this.getTasks()
  //     .then(response => {
  //       return (response.filter((task) => task.finishedOn === ''));
  //     })
  // }

  // getFinishedTasks(): void {
  //   return this.getTasks()
  //     .then(response => {
  //       return (response.filter((task) => task.finishedOn !== ''));
  //     })
  // }
}
