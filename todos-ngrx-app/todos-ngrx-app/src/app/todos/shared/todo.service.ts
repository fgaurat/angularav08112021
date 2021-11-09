import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Todo } from 'src/app/core/model/todo';
import { Observable } from 'rxjs';
import { catchError, switchMap,tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http:HttpClient) { }

  findAll():Observable<Todo[]>{
    return this.http.get<Todo[]>(environment.url_todos);
  }


  delete(todo:Todo):Observable<void>{
    const url = `${environment.url_todos}/${todo.id}`
    return this.http.delete<void>(url)
  }

  deleteAndFindAll(todo:Todo):Observable<Todo[]>{
    const url = `${environment.url_todos}/${todo.id}`

    return this.http.delete<void>(url).pipe(
        switchMap((data:void) => this.findAll()),
        tap((data:Todo[]) => console.log(data)),
    )
  }

  save(todo:Todo):Observable<Todo>{
    return this.http.post<Todo>(environment.url_todos,todo,this.httpOptions)
  }

}
