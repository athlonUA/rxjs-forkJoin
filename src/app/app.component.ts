import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    this.http.get('/api/people/1').subscribe(json => console.log(json));

    const example = forkJoin([
      this.http.get('https://swapi.co/api/people/1/'),
      this.http.get('https://swapi.co/api/people/1/'),
      this.http.get('/api/people/1').pipe(catchError(error => of(error)))
    ]);

    example.subscribe(val => console.log(val));
  }
}
