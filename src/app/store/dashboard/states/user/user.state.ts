/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject, Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Populate, SetUser } from './user.actions';
import { tap } from 'rxjs';
import { AuthService } from '../../../../Core/services';
import { getTransactionAction } from '../transaction/transaction.actions';
import { getWalletAction } from '../wallets/wallet.actions';

export interface UserStateModel {
  id: number;
  user: {
    id: number;
    username: string;
    last_login: Date;
    date_joined: Date;
    is_staff: boolean;
  };
  nom: string;
  prenom: string;
  adresse: string;
  telephone: string;
  role: string;
  salaire: string;
  photo: string;
  departement: {
    id: number;
    name: string;
    description: string;
    created_at: Date;
    organisation: number;
  };
  birthday: Date;
  marital_status: string;
  sex: string;
  is_active: boolean;
}

@State<UserStateModel>({
  name: 'operator',
  defaults: {
    id: 0,
    user: {
      id: 0,
      username: '',
      last_login: new Date(Date.now()),
      date_joined: new Date(Date.now()),
      is_staff: false,
    },
    nom: '',
    prenom: '',
    adresse: '',
    telephone: '',
    role: '',
    salaire: '',
    photo: '',
    departement: {
      id: 0,
      name: '',
      description: '',
      created_at: new Date(Date.now()),
      organisation: 0,
    },
    birthday: new Date(Date.now()),
    marital_status: '',
    sex: '',
    is_active: false,
  },
})
@Injectable()
export class UserState {
  private _store = inject(Store);
  private _authService = inject(AuthService);
  @Selector()
  static getUser(state: UserStateModel): UserStateModel {
    return state;
  }
  @Selector()
  static getUserId(state: UserStateModel): any {
    if (state) {
      return state.id;
    }
  }
  @Selector()
  static getOrganisationId(state: UserStateModel): any {
    if (state) {
      return state.departement.organisation;
    }
  }
  @Action(SetUser)
  setUser(ctx: StateContext<UserStateModel>, { payload }: SetUser) {
    ctx.setState(payload);
  }
  @Action(Populate)
  getUser(ctx: StateContext<UserStateModel>) {
    return this._authService.populate().pipe(
      tap((result: any) => {
        ctx.patchState({
          id: result.id,
          user: {
            id: result.user.id,
            username: result.user.username,
            last_login: result.user.last_login,
            date_joined: result.user.date_joined,
            is_staff: result.user.is_staff,
          },
          nom: result.nom,
          prenom: result.prenom,
          adresse: result.adresse,
          telephone: result.telephone,
          role: result.role,
          salaire: result.salaire,
          photo: result.photo,
          departement: {
            id: result.departement.id,
            name: result.departement.name,
            description: result.departement.description,
            created_at: result.departement.created_at,
            organisation: result.departement.organisation,
          },
          birthday: result.birthday,
          marital_status: result.marital_status,
          sex: result.sex,
          is_active: result.is_active,
        });
        this._store.dispatch(new getWalletAction());
        this._store.dispatch(new getTransactionAction());
        return result;
      }),
    );
  }
}
