// import { Injectable, Inject, LOCALE_ID } from '@angular/core';
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor,
// } from '@angular/common/http';
// import { Observable } from 'rxjs';

// import { Store } from '@ngxs/store';
// import { AuthState } from '../../store/auth/auth.state';

// @Injectable()
// export class HttpTokenInterceptor implements HttpInterceptor {
//   constructor(
//     private store: Store,
//     @Inject(LOCALE_ID) protected localeId: string
//   ) {}

//   intercept(
//     req: HttpRequest<unknown>,
//     next: HttpHandler
//   ): Observable<HttpEvent<unknown>> {
//     const headersConfig = {
//       'Content-Type': 'application/json',
//       'Accept-Language': this.localeId,
//       Accept: 'application/json',
//       Authorization: '',
//     };

//     const token = this.store.selectSnapshot(AuthState.getToken);

//     if (token) {
//       headersConfig['Authorization'] = `Token ${token}`;
//     }

//     const request = req.clone({ setHeaders: headersConfig });
//     return next.handle(request);
//   }
// }
import { inject, LOCALE_ID } from '@angular/core';
import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { AuthState } from '../../store/auth/auth.state';

export function httpTokenInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const _store = inject(Store);
  const localeId = inject(LOCALE_ID);
  const authToken = _store.selectSnapshot(AuthState.getToken);
  const headersConfig = {
    'Content-Type': 'application/json',
    'Accept-Language': localeId,
    Accept: 'application/json',
    Authorization: 'jkljglkjgfdslkgjefkjgwlekj',
  };

  //Clone the request to add the authentication header.
  if (authToken) {
    headersConfig['Authorization'] = `Token ${authToken}`;
  }
  const request = req.clone({ setHeaders: headersConfig });
  return next(request);
}
