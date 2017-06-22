import { Component, OnInit } from '@angular/core';
import { Task } from 'app/common/task';
import { TaskService } from 'app/common/task.service';
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
    this.pendingTasks$ = this.taskService.getPendingTasks();
    this.finishedTasks$ = this.taskService.getFinishedTasks();
  }

  delete(task: Task): void {
    this.taskService
      .delete(task.id);
  }

  ngOnInit(): void {
    this.getTasks();
  }

  gotoDetail(task: Task): void {
    this.router.navigate(['/detail', task.id]);
  }

}
