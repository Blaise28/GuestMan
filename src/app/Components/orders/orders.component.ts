/* eslint-disable @typescript-eslint/no-explicit-any */
import { Store } from '@ngxs/store';
import { Component, OnInit } from '@angular/core';
import { TicketComponent } from '../../Global/ticket/ticket.component';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Observable, Subject, takeUntil } from 'rxjs';
import { OrderState } from '../../store/dashboard/states/orders/order.state';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    TicketComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent implements OnInit {
  bills$!: Observable<any>;
  bills!: any;
  protected onDestroy$: Subject<void> = new Subject<void>();

  constructor(private _store: Store) {
    this.bills$ = this._store.select(OrderState.getOrder);
  }

  ngOnInit(): void {
    this.bills$.pipe(takeUntil(this.onDestroy$)).subscribe((data) => {
      this.bills = data.results;
    });
  }
  readonly range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
}
