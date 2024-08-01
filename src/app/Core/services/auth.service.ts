import { Injectable } from '@angular/core';
// import { Observable, of as ObservableOf } from 'rxjs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private apiService: ApiService) {}

  login(login_data: {
    username: string;
    password: string;
  }): Observable<unknown> {
    const data = login_data;
    return this.apiService.post('/token/', data).pipe(
      map((data) => {
        return data;
      }),
    );
  }
  logout() {
    return this.apiService.get('/logout/').pipe(
      map((data) => {
        return data;
      }),
    );
  }
}
