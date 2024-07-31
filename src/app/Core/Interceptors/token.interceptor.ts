import { HttpInterceptorFn } from '@angular/common/http';
import { inject, LOCALE_ID } from '@angular/core';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const localeId = inject(LOCALE_ID);
  const authToken = localStorage.getItem('accessToken');
  const headersConfig = {
    'Content-Type': 'application/json',
    'Accept-Language': localeId,
    Accept: 'application/json',
    Authorization: '',
  };
  if (authToken) {
    headersConfig['Authorization'] = `Bearer ${authToken}`;
  }
  const request = req.clone({ setHeaders: headersConfig });
  return next(request);
};
