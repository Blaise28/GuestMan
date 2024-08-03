/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject, Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Store } from '@ngxs/store';

import { Observable } from 'rxjs';
import { UserState } from '../../store/dashboard/states/user/user.state';

// import { Navigate } from '@ngxs/router-plugin';

@Injectable({
  providedIn: 'root',
})
export class StaffGuard implements CanActivate {
  isAuthenticated$!: Observable<unknown>;
  isAuthenticated!: boolean;
  private _store = inject(Store);
  private _router = inject(Router);
  User$!: Observable<any>;
  User!: any;

  constructor() {
    this.User$ = this._store.select(UserState.getUser);
  }

  ngOnInit(): void {
    this.User$.subscribe((data) => {
      this.User = data;
    });
  }

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.User?.is_staff) {
      return true;
    }
    //this._router.navigate(['/l/403']);
    return true;
  }
}
