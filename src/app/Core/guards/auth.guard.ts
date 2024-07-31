import { inject, Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Store } from '@ngxs/store';

import { Observable } from 'rxjs';

// import { Navigate } from '@ngxs/router-plugin';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  isAuthenticated$!: Observable<unknown>;
  isAuthenticated!: boolean;
  private _store = inject(Store);
  private _router = inject(Router);
  token!: string | null;

  constructor() {
    this.token = localStorage.getItem('accessToken');
  }

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.token) {
      return true;
    }
    return false;
  }
}
