/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngxs/store';
import { Populate } from './store/dashboard/states/user/user.actions';
import { Observable } from 'rxjs';
import { AuthState } from './store/auth/auth.state';
import { getOrganisation } from './store/auth/auth.actions';
//import { getWalletAction } from './store/dashboard/states/wallets/wallet.actions';
//import { getTransactionAction } from './store/dashboard/states/transaction/transaction.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
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
        this._store.dispatch(new getOrganisation());
      } else {
        //
      }
    });
  }
}
