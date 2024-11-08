import { CommonModule } from '@angular/common';
import { TransactionState } from './../../store/dashboard/states/transaction/transaction.state';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { WalletState } from '../../store/dashboard/states/wallets/wallet.state';
import { OperatorService } from '../../Core/services';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [
    trigger('list-transactions', [
      state(
        'default',
        style({
          transform: 'scale(1)',
          'background-color': 'white',
          'z-idex': 1,
        }),
      ),
      state(
        'active',
        style({
          transform: 'scale(1.05)',
          'background-color': 'rgb(201,157,242)',
          'z-index': 2,
        }),
      ),
      transition('void => *', [
        style({
          transform: 'translateX(-100%)',
          opacity: 0,
          'background-color': 'rgb(201,157,242)',
        }),
        animate(
          '0.5s ease-in',
          style({
            transform: 'translateX(0)',
            opacity: 1,
            'background-color': 'white',
          }),
        ),
      ]),
      //transition('* => default', [animate('0.5s ease-out')]),
    ]),
  ],
})
export class HomeComponent implements OnInit {
  animationStates: { [key: number]: 'default' | 'active' } = {};
  private _store = inject(Store);
  transactionList$!: Observable<any>;
  transactionList!: any;
  caisse$!: Observable<any>;
  caisse!: any;
  stats!: any;
  protected onDestroy$: Subject<void> = new Subject<void>();
  constructor(private operatorService: OperatorService) {
    this.transactionList$ = this._store.select(TransactionState.getTransaction);
    this.caisse$ = this._store.select(WalletState.getWallet);
  }
  ngOnInit(): void {
    this.transactionList$.pipe(takeUntil(this.onDestroy$)).subscribe((data) => {
      this.transactionList = data;
      this.getStats();
    });
    this.caisse$.pipe(takeUntil(this.onDestroy$)).subscribe((data) => {
      this.caisse = data?.results;
    });
  }
  getStats() {
    this.operatorService.getStats().subscribe({
      next: (data) => {
        this.stats = data;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
