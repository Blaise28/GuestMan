/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action, State, StateContext } from '@ngxs/store';
import { ResetState } from './app.actions';
import { Injectable } from '@angular/core';

@State<any>({
  name: 'app',
  defaults: {
    // tes valeurs par défaut ici
  },
})
@Injectable()
export class AppState {
  @Action(ResetState)
  resetState(ctx: StateContext<any>) {
    ctx.setState({
      // tes valeurs par défaut ici
    });
  }
}
