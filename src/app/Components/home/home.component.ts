import { CommonModule } from '@angular/common';
import { TransactionState } from './../../store/dashboard/states/transaction/transaction.state';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { WalletState } from '../../store/dashboard/states/wallets/wallet.state';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private _store = inject(Store);
  transactionList$!: Observable<any>;
  transactionList!: any;
  caisse$!: Observable<any>;
  caisse!: any;
  protected onDestroy$: Subject<void> = new Subject<void>();
  constructor() {
    this.transactionList$ = this._store.select(TransactionState.getTransaction);
    this.caisse$ = this._store.select(WalletState.getWallet);
  }
  ngOnInit(): void {
    this.transactionList$.pipe(takeUntil(this.onDestroy$)).subscribe((data) => {
      this.transactionList = data;
    });
    this.caisse$.pipe(takeUntil(this.onDestroy$)).subscribe((data) => {
      this.caisse = data.results;
    });
  }
}
