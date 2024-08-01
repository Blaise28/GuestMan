import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { Store } from '@ngxs/store';
import { getPictureAction } from './store/dashboard/states/pictures/picture.actions';
import { Observable } from 'rxjs';
import { AuthState } from './store/auth/auth.state';
import { getRoomAction } from './store/dashboard/states/rooms/room.actions';
import { setToken } from './store/auth/auth.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, LayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'GuestMan';
  private _store = inject(Store);
  private _router = inject(Router);
  isAuthenticated$!: Observable<unknown>;
  isAuthenticated!: boolean;

  constructor() {
    this.isAuthenticated$ = this._store.select(AuthState.isAuthenticated);
  }

  ngOnInit(): void {
    const token = localStorage.getItem('accessToken');
    if (token) {
      this._store.dispatch(new setToken());
      this._store.dispatch(new getPictureAction());
      this._store.dispatch(new getRoomAction());
      //this._router.navigate(['/l']);
    } else {
      this._router.navigate(['/']);
    }
  }
}
