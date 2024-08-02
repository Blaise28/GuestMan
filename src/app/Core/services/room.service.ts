import { Injectable } from '@angular/core';
// import { Observable, of as ObservableOf } from 'rxjs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  constructor(private apiService: ApiService) {}

  getRooms(): Observable<unknown> {
    return this.apiService.get('/rooms/').pipe(
      map((data) => {
        return data;
      }),
    );
  }
  getRoom(id: number): Observable<unknown> {
    return this.apiService.get(`/rooms/${id}/`).pipe(
      map((data) => {
        return data;
      }),
    );
  }
}
