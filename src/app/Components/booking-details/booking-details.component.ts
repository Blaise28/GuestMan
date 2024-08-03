/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { BookingService } from '../../Core/services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking-details.component.html',
  styleUrl: './booking-details.component.scss',
})
export class BookingDetailsComponent {
  private onDestroy$: Subject<void> = new Subject<void>();
  private _router = inject(ActivatedRoute);
  private _bookingService = inject(BookingService);
  bookingId!: number;
  booking!: any;

  ngOnInit(): void {
    // Subscribe to room details on init
    this._router.params.subscribe((param) => {
      this.bookingId = param['code'];
      if (this.bookingId) {
        this._bookingService.getBooking(this.bookingId).subscribe((booking) => {
          this.booking = booking;
          console.log('Booking details:', this.booking);
        });
      }
    });
  }
}
