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
import { getOrganisation, Login, Logout } from './auth.actions';
import { Router } from '@angular/router';
import { AuthService } from '../../Core/services';
import { tap } from 'rxjs';
import { StateClear } from 'ngxs-reset-plugin';

export interface TokenStateModel {
  token: {
    access: string | null;
    refresh: string | null;
  };
}
export interface OrganisationModel {
  organisation: {
    id: number | null;
    name: string;
    adresse: string;
    is_active: boolean;
    capacity: number | null;
    created_at: Date | number;
    fisc_number: string;
    cover_picture: string;
  };
}

const AUTH_STATE_TOKEN = new StateToken<TokenStateModel>('auth');
const CONNECTED_ORGANISATION = new StateToken<OrganisationModel>('org');

@State<TokenStateModel>({
  name: AUTH_STATE_TOKEN,
  defaults: {
    token: {
      access: null,
      refresh: null,
    },
  },
})
@State<OrganisationModel>({
  name: CONNECTED_ORGANISATION,
  defaults: {
    organisation: {
      id: null,
      name: '',
      adresse: '',
      is_active: false,
      capacity: null,
      created_at: Date.now(),
      fisc_number: '',
      cover_picture: '',
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
  static getToken(state: TokenStateModel): any {
    if (state) {
      return state.token.access;
    }
    //
  }
  @Selector()
  static getOrganisation(state: OrganisationModel): any {
    if (state) {
      return state.organisation;
    }
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

  @Action(getOrganisation)
  getOrg(ctx: StateContext<OrganisationModel>) {
    return this.authService.getOrganisation().pipe(
      tap((result: any) => {
        ctx.patchState({
          organisation: {
            id: result.id,
            name: result.name,
            adresse: result.adresse,
            is_active: result.is_active,
            capacity: result.capacity,
            created_at: result.created_at,
            fisc_number: result.fisc_number,
            cover_picture: result.cover_picture,
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
    this._store.dispatch(new StateClear());
    this.router.navigate(['/']);
  }
}
