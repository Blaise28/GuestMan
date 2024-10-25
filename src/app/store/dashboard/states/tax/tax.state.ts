/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject, Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { tap } from 'rxjs';
import { OperationService } from '../../../../Core/services';
import { getTaxAction } from './tax.actions';

export interface TaxStateModel {
  code: number;
  reservation: number;
  placed_at: Date;
  amount_total: number;
  items: [];
  status: string;
}

export interface ListModel {
  count: number;
  next: unknown;
  previous: unknown;
  results: TaxStateModel[];
}

@State<ListModel>({
  name: 'TaxList',
  defaults: {
    count: 0,
    next: null,
    previous: null,
    results: [],
  },
})
@Injectable()
export class TaxState {
  private _store = inject(Store);
  constructor(private operationService: OperationService) {}
  @Selector()
  static getTax(state: any): any {
    return state;
  }

  @Action(getTaxAction)
  getTax(ctx: StateContext<ListModel>) {
    return this.operationService.getTaxs().pipe(
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
