import { Component, OnInit } from '@angular/core';
import { Task } from 'app/common/task';
import { TaskService } from 'app/common/task.service';
import { Router } from '@angular/router';
import { MdDatepickerModule } from '@angular/material';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.css']
})
export class AllTasksComponent implements OnInit {
  $tasks: Observable<Task[]>;

  constructor(private taskService: TaskService, private router: Router) { }
  getTasks(): void {
    this.$tasks = this.taskService.getTasks();
  }
  gotoDetail(task: Task): void {
    this.router.navigate(['/detail', task.id]);
  }

  delete(task: Task): void {
    this.taskService
      .delete(task.id);
  }

  ngOnInit(): void {
    this.getTasks();
  }
}
