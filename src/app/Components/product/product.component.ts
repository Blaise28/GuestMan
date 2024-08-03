/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ProductState } from '../../store/dashboard/states/product/product.state';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent implements OnInit {
  private _store = inject(Store);
  protected onDestroy$: Subject<void> = new Subject<void>();
  product$!: Observable<any>;
  product!: any;
  constructor() {
    this.product$ = this._store.select(ProductState.getProduct);
  }

  ngOnInit(): void {
    this.product$.pipe(takeUntil(this.onDestroy$)).subscribe((data) => {
      this.product = data;
    });
  }
}
