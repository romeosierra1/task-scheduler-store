import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Task } from 'app/common/task';
import { Store, State } from '@ngrx/store';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Task Scheduler';

}
