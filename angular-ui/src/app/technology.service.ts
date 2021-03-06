import { Injectable } from '@angular/core';
import {Technology} from "./technology/technology";
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TechnologyService {

  private baseUrl = environment.apiUrl;
  private technologiesUrl = this.baseUrl + 'api/v1/technologies';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }).append('Authorization', 'Basic ' + btoa(environment.username + ':' + environment.password))
  };

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getTechnologies(page: number = 1, per_page: number = 10): Observable<any> {
    let _httpOptions = this.httpOptions;
    Object.assign(_httpOptions, {observe: 'response'});
    return this.http.get(`${this.technologiesUrl}?page=${page}&per_page=${per_page}`, _httpOptions)
      .pipe(
        tap(_ => this.log('get technologies')),
        catchError(this.handleError<Technology[]>('[> Fetch All]', []))
      );
  }

  getTechnology(id: number): Observable<Technology> {
    const url = `${this.technologiesUrl}/${id}`;
    return this.http.get<Technology>(url, this.httpOptions).pipe(
      tap(_ => this.log(`get technology: id=${id}`)),
      catchError(this.handleError<Technology>('[> Fetch One]'))
    );
  }

  updateTechnology(technology: Technology): Observable<any> {
    const url = `${this.technologiesUrl}/${technology.id}`;
    return this.http.put(url, technology, this.httpOptions).pipe(
      tap(_ => {
        this.log(`update technology: id=${technology.id}`);
        this.warning();
      }),
      catchError(this.handleError<any>('[> Update]'))
    );
  }

  addTechnology(hero: Technology): Observable<Technology> {
    return this.http.post<Technology>(this.technologiesUrl, hero, this.httpOptions).pipe(
      tap((newTechnology: Technology) => {
        this.log(`added technology: id=${newTechnology.id} name=${newTechnology.name}`);
        this.warning();
      }),
      catchError(this.handleError<Technology>('[> Add]'))
    );
  }

  deleteTechnology(id: number | undefined): Observable<Technology> {
    const url = `${this.technologiesUrl}/${id}`;

    return this.http.delete<Technology>(url, this.httpOptions).pipe(
      tap(_ => {
        this.log(`delete technology id=${id}`);
        this.warning();
      }),
      catchError(this.handleError<Technology>('[> Delete]'))
    );
  }

  private warning(type = 'success', message = '') {
    alert(type == 'success' ? 'Success' : message);
  }

  private log(message: string) {
    this.messageService.add(`[Technology] ${message}`);
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
