import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/core/model/todo';
import { TodoService } from '../shared/todo.service';
import {Observable,merge} from 'rxjs'
import {tap,map, switchMap,filter}  from 'rxjs/operators'
import { MessageBusService } from 'src/app/shared/services/message-bus.service';
import { Action } from 'src/app/core/model/action';
import { ActionType } from 'src/app/core/enum/action-type';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit,AfterViewInit {

  todos$!:Observable<Todo[]>
  displayedColumns = ['id','title','dueDate','completed','action']

  constructor(private todoService:TodoService, private bus:MessageBusService) { }

  ngAfterViewInit(): void {
    const action:Action = {type:ActionType.INIT_TODOS}
    this.bus.dispatch(action)

  }

  ngOnInit(): void {


    const new_todos$:Observable<Todo> = this.bus.bus$.pipe(
      filter((action:Action) => action.type == ActionType.NEW_TODO),
      switchMap((action:Action) => this.todoService.save(action.payload as Todo))
    )

    const delete_todo$:Observable<void> = this.bus.bus$.pipe(
      filter((action:Action) => action.type == ActionType.DELETE_TODO),
      switchMap((action:Action) => this.todoService.delete(action.payload as Todo))
    )

    const init_todo$:Observable<Action> = this.bus.bus$.pipe(
      filter((action:Action) => action.type == ActionType.INIT_TODOS),
    )

    this.todos$ = merge(new_todos$,delete_todo$,init_todo$).pipe(
      switchMap((_:any) => this.todoService.findAll())
    )

  }

  deleteTodo(todo:Todo):void{
    // this.todos$ = this.todoService.delete(todo).pipe(
    //   switchMap((data:void) => this.todoService.findAll()),
    //   tap((data:Todo[]) => console.log(data))
    // )
//    this.todos$ = this.todoService.deleteAndFindAll(todo)
    const action:Action = {type:ActionType.DELETE_TODO,payload:todo}
    this.bus.dispatch(action)


  }


}
