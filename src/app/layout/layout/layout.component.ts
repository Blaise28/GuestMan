import { Component, inject, OnInit } from '@angular/core';
import { AsideComponent } from '../aside/aside.component';
import { HeaderComponent } from '../header/header.component';
import { Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngxs/store';
import { Populate } from '../../store/dashboard/states/user/user.actions';
import { getTransactionAction } from '../../store/dashboard/states/transaction/transaction.actions';
import { getRoomAction } from '../../store/dashboard/states/rooms/room.actions';

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
    this._store.dispatch(new getTransactionAction());
    this._store.dispatch(new getRoomAction());
  }
}
