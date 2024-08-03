import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private apiService: ApiService) {}

  getProducts(): Observable<unknown> {
    return this.apiService.get('/product/').pipe(
      map((data) => {
        return data;
      }),
    );
  }
  getProduct(id: number): Observable<unknown> {
    return this.apiService.get(`/product/${id}/`).pipe(
      map((data) => {
        return data;
      }),
    );
  }
}
