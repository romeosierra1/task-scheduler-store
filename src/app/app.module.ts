import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpModule } from '@angular/http';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from 'app/app-routing.module';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './common/in-memory-data.service';

import { AppComponent } from './app.component';
import { TaskService } from 'app/common/task.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule, MdNativeDateModule } from '@angular/material';
import { AllTasksComponent } from './all-tasks/all-tasks.component';
import { TaskDetailComponent } from 'app/task-detail/task-detail.component';
import { DashboardComponent } from 'app/dashboard/dashboard.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { tasks } from './common/task.reducer';

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
    StoreModule.provideStore(tasks)
  ],
  providers: [TaskService],
  bootstrap : [AppComponent]
})
export class AppModule { }

