import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap,map } from 'rxjs/operators';
import { ActionType } from 'src/app/core/enum/action-type';
import { Todo } from 'src/app/core/model/todo';
import { init_todos, init_todos_success } from '../actions/todo.actions';
import { TodoService } from '../shared/todo.service';


@Injectable({
  providedIn: 'root'
})
export class TodoEffectService {

  loadTodos$:any = createEffect( () => this.actions$.pipe(
      ofType(ActionType.INIT_TODOS),
      switchMap( () => this.todoService.findAll()),
      map((todos) => init_todos_success({todos}))
    )
  )

  deleteTodo$ = createEffect(() => this.actions$.pipe(
    ofType(ActionType.DELETE_TODO),
    switchMap( (todo:Todo) => this.todoService.delete(todo)),
    map(() => init_todos())
  ));


  constructor(private actions$: Actions,private todoService:TodoService) { }
}
