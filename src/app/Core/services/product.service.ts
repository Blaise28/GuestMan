/* eslint-disable @typescript-eslint/no-explicit-any */
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
  getProductByCategory(id: number): Observable<unknown> {
    return this.apiService.get(`/product/?categorie=${id}`).pipe(
      map((data) => {
        return data;
      }),
    );
  }
  search(search: string): Observable<unknown> {
    return this.apiService.get(`/product/?search=${search}`).pipe(
      map((data) => {
        return data;
      }),
    );
  }
  newBeverage(data: any) {
    return this.apiService.post('/product/', data).pipe(
      map((data) => {
        return data;
      }),
    );
  }
  getCategory(): Observable<unknown> {
    return this.apiService.get('/category/').pipe(
      map((data) => {
        return data;
      }),
    );
  }
  delete(id: number) {
    return this.apiService.delete(`/product/${id}`).pipe(
      map((data) => {
        return data;
      }),
    );
  }
}
