import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Task } from 'app/task';
// import { TASKS } from "app/mock-tasks";

import * as moment from 'moment';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class TaskService {

  private tasksUrl = 'api/tasks';
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  getTasks(): Promise<Task[]> {
    return this.http.get(this.tasksUrl)
      .toPromise()
      .then((response) => {
        (response.json().data as Task[]).forEach((task) => {
          task.assignedOnHumanised = moment(task.assignedOn, 'YYYY-MM-DD').fromNow();
          const difference = moment(task.dueOn, 'YYYY-MM-DD').diff(moment(moment.now()).format('YYYY-MM-DD'));
          task.dueOnHumanised = moment.duration(difference).humanize(true);
        });
        return response.json().data;
      })
      .catch(this.handleError);
  }

  getTask(id: number): Promise<Task> {
    const url = `${this.tasksUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Task)
      .catch(this.handleError)
  }

  update(task: Task): Promise<Task> {
    const url = `${this.tasksUrl}/${task.id}`;

    task.dueOn = moment(task.dueOn).format('YYYY-MM-DD');

    return this.http.
      put(url, JSON.stringify(task), { headers: this.headers })
      .toPromise()
      .then(() => task)
      .catch(this.handleError)
  }

  create(taskTitle: string, taskDescription: string, assignedTo: string, dueOn: string): Promise<Task> {
    return this.http
      .post(this.tasksUrl, JSON.stringify({
        taskTitle: taskTitle,
        taskDescription: taskDescription,
        assignedTo: assignedTo,
        assignedOn: moment(moment.now()).format('YYYY-MM-DD'),
        dueOn: moment(dueOn, 'M/D/YYYY').format('YYYY-MM-DD'),
        finishedOn: '',
        assignedOnHumanised: '',
        dueOnHumanised: ''
      }), { headers: this.headers })
      .toPromise()
      .then(response => response.json().data as Task)
      .catch(this.handleError)
  }

  delete(id: number): Promise<void> {
    const url = `${this.tasksUrl}/${id}`;
    return this.http.delete(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  markAsFinished(task: Task): Promise<Task> {
    const url = `${this.tasksUrl}/${task.id}`;
    task.finishedOn = moment(moment.now()).format('YYYY-MM-DD');
    return this.http.put(url, JSON.stringify(task), { headers: this.headers })
      .toPromise()
      .then(() => task)
      .catch(this.handleError);
  }

  getPendingTasks(): Promise<Task[]> {
    return this.getTasks()
      .then(response => {
        return (response.filter((task) => task.finishedOn === ''));
      })
      .catch(this.handleError);
  }

  getFinishedTasks(): Promise<Task[]> {
    return this.getTasks()
      .then(response => {
        return (response.filter((task) => task.finishedOn !== ''));
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
