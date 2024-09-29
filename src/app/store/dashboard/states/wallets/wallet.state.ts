/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject, Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { tap } from 'rxjs';
import { CaisseService } from '../../../../Core/services';
import { getWalletAction } from './wallet.actions';

export interface OrderStateModel {
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
  results: OrderStateModel[];
}

@State<ListModel>({
  name: 'walletList',
  defaults: {
    count: 0,
    next: null,
    previous: null,
    results: [],
  },
})
@Injectable()
export class WalletState {
  private _store = inject(Store);
  constructor(private caisseService: CaisseService) {}
  @Selector()
  static getWallet(state: any): any {
    return state;
  }

  @Action(getWalletAction)
  getWallet(ctx: StateContext<ListModel>) {
    return this.caisseService.getWallets().pipe(
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
