/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { BookingState } from '../../store/dashboard/states/booking/booking.state';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [RouterModule],
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
    this.bookingList$.pipe(takeUntil(this.onDestroy$)).subscribe((data) => {
      this.bookingList = data;
    });
  }
}
