import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MessageService} from "./message.service";
import {Observable, of} from "rxjs";
import {Developer} from "./developer/developer";
import {catchError, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DeveloperService {

  private developersUrl = '/api/v1/developers';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getDevelopers(): Observable<Developer[]> {
    return this.http.get<Developer[]>(this.developersUrl)
      .pipe(
        tap(_ => this.log('get developers')),
        catchError(this.handleError<Developer[]>('[> Fetch All]', []))
      );
  }

  getDeveloper(id: number): Observable<Developer> {
    const url = `${this.developersUrl}/${id}`;
    return this.http.get<Developer>(url).pipe(
      tap(_ => this.log(`get developer: id=${id}`)),
      catchError(this.handleError<Developer>('[> Fetch One]'))
    );
  }

  updateDeveloper(developer: Developer): Observable<any> {
    const url = `${this.developersUrl}/${developer.id}`;
    return this.http.put(url, developer, this.httpOptions).pipe(
      tap(_ => {
        this.log(`update developer: id=${developer.id}`);
        this.warning();
      }),
      catchError(this.handleError<any>('[> Update]'))
    );
  }

  // addDeveloper(hero: Developer): Observable<Developer> {
  //   return this.http.post<Developer>(this.developersUrl, hero, this.httpOptions).pipe(
  //     tap((newDeveloper: Developer) => this.log(`added developer: id=${newDeveloper.id} first_name=${newDeveloper.first_name} last_name=${newDeveloper.last_name}`)),
  //     catchError(this.handleError<Developer>('[> Add]'))
  //   );
  // }

  deleteDeveloper(id: number | undefined): Observable<Developer> {
    const url = `${this.developersUrl}/${id}`;

    return this.http.delete<Developer>(url, this.httpOptions).pipe(
      tap(_ => {
        this.log(`delete developer id=${id}`);
        this.warning();
      }),
      catchError(this.handleError<Developer>('[> Delete]'))
    );
  }

  private warning(type = 'success', message = '') {
    alert(type == 'success' ? 'Success' : message);
  }

  private log(message: string) {
    this.messageService.add(`[Developer] ${message}`);
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
