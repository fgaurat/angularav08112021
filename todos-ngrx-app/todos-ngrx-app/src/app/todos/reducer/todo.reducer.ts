import { createReducer, on } from '@ngrx/store';
import { Todo } from 'src/app/core/model/todo';
import { init_todos_success } from '../actions/todo.actions';

// export const initialState:{todoList:Todo[]} = {
//   "todoList":[]
// };
export const initialState:Todo[] = [];

const _todoReducer = createReducer(
  initialState,
  on(init_todos_success, (state,action) => [...state,...action.todos]),
);

export function todoReducer(state:any, action:any) {
  return _todoReducer(state, action);
}
