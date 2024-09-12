/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject, Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Populate, SetUser } from './user.actions';
import { tap } from 'rxjs';
import { AuthService } from '../../../../Core/services';

export interface UserStateModel {
  id: number;
  username: string;
  email: string;
  last_login: Date;
  date_joined: Date;
  is_staff: boolean;
}

@State<UserStateModel>({
  name: 'user',
  defaults: {
    id: 0,
    username: '',
    email: '',
    last_login: new Date(Date.now()),
    date_joined: new Date(Date.now()),
    is_staff: false,
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
            username: element.username,
            email: element.email,
            last_login: element.last_login,
            date_joined: element.date_joined,
            is_staff: element.is_staff,
          });
        });
        return result;
      }),
    );
  }
}
