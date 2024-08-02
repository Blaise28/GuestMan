import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { RoomListComponent } from './Components/room-list/room-list.component';
import { AuthGuard } from './Core/guards/auth.guard';
import { HomeComponent } from './Components/home/home.component';
import { RoomDetailsComponent } from './Components/room-details/room-details.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Login',
    component: LoginComponent,
  },
  {
    path: 'l',
    title: 'Accueil',
    canActivate: [AuthGuard],
    component: LayoutComponent,
    children: [
      {
        path: '',
        title: 'Home',
        component: HomeComponent,
      },
      {
        path: 'r',
        title: 'Rooms',
        component: RoomListComponent,
      },
      {
        path: 'details/:code',
        title: 'Rooms Details',
        component: RoomDetailsComponent,
      },
    ],
  },
];
