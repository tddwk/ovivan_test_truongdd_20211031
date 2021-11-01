import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { MessageService } from "./message.service";
import { Observable, of } from "rxjs";
import { Project } from "./project/project";
import { catchError, tap } from "rxjs/operators";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private baseUrl = environment.apiUrl;
  private projectsUrl = this.baseUrl + 'api/v1/projects';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    .append('Authorization', 'Basic ' + btoa(environment.username + ':' + environment.password))
  };

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getProjects(page: number = 1, per_page: number = 10): Observable<any> {
    let _httpOptions = this.httpOptions;
    Object.assign(_httpOptions, {observe: 'response'});
    return this.http.get(`${this.projectsUrl}?page=${page}&per_page=${per_page}`, _httpOptions)
      .pipe(
        tap(_ => this.log('get projects')),
        catchError(this.handleError<Project[]>('[> Fetch All]', []))
      );
  }

  getProject(id: number): Observable<Project> {
    const url = `${this.projectsUrl}/${id}`;
    return this.http.get<Project>(url, this.httpOptions).pipe(
      tap(_ => this.log(`get project: id=${id}`)),
      catchError(this.handleError<Project>('[> Fetch One]'))
    );
  }

  updateProject(id: number, data: any): Observable<any> {
    const url = `${this.projectsUrl}/${id}`;
    return this.http.put(url, data, this.httpOptions).pipe(
      tap(_ => {
        this.log(`update project: id=${id}`);
        this.warning();
      }),
      catchError(this.handleError<any>('[> Update]'))
    );
  }

  addProject(data: any): Observable<Project> {
    return this.http.post<Project>(this.projectsUrl, data, this.httpOptions).pipe(
      tap((newProject: Project) => {
        this.log(`added project: id=${newProject.id} name=${newProject.name}`);
        this.warning();
      }),
      catchError(this.handleError<Project>('[> Add]'))
    );
  }

  deleteProject(id: number | undefined): Observable<Project> {
    const url = `${this.projectsUrl}/${id}`;

    return this.http.delete<Project>(url, this.httpOptions).pipe(
      tap(_ => {
        this.log(`delete project id=${id}`);
        this.warning();
      }),
      catchError(this.handleError<Project>('[> Delete]'))
    );
  }

  private warning(type = 'success', message = '') {
    alert(type == 'success' ? 'Success' : message);
  }

  private log(message: string) {
    this.messageService.add(`[Project] ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.log(`${operation} failed: ${error.message}`);

      if (error.error && typeof error.error === 'object') {
        let errors: string[];
        errors = Object.keys(error.error).map((key) => {
          return key + ": " + error.error[key].join("; ");
        });
        this.warning('error', `Error:\n${errors.join("\n")}`);
      }

      return of(result as T);
    };
  }
}
