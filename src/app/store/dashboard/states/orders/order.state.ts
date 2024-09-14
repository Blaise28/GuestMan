/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject, Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { tap } from 'rxjs';
import { BillService } from '../../../../Core/services';
import { getOrderAction } from './order.action';

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
  name: 'orderList',
  defaults: {
    count: 0,
    next: null,
    previous: null,
    results: [],
  },
})
@Injectable()
export class OrderState {
  private _store = inject(Store);
  constructor(private orderService: BillService) {}
  @Selector()
  static getOrder(state: any): any {
    return state;
  }

  @Action(getOrderAction)
  getOrder(ctx: StateContext<ListModel>) {
    return this.orderService.getBills().pipe(
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
