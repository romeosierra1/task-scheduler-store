import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Task, AppState } from 'app/models/task';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Store } from '@ngrx/store';
import { CREATE_TASK, UPDATE_TASK, DELETE_TASK, MARK_TASK_AS_FINISHED } from 'app/reducers/task.reducer';

import * as moment from 'moment';
import { Router } from '@angular/router';
import { UserService } from 'app/services/user.service';

@Injectable()
export class TaskService {
  store: Store<AppState>;
  apiUrl = 'https://taskschedulerbackend.herokuapp.com';

  private headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });

  constructor(private http: Http,
    store: Store<AppState>,
    private router: Router,
    private userService: UserService) {
    this.store = store;
  }

  initTasks(): void {
    this.http.get(`${this.apiUrl}/tasks/${this.userService.id}`)
      .subscribe(response => {
        const tasks = response.json() as Task[];
        tasks.forEach(task => {
          this.store.dispatch({
            type: CREATE_TASK,
            payload: task
          });
        })
      });
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

  getTask(id: string): Observable<Task> {
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
    this.http.put(`${this.apiUrl}/tasks/${task.id}`, JSON.stringify(task))
      .subscribe(response => {
        if (response.status === 200) {
          this.store.dispatch({
            type: UPDATE_TASK, payload: task
          });
        }
      });
  }

  create(taskTitle: string, taskDescription: string, assignedTo: string, dueOn: string): void {
    this.http.post(`${this.apiUrl}/task`,
      JSON.stringify({
        taskTitle: taskTitle,
        taskDescription: taskDescription,
        assignedBy: this.userService.id,
        assignedTo: assignedTo,
        assignedOn: moment(moment.now()).format('YYYY-MM-DD'),
        dueOn: moment(dueOn, ['DD-MM-YYYY', 'MM-DD-YYYY', 'YYYY-MM-DD', 'ddd DD MMM YYYY', 'ddd MMM DD YYYY']).format('YYYY-MM-DD'),
        finishedOn: '',
        assignedOnHumanised: '',
        dueOnHumanised: ''
      }), /*{ headers: this.headers }*/)
      .subscribe(response => {
        if (response.status === 200) {
          this.store.dispatch({
            type: CREATE_TASK,
            payload: response.json()
          });
        }
      });
  }

  delete(id: string): void {
    this.http.delete(`${this.apiUrl}/tasks/${id}`)
      .subscribe(response => {
        if (response.status === 200) {
          this.store.dispatch({
            type: DELETE_TASK, payload: id
          });
        }
      });
  }

  markAsFinished(task: Task): void {
    task.finishedOn = moment(moment.now()).format('YYYY-MM-DD');
    this.http.put(`${this.apiUrl}/tasks/${task.id}`, JSON.stringify(task))
      .subscribe(response => {
        if (response.status === 200) {
          this.store.dispatch({
            type: MARK_TASK_AS_FINISHED, payload: task
          });
        }
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

  getSearchedTasks(query: string): Observable<Task[]> {
    return this.store.select<Task[]>('tasks').map((tasks) => {
      return tasks.filter((task) => task.taskTitle.toLowerCase().startsWith(query.toLowerCase()));
    })
  }
  authenticate(): void {
    if (this.userService.id === '') {
      this.router.navigate(['login']);
    }
  }
}
