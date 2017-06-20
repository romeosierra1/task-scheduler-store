import { Store } from '@ngrx/store';
import { Task } from './task';
import { Action } from '@ngrx/store';

export const tasks = (_tasks: Array<Task> = [], action: Action) => {
  switch (action.type) {
    case 'CREATE':
      return [
        ..._tasks,
        action.payload
      ];
    case 'UPDATE':
      return _tasks.map(_task => {
        if (_task.id === action.payload.id) {
          return Object.assign({}, _task, action.payload);
        }
        return _task;
      });
    case 'DELETE':
      return _tasks.filter(_task => _task.id !== action.payload);
    case 'MARK_AS_FINISHED':
      return _tasks.map(_task => {
        if (_task.id === action.payload.id) {
          return Object.assign({}, _task, {
            finishedOn: action.payload.finishedOn
          });
        }
        return _task;
      });

    default:
      return _tasks;
  }
}
