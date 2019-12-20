import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  baseUrl = `${this.BASE_URL}api`;
  constructor(@Inject('BASE_URL') private BASE_URL: string, private http: HttpClient) {
    console.log(BASE_URL);
  }

  // this function returns an observable of type T in the form of JSON
  // the advantage of an observable : if it changes then this will fire off the change detection as the DOM has changed
  public get<T>(url: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${url}`);
  }

  public getForText(url: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${url}`, { responseType: 'text' });
  }

  public put<T>(url: string, itemToUpdate): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${url}`, itemToUpdate);
  }

  public post<T>(url: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${url}`, body);
  }

  public patch<T>(url: string, body: any): Observable<T> {
    return this.http.patch<T>(`${this.baseUrl}/${url}`, body);
  }

  public delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${url}`);
  }
}
