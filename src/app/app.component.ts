import { Component, isDevMode, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { debugStream } from './debug-stream/debug-stream';
import { rxjsDevTools } from './debug-stream/dev-tools';
import { noop, Subject } from 'rxjs';

if (isDevMode()) {
  rxjsDevTools();
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'Rxjs Redux DevTools';
  public triggerNumberChange$ = new Subject<number>();
  constructor(
    private http: HttpClient
  ) {}

  public ngOnInit(): void {
    this.initListeners();
  }

  public getTodoItemSuccess(): void {
    const url = 'https://jsonplaceholder.typicode.com/todos/1';
    this.http.get(url)
    .pipe(
      debugStream('[App Component] Get Todo item')
    ).subscribe(res => console.log(res));
  }

  public getTodoItemError(): void {
    const url = 'https://jsonplaceholder.typicode.com/some-random/1';
    this.http.get(url)
    .pipe(
      debugStream('[App Component] Get Todo item')
    ).subscribe(res => console.log(res));
  }

  public triggerNumberChange(): void {
   this.triggerNumberChange$
   .next(Math.floor(Math.random()* 1000));
  }

  private initListeners(): void {
    this.triggerNumberChange$
    .pipe(
      debugStream('[App Component] Number Change')
    ).subscribe(noop);
  }


}
