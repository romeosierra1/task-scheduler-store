import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AllTasksComponent } from 'app/components/user/all-tasks/all-tasks.component';
import { DashboardComponent } from 'app/components/user/dashboard/dashboard.component';
import { NewTaskComponent } from 'app/components/user/new-task/new-task.component';
import { SearchTasksComponent } from 'app/components/user/search-tasks/search-tasks.component';
import { TaskDetailComponent } from 'app/components/user/task-detail/task-detail.component';
import { LoginComponent } from 'app/components/public/login/login.component';
import { SignupComponent } from 'app/components/public/signup/signup.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'alltasks',
    component: AllTasksComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'detail/:id',
    component: TaskDetailComponent
  },
  {
    path: 'task',
    component: NewTaskComponent
  },
  {
    path: 'search',
    component: SearchTasksComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
