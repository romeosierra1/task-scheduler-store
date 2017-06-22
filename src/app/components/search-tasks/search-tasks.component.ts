import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Task } from 'app/models/task';
import { TaskService } from 'app/services/task.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-search-tasks',
  templateUrl: './search-tasks.component.html',
  styleUrls: ['./search-tasks.component.css']
})
export class SearchTasksComponent implements OnInit {

  searchedTasks$: Observable<Task[]>
  search: FormControl;

  constructor(private taskService: TaskService, private router: Router) { }

  getSearchedTasks(query: string): void {
      // .subscribe((tasks) => console.log(tasks));
  }

  delete(task: Task): void {
    this.taskService.delete(task.id);
  }
  gotoDetail(task: Task): void {
    this.router.navigate(['/detail', task.id]);
  }

  ngOnInit() {
    this.search = new FormControl();
    this.searchedTasks$ = this.search.valueChanges
      .debounceTime(500)
      .switchMap((term) => {
        if (term.trim().length === 0) {
          return Observable.of([]);
        } else {
          return this.taskService.getSearchedTasks(term);
        }
      })
  }

}
