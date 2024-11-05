import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthState } from '../../store/auth/auth.state';

// import { Navigate } from '@ngxs/router-plugin';

export const authGuard: CanActivateFn = () => {
  const _store = inject(Store);
  const route = inject(Router);
  let localData: boolean | undefined;
  _store.select(AuthState.isAuthenticated).subscribe((isAuthenticated) => {
    localData = isAuthenticated;
  });
  console.log('guard founds user connected', localData);
  if (localData) {
    return true;
  }
  route.navigate(['/']);
  return false;
};
