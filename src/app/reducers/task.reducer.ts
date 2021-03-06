import { Action, Store } from '@ngrx/store';
import { Task } from 'app/models/task';

import * as moment from 'moment';

export const CREATE_TASK = '[Task] Create a new Task';
export const UPDATE_TASK = '[Task] Update a Task';
export const DELETE_TASK = '[Task] Delete a task';
export const MARK_TASK_AS_FINISHED = '[Task] Mark a task as finished';

export function tasksReducer(_tasks: Array<Task> = [], action: Action) {
  switch (action.type) {
    case CREATE_TASK:
      return [
        ..._tasks,
        action.payload
      ];
    case UPDATE_TASK:
      return _tasks.map(_task => {
        if (_task.id === action.payload.id) {
          return Object.assign({}, _task, action.payload);
        }
        return _task;
      });
    case DELETE_TASK:
      return _tasks.filter(_task => _task.id !== action.payload);
    case MARK_TASK_AS_FINISHED:
      return _tasks.map(_task => {
        if (_task.id === action.payload.id) {
          return Object.assign({}, _task, {
            finishedOn: action.payload.finishedOn
          });
        }
        return _task;
      });

    default:
      return _tasks.map(_task => {
        _task.assignedOnHumanised = moment(_task.assignedOn, 'YYYY-MM-DD').fromNow();
        const difference = moment(_task.dueOn, 'YYYY-MM-DD').diff(moment(moment.now()).format('YYYY-MM-DD'));
        _task.dueOnHumanised = moment.duration(difference).humanize(true);
        return _task;
      });
  }
};
