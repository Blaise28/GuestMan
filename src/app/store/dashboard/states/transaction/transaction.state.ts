/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject, Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { tap } from 'rxjs';
import { CaisseService } from '../../../../Core/services';
import { getTransactionAction } from './transaction.actions';

export interface ListModel {
  allTransaction: any[];
}

@State<ListModel>({
  name: 'transactionList',
  defaults: {
    allTransaction: [],
  },
})
@Injectable()
export class TransactionState {
  private _store = inject(Store);
  constructor(private caisseService: CaisseService) {}
  @Selector()
  static getTransaction(state: any): any {
    if (state) {
      return state.allTransaction;
    }
  }

  @Action(getTransactionAction)
  getTransaction(ctx: StateContext<ListModel>) {
    return this.caisseService.getTransactions().pipe(
      tap((result: any) => {
        ctx.patchState({
          allTransaction: result,
        });
        return result;
      }),
    );
  }
}
