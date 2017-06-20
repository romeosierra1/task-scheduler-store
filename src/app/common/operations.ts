import { ActionReducer, Action, State } from '@ngrx/store';
import { Task } from '../common/task';

export const CREATE = 'Create new task';
export const UPDATE = 'Update a task';
export const DELETE = 'Delete a task';
export const MARK_AS_FINISHED = 'Mark a task as finished';

export const tasksReducer = (state = [], action: Action) => {
  switch (action.type) {
    case CREATE:
      return [action.payload, ...state];
    case DELETE:
      return state.filter((item, index) => index !== action.payload);
    case UPDATE:
      return state.map((item, index) => {
        return index === action.payload.index
          ? Object.assign({}, item, { value: action.payload.newValue })
          : item
      });
  }
}

