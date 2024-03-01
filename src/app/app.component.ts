import {Component, ViewChild} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {MatTableDataSource} from "@angular/material/table";
import {environment} from "../environments/environment";

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

  displayedColumns: string[] = ['subject','grade'];
  dataSource = new MatTableDataSource<Grades>();
  isLoading = true;
  isError: String;

  @ViewChild(MatTableDataSource) table: MatTableDataSource<Grades>;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchData();
  }
  fetchData() {

    this.http.get<Grades[]>(`${environment.apiUrl}/listAllGrades`).subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.isLoading = false;
      },
      error: (err): HttpErrorResponse => {
        this.isLoading = false;
        return this.isError = err.message;
      },
    });
  }

}

