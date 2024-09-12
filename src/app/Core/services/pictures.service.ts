/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
// import { Observable, of as ObservableOf } from 'rxjs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class PictureService {
  constructor(private apiService: ApiService) {}

  getPictures(): Observable<unknown> {
    return this.apiService.get('/pictures/').pipe(
      map((data) => {
        return data;
      }),
    );
  }
  getPictureByRoom(id: number) {
    return this.apiService.get(`/pictures/?room_id=${id}`).pipe(
      map((data) => {
        return data;
      }),
    );
  }
  upload(data: any): Observable<unknown> {
    return this.apiService.post('/pictures/', data).pipe(
      map((data) => {
        return data;
      }),
    );
  }

  delete(id: number) {
    return this.apiService.delete(`/pictures/${id}`).pipe(
      map((data) => {
        return data;
      }),
    );
  }
}
