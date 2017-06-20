import { Component, OnInit } from '@angular/core';
import { TaskService } from 'app/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {

  constructor(private taskService: TaskService, private router:Router) { }

  add(taskTitle: string, taskDescription: string, assignedTo: string, dueOn: string): void {
    taskTitle.trim();
    assignedTo.trim();
    if (!taskTitle && !taskDescription && !assignedTo && !dueOn) { return; }
    this.taskService.create(taskTitle, taskDescription, assignedTo, dueOn)
      .then(() => this.router.navigate(['/alltasks']))
      .catch();
  }

  ngOnInit() {
  }

}
