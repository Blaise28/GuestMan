import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private apiService: ApiService) {}

  getClients(): Observable<unknown> {
    return this.apiService.get('/client/').pipe(
      map((data) => {
        return data;
      }),
    );
  }
  getClient(id: number): Observable<unknown> {
    return this.apiService.get(`/client/${id}/`).pipe(
      map((data) => {
        return data;
      }),
    );
  }
}
