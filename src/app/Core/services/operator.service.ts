import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OperatorService {
  constructor(private apiService: ApiService) {}

  getOperators(): Observable<unknown> {
    return this.apiService.get('/operator/').pipe(
      map((data) => {
        return data;
      }),
    );
  }
  getOperator(id: number): Observable<unknown> {
    return this.apiService.get(`/operator/${id}/`).pipe(
      map((data) => {
        return data;
      }),
    );
  }
}
