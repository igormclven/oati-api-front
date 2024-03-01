import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Grades {
  subject: string;
  grade: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-starter';

  data: Grades[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.http.get<Grades[]>('http://localhost:8080/listAllGrades').subscribe((data) => {
      this.data = data;
    });
  }

}

