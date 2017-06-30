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
import { AllTasksComponent } from 'app/components/all-tasks/all-tasks.component';
import { DashboardComponent } from 'app/components/dashboard/dashboard.component';
import { NewTaskComponent } from 'app/components/new-task/new-task.component';
import { SearchTasksComponent } from 'app/components/search-tasks/search-tasks.component';
import { TaskDetailComponent } from 'app/components/task-detail/task-detail.component';
import { ToolbarComponent } from 'app/components/toolbar/toolbar.component';

import { TaskService } from 'app/services/task.service';

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
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
