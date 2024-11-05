/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject, Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Populate, SetUser } from './user.actions';
import { tap } from 'rxjs';
import { AuthService } from '../../../../Core/services';

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
  private _authService = inject(AuthService);
  @Selector()
  static getUser(state: UserStateModel): UserStateModel {
    return state;
  }
  @Selector()
  static getUserId(state: UserStateModel): any {
    return state.id;
  }
  @Selector()
  static getOrganisationId(state: UserStateModel): any {
    return state.departement.organisation;
  }
  @Action(SetUser)
  setUser(ctx: StateContext<UserStateModel>, { payload }: SetUser) {
    ctx.setState(payload);
  }
  @Action(Populate)
  getUser(ctx: StateContext<UserStateModel>) {
    return this._authService.populate().pipe(
      tap((result: any) => {
        result.forEach((element) => {
          ctx.patchState({
            id: element.id,
            user: {
              id: element.user.id,
              username: element.user.username,
              last_login: element.user.last_login,
              date_joined: element.user.date_joined,
              is_staff: element.user.is_staff,
            },
            nom: element.nom,
            prenom: element.prenom,
            adresse: element.adresse,
            telephone: element.telephone,
            role: element.role,
            salaire: element.salaire,
            photo: element.photo,
            departement: {
              id: element.departement.id,
              name: element.departement.name,
              description: element.departement.description,
              created_at: element.departement.created_at,
              organisation: element.departement.organisation,
            },
            birthday: element.birthday,
            marital_status: element.marital_status,
            sex: element.sex,
            is_active: element.is_active,
          });
        });
        return result;
      }),
    );
  }
}
