import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../env/environment';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

  private formatErrors() {
    return throwError(() => {});
  }

  get(
    path: string,
    params: HttpParams = new HttpParams(),
  ): Observable<unknown> {
    return this.http
      .get(`${environment.apiUrl}${path}`, { params })
      .pipe(
        catchError(this.formatErrors),
        retry({ count: 3, delay: 2000, resetOnSuccess: true }),
      );
  }
  post(path: string, body: object = {}): Observable<unknown> {
    return this.http
      .post(`${environment.apiUrl}${path}`, JSON.stringify(body), {
        reportProgress: true,
      })
      .pipe(catchError(this.formatErrors));
  }
  put(path: string, body: object = {}): Observable<unknown> {
    return this.http
      .put(`${environment.apiUrl}${path}`, JSON.stringify(body))
      .pipe(catchError(this.formatErrors));
  }
  delete(path: string): Observable<unknown> {
    return this.http
      .delete(`${environment.apiUrl}${path}`)
      .pipe(catchError(this.formatErrors));
  }
}
