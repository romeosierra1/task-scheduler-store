import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Task, AppState } from 'app/models/task';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Store } from '@ngrx/store';
import { CREATE_TASK, UPDATE_TASK, DELETE_TASK, MARK_TASK_AS_FINISHED } from 'app/reducers/task.reducer';

import * as moment from 'moment';

@Injectable()
export class TaskService {
  store: Store<AppState>;
  id = 0;

  constructor(private http: Http, store: Store<AppState>) {
    this.store = store;
  }

  getTasks(): Observable<Task[]> {
    return this.store.select<Task[]>('tasks').map((tasks) => {
      return tasks.map((task => {
        task.assignedOnHumanised = moment(task.assignedOn, 'YYYY-MM-DD').fromNow();
        const difference = moment(task.dueOn, 'YYYY-MM-DD').diff(moment(moment.now()).format('YYYY-MM-DD'));
        task.dueOnHumanised = moment.duration(difference).humanize(true);
        return task;
      }))
    });
  }

  getTask(id: number): Observable<Task> {
    let _task;
    this.store.select<Task[]>('tasks').forEach((tasks) => {
      tasks.forEach((task) => {
        if (task.id === id) {
          _task = task;
        }
      })
    });
    return Observable.of(_task);
  }

  update(task: Task): void {
    task.dueOn = moment(task.dueOn).format('YYYY-MM-DD');
    this.store.dispatch({
      type: UPDATE_TASK, payload: task
    });
  }

  create(taskTitle: string, taskDescription: string, assignedTo: string, dueOn: string): void {
    this.store.dispatch({
      type: CREATE_TASK, payload: {
        id: ++this.id,
        taskTitle: taskTitle,
        taskDescription: taskDescription,
        assignedTo: assignedTo,
        assignedOn: moment(moment.now()).format('YYYY-MM-DD'),
        dueOn: moment(dueOn).format('YYYY-MM-DD'),
        finishedOn: '',
        assignedOnHumanised: '',
        dueOnHumanised: ''
      }
    });
  }

  delete(id: number): void {
    this.store.dispatch({
      type: DELETE_TASK, payload: id
    });
  }

  markAsFinished(task: Task): void {
    task.finishedOn = moment(moment.now()).format('YYYY-MM-DD');
    this.store.dispatch({
      type: MARK_TASK_AS_FINISHED, payload: task
    });
  }

  getPendingTasks(): Observable<Task[]> {
    return this.store.select<Task[]>('tasks').map((tasks) => {
      return tasks.filter((task) => task.finishedOn === '');
    });
  }

  getFinishedTasks(): Observable<Task[]> {
    return this.store.select<Task[]>('tasks').map((tasks) => {
      return tasks.filter((task) => task.finishedOn !== '');
    });
  }
}
