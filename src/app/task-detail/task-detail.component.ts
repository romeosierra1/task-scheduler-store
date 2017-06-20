import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { Task } from 'app/common/task';
import { TaskService } from 'app/common/task.service';
import 'rxjs/add/operator/switchMap'

@Component({
  selector: 'task-detail',
  templateUrl: './task-detail.component.html'
})

export class TaskDetailComponent implements OnInit {
  task: Task;
  constructor(private taskService: TaskService, private route: ActivatedRoute, private location: Location) { }
  ngOnInit(): void {
     this.route.params
      .switchMap((params: Params) => this.taskService.getTask(+params['id']))
      .subscribe(task => this.task = task);
  }

  save(): void {
    this.taskService.update(this.task);
    this.goBack();
  }

  finished(): void {
    this.taskService.markAsFinished(this.task);
    this.goBack();
  }

  goBack(): void {
    this.location.back();
  }
}
