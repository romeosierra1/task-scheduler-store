import { AppRoutingModule } from 'app/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpModule } from '@angular/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { MaterialModule, MdNativeDateModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { AllTasksComponent } from 'app/components/all-tasks/all-tasks.component';
import { DashboardComponent } from 'app/components/dashboard/dashboard.component';
import { NewTaskComponent } from 'app/components/new-task/new-task.component';
import { TaskDetailComponent } from 'app/components/task-detail/task-detail.component';
import { ToolbarComponent } from 'app/components/toolbar/toolbar.component';

import { InMemoryDataService } from 'app/services/in-memory-data.service';
import { TaskService } from 'app/services/task.service';

import { tasksReducer } from 'app/reducers/task.reducer';


@NgModule({
  declarations: [
    AppComponent,
    TaskDetailComponent,
    AllTasksComponent,
    DashboardComponent,
    AllTasksComponent,
    ToolbarComponent,
    NewTaskComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FlexLayoutModule,
    AppRoutingModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    BrowserAnimationsModule,
    MaterialModule,
    MdNativeDateModule,
    StoreModule.provideStore({ tasks: tasksReducer }),
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
