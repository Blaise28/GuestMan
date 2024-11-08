import { HttpInterceptorFn } from '@angular/common/http';
import { inject, LOCALE_ID } from '@angular/core';
import { AuthState } from '../../store/auth/auth.state';
import { Store } from '@ngxs/store';
import { UserState } from '../../store/dashboard/states/user/user.state';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const localeId = inject(LOCALE_ID);
  const store = inject(Store);
  const organisation = store.selectSnapshot(UserState.getOrganisationId);
  const headersConfig = {
    'Content-Type': 'application/json',
    'Accept-Language': localeId,
    Accept: 'application/json',
    Authorization: '',
  };
  const authToken = store.selectSnapshot(AuthState.getToken);
  if (authToken) {
    headersConfig['Authorization'] = `Bearer ${authToken}`;
  }
  if (organisation) {
    headersConfig['x-organisation-id'] = `${organisation}`;
  }
  const request = req.clone({ setHeaders: headersConfig });
  return next(request);
};
