import { Component, OnInit } from '@angular/core';
import { Task } from 'app/models/task';
import { TaskService } from 'app/services/task.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements OnInit {
  pendingTasks$: Observable<Task[]>;
  finishedTasks$: Observable<Task[]>;

  constructor(private taskService: TaskService, private router: Router) { }

  getTasks(): void {
    this.taskService.initTasks();
    this.pendingTasks$ = this.taskService.getPendingTasks();
    this.finishedTasks$ = this.taskService.getFinishedTasks();
  }

  delete(task: Task): void {
    this.taskService
      .delete(task.id);
  }

  ngOnInit(): void {
    this.taskService.authenticate();
    this.getTasks();
  }

  gotoDetail(task: Task): void {
    this.router.navigate(['/detail', task.id]);
  }

}
