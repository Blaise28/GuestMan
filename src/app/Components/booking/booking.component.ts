import { CommonModule } from '@angular/common';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { BookingState } from '../../store/dashboard/states/booking/booking.state';
import { RouterModule } from '@angular/router';
import { getBookingAction } from '../../store/dashboard/states/booking/booking.actions';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss',
})
export class BookingComponent implements OnInit {
  private _store = inject(Store);
  bookingList$!: Observable<any>;
  bookingList!: any;
  protected onDestroy$: Subject<void> = new Subject<void>();
  constructor() {
    this.bookingList$ = this._store.select(BookingState.getBooking);
  }

  ngOnInit(): void {
    this._store.dispatch(new getBookingAction());
    this.bookingList$.pipe(takeUntil(this.onDestroy$)).subscribe((data) => {
      this.bookingList = data;
    });
  }
}
