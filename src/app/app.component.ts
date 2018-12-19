import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'forkJoin';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const example = forkJoin([
      this.http.get('https://swapi.co/api/people/1/').pipe(catchError(error => of(error))),
      this.http.get('https://swapi.co/api/people/1/').pipe(catchError(error => of(error))),
      this.http.get('/api/people/1').pipe(catchError(error => of(error)))
    ]);

    example.subscribe(responses => {
      const successResponces = [];
      const errorResponces = [];

      responses.map(res => (res instanceof HttpErrorResponse ? errorResponces.push(res) : successResponces.push(res)));

      console.log(successResponces, errorResponces);
    });
  }
}
