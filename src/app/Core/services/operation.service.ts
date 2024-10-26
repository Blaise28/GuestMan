/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OperationService {
  constructor(private apiService: ApiService) {}

  getTaxs(): Observable<unknown> {
    return this.apiService.get('/tax/').pipe(
      map((data) => {
        return data;
      }),
    );
  }
  getTax(id: number): Observable<unknown> {
    return this.apiService.get(`/tax/${id}/`).pipe(
      map((data) => {
        return data;
      }),
    );
  }
  newTax(data: any) {
    return this.apiService.post('/tax/', data).pipe(
      map((data) => {
        return data;
      }),
    );
  }
  getProcurement(id: number): Observable<unknown> {
    return this.apiService.get(`/procurement/${id}/`).pipe(
      map((data) => {
        return data;
      }),
    );
  }
  getProcurements(): Observable<unknown> {
    return this.apiService.get('/procurement/').pipe(
      map((data) => {
        return data;
      }),
    );
  }
  newProcurement(data: FormData) {
    return this.apiService.post('/procurement/', data, true).pipe(
      map((data) => {
        return data;
      }),
    );
  }
}
