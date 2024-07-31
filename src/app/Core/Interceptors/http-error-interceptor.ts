import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Store } from '@ngxs/store';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  //isAuthenticated = this.store.selectSnapshot(AuthState.isAuthenticated);
  constructor(
    private router: Router,
    private store: Store,
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }

        if (error.status === 401 || error.status === 403) {
          console.log('WRONG RESPONSE: LOGGING OUT USER... ');
          //this.store.dispatch(new Logout());
          // this.router.navigate(['/']);
        }

        console.error(errorMessage, '\nError Object:', error.error);
        return throwError(error);
      }),
    );
  }
}
