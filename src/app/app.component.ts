import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store, State } from '@ngrx/store';
import { TaskService } from 'app/services/task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Task Scheduler';

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.initTasks();
  }
}
