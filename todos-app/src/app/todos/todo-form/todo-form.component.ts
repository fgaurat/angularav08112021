import { Component, OnInit } from '@angular/core';
import { ActionType } from 'src/app/core/enum/action-type';
import { Action } from 'src/app/core/model/action';
import { Todo } from 'src/app/core/model/todo';
import { MessageBusService } from 'src/app/shared/services/message-bus.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {

  todoForm:Todo = {
      title:"le titre de la todo",
      completed:false,
      dueDate:new Date().getTime(),
  }

  constructor(private bus:MessageBusService) { }

  ngOnInit(): void {
  }

  submit(){
    const action:Action = {type:ActionType.NEW_TODO,payload:this.todoForm}
    this.bus.dispatch(action)
  }

}
