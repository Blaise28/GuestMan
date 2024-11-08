import { Component, inject, OnInit } from '@angular/core';
import { AsideComponent } from '../aside/aside.component';
import { HeaderComponent } from '../header/header.component';
import { Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngxs/store';
import { getRoomAction } from '../../store/dashboard/states/rooms/room.actions';
import { Populate } from '../../store/dashboard/states/user/user.actions';
import { getTaxAction } from '../../store/dashboard/states/tax/tax.actions';
import { getPictureAction } from '../../store/dashboard/states/pictures/picture.actions';
import { getProductAction } from '../../store/dashboard/states/product/product.actions';
import { getTableAction } from '../../store/dashboard/states/table/table.actions';
import { getCategoryAction } from '../../store/dashboard/states/category/category.actions';
import { getBookingAction } from '../../store/dashboard/states/booking/booking.actions';
import { getClientAction } from '../../store/dashboard/states/client/client.actions';
import { getOrderAction } from '../../store/dashboard/states/orders/order.action';
import { getProcurementAction } from '../../store/dashboard/states/procurement/procurement.actions';
import { getOrganisation } from '../../store/auth/auth.actions';
//import { getWalletAction } from '../../store/dashboard/states/wallets/wallet.actions';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [AsideComponent, HeaderComponent, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit {
  private _store = inject(Store);
  private _router = inject(Router);
  constructor() {}
  ngOnInit(): void {
    this._store.dispatch(new Populate());
    this._store.dispatch(new getOrganisation());
    this._store.dispatch(new getPictureAction());
    this._store.dispatch(new getRoomAction());
    this._store.dispatch(new getProductAction());
    this._store.dispatch(new getTableAction());
    this._store.dispatch(new getCategoryAction());
    this._store.dispatch(new getBookingAction());
    this._store.dispatch(new getClientAction());
    this._store.dispatch(new getOrderAction());
    this._store.dispatch(new getProcurementAction());
    this._store.dispatch(new getTaxAction());
  }
}
