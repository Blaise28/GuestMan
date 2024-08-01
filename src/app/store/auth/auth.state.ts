import { inject, Injectable } from '@angular/core';
import {
  Action,
  Selector,
  State,
  StateContext,
  StateToken,
  Store,
} from '@ngxs/store';
import { setToken } from './auth.actions';
import { AuthService } from '../../Core/services';
import { Router } from '@angular/router';

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
  private _auth = inject(AuthService);
  constructor(
    private store: Store,
    private router: Router,
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
  @Action(setToken)
  getToken(ctx: StateContext<TokenStateModel>) {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    ctx.patchState({
      token: {
        access: accessToken,
        refresh: refreshToken,
      },
    });
  }
}
