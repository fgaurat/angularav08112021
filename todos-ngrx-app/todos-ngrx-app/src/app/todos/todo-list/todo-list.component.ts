import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/core/model/todo';
import { TodoService } from '../shared/todo.service';
import {Observable,merge} from 'rxjs'
import {tap,map, switchMap,filter}  from 'rxjs/operators'
import { MessageBusService } from 'src/app/shared/services/message-bus.service';
import { Action } from 'src/app/core/model/action';
import { ActionType } from 'src/app/core/enum/action-type';
import { Store } from '@ngrx/store';
import { delete_todo, init_todos } from '../actions/todo.actions';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit{

  todos$!:Observable<any>
  displayedColumns = ['id','title','dueDate','completed','action']

  constructor(private store: Store<{ stateTodo: any }>) {
    this.todos$ = this.store.select("stateTodo")

    // this.todos$ = this.store.select("stateTodo").pipe(
    //   map((o:any) => o.todoList)
    //   )
  }
  ngOnInit(): void {
    this.store.dispatch(init_todos())
  }




  deleteTodo(todo:Todo):void{
    this.store.dispatch(delete_todo(todo));


    // this.todos$ = this.todoService.delete(todo).pipe(
    //   switchMap((data:void) => this.todoService.findAll()),
    //   tap((data:Todo[]) => console.log(data))
    // )
//    this.todos$ = this.todoService.deleteAndFindAll(todo)
    // const action:Action = {type:ActionType.DELETE_TODO,payload:todo}
    // this.bus.dispatch(action)


  }


}
