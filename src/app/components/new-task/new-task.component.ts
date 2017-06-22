import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TaskService } from 'app/services/task.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Task } from 'app/models/task';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewTaskComponent implements OnInit {
  constructor(private taskService: TaskService, private router: Router) { }

  add(taskTitle: string, taskDescription: string, assignedTo: string, dueOn: string): void {
    taskTitle.trim();
    assignedTo.trim();
    if (!taskTitle && !taskDescription && !assignedTo && !dueOn) { return; }
    this.taskService.create(taskTitle, taskDescription, assignedTo, dueOn);
    this.router.navigate(['alltasks']);
  }

  ngOnInit() {
  }

}
