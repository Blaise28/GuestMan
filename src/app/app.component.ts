/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { Store } from '@ngxs/store';
import { getPictureAction } from './store/dashboard/states/pictures/picture.actions';
import { getRoomAction } from './store/dashboard/states/rooms/room.actions';
import { getBookingAction } from './store/dashboard/states/booking/booking.actions';
import { Populate } from './store/dashboard/states/user/user.actions';
import { getClientAction } from './store/dashboard/states/client/client.actions';
import { getProductAction } from './store/dashboard/states/product/product.actions';
import { getCategoryAction } from './store/dashboard/states/category/category.actions';
import { getOrderAction } from './store/dashboard/states/orders/order.action';
import { getWalletAction } from './store/dashboard/states/wallets/wallet.actions';
import { getTransactionAction } from './store/dashboard/states/transaction/transaction.actions';
import { getProcurementAction } from './store/dashboard/states/procurement/procurement.actions';
import { getTaxAction } from './store/dashboard/states/tax/tax.actions';
import { getTableAction } from './store/dashboard/states/table/table.actions';
import { Observable } from 'rxjs';
import { AuthState } from './store/auth/auth.state';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, LayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'GuestMan';
  private _store = inject(Store);
  private _router = inject(Router);
  authenticated$!: Observable<any>;
  authenticated!: boolean;

  constructor() {
    this.authenticated$ = this._store.select(AuthState.isAuthenticated);
  }

  ngOnInit(): void {
    this.authenticated$.subscribe((authenticated) => {
      this.authenticated = authenticated;
      if (authenticated) {
        this._store.dispatch(new Populate());
        this._store.dispatch(new getPictureAction());
        this._store.dispatch(new getRoomAction());
        this._store.dispatch(new getProductAction());
        this._store.dispatch(new getWalletAction());
        this._store.dispatch(new getTableAction());
        this._store.dispatch(new getCategoryAction());
        this._store.dispatch(new getBookingAction());
        this._store.dispatch(new getClientAction());
        this._store.dispatch(new getOrderAction());
        this._store.dispatch(new getTransactionAction());
        this._store.dispatch(new getProcurementAction());
        this._store.dispatch(new getTaxAction());
      } else {
        //
      }
    });
  }
}
