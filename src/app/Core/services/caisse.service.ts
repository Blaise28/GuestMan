import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class CaisseService {
  constructor(private apiService: ApiService) {}

  getWallets(): Observable<unknown> {
    return this.apiService.get('/wallet/').pipe(
      map((data) => {
        return data;
      }),
    );
  }
  getWallet(id: string): Observable<unknown> {
    return this.apiService.get(`/wallet/${id}/`).pipe(
      map((data) => {
        return data;
      }),
    );
  }

  getTransactions(): Observable<unknown> {
    return this.apiService.get('/transaction/').pipe(
      map((data) => {
        return data;
      }),
    );
  }
  getTransaction(id: string): Observable<unknown> {
    return this.apiService.get(`/transaction/${id}/`).pipe(
      map((data) => {
        return data;
      }),
    );
  }
}
