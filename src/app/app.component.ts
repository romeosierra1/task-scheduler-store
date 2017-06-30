import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store, State } from '@ngrx/store';
import { TaskService } from 'app/services/task.service';
import { UserService } from 'app/services/user.service';
import { Router } from '@angular/router';

import { PublicComponent } from 'app/components/public/public.component';
import { UserComponent } from 'app/components/user/user.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Task Scheduler';
  userid = '';
  constructor(private taskService: TaskService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.userid = this.userService.id;
    if (this.userid !== '') {
      this.taskService.initTasks();
    }
  }

  logout(): void {
    this.userid = '';
    this.userService.id = '';
    this.router.navigate(['login']);
  }
}
