import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { MaterialModule } from '../shared/material.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TodoListComponent,
    TodoFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ],
  exports:[
    TodoListComponent,
    TodoFormComponent
  ],
  providers:[]
})
export class TodosModule { }
