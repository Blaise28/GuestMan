/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject, Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { tap } from 'rxjs';
import { RoomService } from '../../../../Core/services';
import { getTableAction } from './table.actions';

export interface TableStateModel {
  numero: number;
}

export interface ListModel {
  count: number;
  next: unknown;
  previous: unknown;
  results: TableStateModel[];
}

@State<ListModel>({
  name: 'TableList',
  defaults: {
    count: 0,
    next: null,
    previous: null,
    results: [],
  },
})
@Injectable()
export class TableState {
  private _store = inject(Store);
  constructor(private roomService: RoomService) {}
  @Selector()
  static getTable(state: any): any {
    return state;
  }

  @Action(getTableAction)
  getTable(ctx: StateContext<ListModel>) {
    return this.roomService.getTables().pipe(
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
