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
import { BillService } from '../../Core/services';
import { saveAs } from 'file-saver';

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

  constructor(
    private _store: Store,
    private bill: BillService,
  ) {
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

  export(): void {
    this.bill
      .export()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((response: Blob) => {
        const blob = new Blob([response], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        saveAs(blob, 'bills.xlsx');
      });
  }
}
