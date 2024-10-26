import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { TransactionState } from '../../../store/dashboard/states/transaction/transaction.state';
import { getTransactionAction } from '../../../store/dashboard/states/transaction/transaction.actions';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss',
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
export class TransactionsComponent implements OnInit {
  listItemAnimationState: 'default' | 'active' = 'default';
  animationStates: { [key: number]: 'default' | 'active' } = {};
  private _store = inject(Store);
  transaction$!: Observable<any>;
  transaction!: any;
  protected onDestroy$: Subject<void> = new Subject<void>();
  header = ['Type', 'Date', 'Amount', 'Description', 'done by'];

  constructor() {
    this.transaction$ = this._store.select(TransactionState.getTransaction);
  }

  ngOnInit(): void {
    this._store.dispatch(new getTransactionAction());
    this.transaction$.pipe(takeUntil(this.onDestroy$)).subscribe((data) => {
      this.transaction = data;
    });
    for (const index in this.transaction) {
      this.animationStates[index] = 'default';
    }
  }

  onListItemMouseEnter(index: number) {
    this.animationStates[index] = 'active';
  }

  onListItemMouseLeave(index: number) {
    this.animationStates[index] = 'default';
  }
}
