import { createAction, props } from '@ngrx/store';
import { pairs } from 'rxjs';
import { ActionType } from 'src/app/core/enum/action-type';
import { Todo } from 'src/app/core/model/todo';

export const init_todos = createAction(ActionType.INIT_TODOS);
export const init_todos_success = createAction(ActionType.INIT_TODOS_SUCCESS,props<{todos:Todo[]}>())
export const delete_todo = createAction(ActionType.DELETE_TODO,props<Todo>());
// export const new_todo = createAction('[TodoForm Component] New');
