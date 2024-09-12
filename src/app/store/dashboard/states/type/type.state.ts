/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs';
import { ProductService } from '../../../../Core/services';
import { getTypeAction } from './type.actions';

export interface typeModel {
  count: number;
  next: unknown;
  previous: unknown;
  allType: any[];
}
@State<typeModel>({
  name: 'type',
  defaults: {
    count: 0,
    next: null,
    previous: null,
    allType: [],
  },
})
@Injectable()
export class TypeState {
  constructor(private productService: ProductService) {}
  @Selector()
  static getType(state: any): any {
    return state;
  }

  @Action(getTypeAction)
  getType(ctx: StateContext<typeModel>) {
    return this.productService.getType().pipe(
      tap((result: any) => {
        ctx.patchState({
          count: result.count,
          next: result.next,
          previous: result.previous,
          allType: result.results,
        });
        return result;
      }),
    );
  }
}
