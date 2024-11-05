/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject, Injectable } from '@angular/core';
import {
  Action,
  Selector,
  State,
  StateContext,
  StateToken,
  Store,
} from '@ngxs/store';
import { Login, Logout, ResetState } from './auth.actions';
import { Router } from '@angular/router';
import { AuthService } from '../../Core/services';
import { tap } from 'rxjs';

export interface TokenStateModel {
  token: {
    access: string | null;
    refresh: string | null;
  };
}

const AUTH_STATE_TOKEN = new StateToken<TokenStateModel>('auth');

@State<TokenStateModel>({
  name: AUTH_STATE_TOKEN,
  defaults: {
    token: {
      access: null,
      refresh: null,
    },
  },
})
@Injectable()
export class AuthState {
  private _store = inject(Store);
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  @Selector()
  static getToken(state: TokenStateModel): string | null {
    return state.token.access;
  }
  @Selector()
  static isAuthenticated(state: TokenStateModel): boolean | undefined {
    if (state) {
      if (state.token.access) {
        return true;
      }
      return false;
    }
    return false;
  }
  @Action(Login)
  Login(ctx: StateContext<TokenStateModel>, action: Login) {
    return this.authService.login(action.payload).pipe(
      tap((result: any) => {
        ctx.patchState({
          token: {
            access: result.access,
            refresh: result.refresh,
          },
        });
        return result;
      }),
    );
  }
  @Action(Logout)
  logout(ctx: StateContext<TokenStateModel>) {
    ctx.setState({
      token: {
        access: null,
        refresh: null,
      },
    });
    localStorage.clear();
    this._store.dispatch(new ResetState());
    this.router.navigate(['/']);
  }
  @Action(ResetState)
  resetState({ setState }: StateContext<any>) {
    setState({});
  }
}
