import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from 'app/dashboard/dashboard.component';
import { AllTasksComponent } from 'app/all-tasks/all-tasks.component';
import { TaskDetailComponent } from 'app/task-detail/task-detail.component';
import { NewTaskComponent } from 'app/new-task/new-task.component';

const routes: Routes = [
  {
    path: 'alltasks',
    component: AllTasksComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'detail/:id',
    component: TaskDetailComponent
  },
  {
    path: 'task',
    component: NewTaskComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
