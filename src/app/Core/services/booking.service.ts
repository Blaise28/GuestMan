import { Injectable } from '@angular/core';
// import { Observable, of as ObservableOf } from 'rxjs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor(private apiService: ApiService) {}

  getBookings(): Observable<unknown> {
    return this.apiService.get('/reservation/').pipe(
      map((data) => {
        return data;
      }),
    );
  }
  getBooking(id: number): Observable<unknown> {
    return this.apiService.get(`/reservation/${id}/`).pipe(
      map((data) => {
        return data;
      }),
    );
  }
}
