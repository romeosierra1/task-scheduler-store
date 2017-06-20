import { Component, OnInit } from '@angular/core';
import { Task } from 'app/task';
import { TaskService } from 'app/task.service';
import { Router } from '@angular/router';
import { MdDatepickerModule } from '@angular/material';

@Component({
  selector: 'all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.css']
})
export class AllTasksComponent implements OnInit {
  tasks: Task[];
  selectedTask: Task;
  constructor(private taskService: TaskService, private router: Router) { }
  onSelect(task: Task): void {
    this.selectedTask = task;
  }

  getTasks(): void {
    this.taskService.getTasks()
      .then(tasks => {
        this.tasks = tasks;
        console.log(this.tasks);
      });
  }
  gotoDetail(task: Task): void {
    this.router.navigate(['/detail', task.id]);
  }

  delete(task: Task): void {
    this.taskService
      .delete(task.id)
      .then(() => {
        this.tasks = this.tasks.filter(t => t !== task);
        if (this.selectedTask === task) { this.selectedTask = null }
      })
  }

  ngOnInit(): void {
    this.getTasks();
  }
}
