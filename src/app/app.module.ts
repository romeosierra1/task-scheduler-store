import { AppRoutingModule } from 'app/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpModule } from '@angular/http';
import { MaterialModule, MdNativeDateModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { AllTasksComponent } from 'app/components/user/all-tasks/all-tasks.component';
import { DashboardComponent } from 'app/components/user/dashboard/dashboard.component';
import { NewTaskComponent } from 'app/components/user/new-task/new-task.component';
import { SearchTasksComponent } from 'app/components/user/search-tasks/search-tasks.component';
import { TaskDetailComponent } from 'app/components/user/task-detail/task-detail.component';
import { ToolbarComponent } from 'app/components/toolbar/toolbar.component';
import { LoginComponent } from 'app/components/public/login/login.component';
import { SignupComponent } from 'app/components/public/signup/signup.component';
import { PublicComponent } from 'app/components/public/public.component';
import { UserComponent } from 'app/components/user/user.component';

import { TaskService } from 'app/services/task.service';
import { UserService } from 'app/services/user.service';

import { tasksReducer } from 'app/reducers/task.reducer';


@NgModule({
  declarations: [
    AppComponent,
    AllTasksComponent,
    DashboardComponent,
    NewTaskComponent,
    SearchTasksComponent,
    TaskDetailComponent,
    ToolbarComponent,
    LoginComponent,
    SignupComponent,
    PublicComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FlexLayoutModule,
    AppRoutingModule,
    HttpModule,
    BrowserAnimationsModule,
    MaterialModule,
    MdNativeDateModule,
    ReactiveFormsModule,
    StoreModule.provideStore({ tasks: tasksReducer }),
  ],
  providers: [TaskService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
