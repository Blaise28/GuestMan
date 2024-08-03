/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs';
import { ClientService } from '../../../../Core/services';
import { getClientAction } from './client.actions';

export interface ClientStateModel {
  id: string;
  nom: string;
  prenom: string;
  telephone: string;
  adresse: string;
  email: string;
  sodle_dette: string;
  photo: string;
}

export interface ListModel {
  count: number;
  next: unknown;
  previous: unknown;
  results: ClientStateModel[];
}

@State<ListModel>({
  name: 'clientList',
  defaults: {
    count: 0,
    next: null,
    previous: null,
    results: [],
  },
})
@Injectable()
export class ClientState {
  constructor(private clientService: ClientService) {}
  @Selector()
  static getClient(state: any): any {
    return state;
  }

  @Action(getClientAction)
  getClient(ctx: StateContext<ListModel>) {
    return this.clientService.getClients().pipe(
      tap((result: any) => {
        ctx.patchState({
          count: result.count,
          next: result.next,
          previous: result.previous,
          results: result.results,
        });
        return result;
      }),
    );
  }
}
