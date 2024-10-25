/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
// import { Observable, of as ObservableOf } from 'rxjs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  constructor(
    private apiService: ApiService,
    private http: HttpClient,
  ) {}

  getBills(): Observable<unknown> {
    return this.apiService.get('/bills/').pipe(
      map((data) => {
        return data;
      }),
    );
  }
  getBill(id: number): Observable<unknown> {
    return this.apiService.get(`/bills/${id}`).pipe(
      map((data) => {
        return data;
      }),
    );
  }
  newBill(data: any): Observable<unknown> {
    return this.apiService.post('/bills/', data).pipe(
      map((data) => {
        return data;
      }),
    );
  }

  confirm(id: number): Observable<unknown> {
    return this.apiService.post(`/bills/${id}/confirm/`).pipe(
      map((data) => {
        return data;
      }),
    );
  }

  delete(id: number) {
    return this.apiService.delete(`/bills/${id}`).pipe(
      map((data) => {
        return data;
      }),
    );
  }
  gen_pdg(id: number) {
    return this.apiService.get(`/generate-pdf/${id}`).pipe(
      map((data) => {
        return data;
      }),
    );
  }

  export(): Observable<Blob> {
    return this.http.get('http://localhost:8000/api/export-bills/', {
      responseType: 'blob',
    });
  }
}
