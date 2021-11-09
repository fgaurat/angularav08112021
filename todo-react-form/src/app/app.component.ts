import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'todo-react-form';

  todoForm = this.fb.group({
    title:["",Validators.required],
    completed:[false],
    dueDate:[new Date()],
    aliases: this.fb.array([
      this.fb.control('')
    ])

  })


  constructor(private fb:FormBuilder){
  }
  ngOnInit(): void {
    this.todoForm.valueChanges.subscribe((data:any) => console.log(data))
  }

  onSubmit(){}

  get aliases() {
    return this.todoForm.get('aliases') as FormArray;
  }

  addAlias() {
    this.aliases.push(this.fb.control(''));
  }

}
