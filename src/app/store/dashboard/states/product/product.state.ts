/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs';
import { ProductService } from '../../../../Core/services';
import { getProductAction } from './product.actions';

export interface ProductStateModel {
  id: number;
  nom: string;
  categorie: string;
  prix_unitaire: string;
  stock: number;
}

export interface ListModel {
  count: number;
  next: unknown;
  previous: unknown;
  results: ProductStateModel[];
}

@State<ListModel>({
  name: 'productList',
  defaults: {
    count: 0,
    next: null,
    previous: null,
    results: [],
  },
})
@Injectable()
export class ProductState {
  constructor(private productService: ProductService) {}
  @Selector()
  static getProduct(state: any): any {
    return state;
  }

  @Action(getProductAction)
  getProduct(ctx: StateContext<ListModel>) {
    return this.productService.getProducts().pipe(
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
