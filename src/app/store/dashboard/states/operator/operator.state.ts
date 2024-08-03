/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs';
import { OperatorService } from '../../../../Core/services';
import { getOperatorAction } from './operator.actions';

export interface OperatorStateModel {
  id: number;
  nom: string;
  prenom: string;
  adresse: string;
  telephone: string;
  email: string;
  role: string;
  date_embauche: Date;
  salaire: string;
  pin: number;
  photo: string;
}

export interface ListModel {
  count: number;
  next: unknown;
  previous: unknown;
  results: OperatorStateModel[];
}

@State<ListModel>({
  name: 'operatorList',
  defaults: {
    count: 0,
    next: null,
    previous: null,
    results: [],
  },
})
@Injectable()
export class OperatorState {
  constructor(private operatorService: OperatorService) {}
  @Selector()
  static getOperator(state: any): any {
    return state;
  }

  @Action(getOperatorAction)
  getOperator(ctx: StateContext<ListModel>) {
    return this.operatorService.getOperators().pipe(
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
