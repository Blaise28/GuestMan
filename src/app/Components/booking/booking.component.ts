import { CommonModule } from '@angular/common';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { BookingState } from '../../store/dashboard/states/booking/booking.state';
import { RouterModule } from '@angular/router';
import { getBookingAction } from '../../store/dashboard/states/booking/booking.actions';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss',
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
export class BookingComponent implements OnInit {
  animationStates: { [key: number]: 'default' | 'active' } = {};
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
