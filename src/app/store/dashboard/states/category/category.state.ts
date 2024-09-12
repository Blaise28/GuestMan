/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs';
import { ProductService } from '../../../../Core/services';
import { getCategoryAction } from './category.actions';

export interface categoryModel {
  count: number;
  next: unknown;
  previous: unknown;
  allCategory: any[];
}

@State<categoryModel>({
  name: 'category',
  defaults: {
    count: 0,
    next: null,
    previous: null,
    allCategory: [],
  },
})
@Injectable()
export class CategoryState {
  constructor(private productService: ProductService) {}
  @Selector()
  static getCategory(state: any): any {
    return state;
  }

  @Action(getCategoryAction)
  getCategory(ctx: StateContext<categoryModel>) {
    return this.productService.getCategory().pipe(
      tap((result: any) => {
        ctx.patchState({
          count: result.count,
          next: result.next,
          previous: result.previous,
          allCategory: result.results,
        });
        return result;
      }),
    );
  }
}
