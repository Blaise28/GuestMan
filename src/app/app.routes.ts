import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { RoomListComponent } from './Components/room-list/room-list.component';
import { AuthGuard } from './Core/guards/auth.guard';
import { HomeComponent } from './Components/home/home.component';
import { RoomDetailsComponent } from './Components/room-details/room-details.component';
import { BookingComponent } from './Components/booking/booking.component';
import { BookingDetailsComponent } from './Components/booking-details/booking-details.component';
import { ClientComponent } from './Components/client/client.component';
import { ClientDetailsComponent } from './Components/client-details/client-details.component';
import { ProductComponent } from './Components/product/product.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { StaffGuard } from './Core/guards';
import { AdminComponent } from './Components/admin/admin.component';
import { NotFoundComponent } from './Global/not-found/not-found.component';
import { ForbidenComponent } from './Global/forbiden/forbiden.component';
import { OperatorComponent } from './Components/operator/operator.component';
import { OperatorDetailsComponent } from './Components/operator-details/operator-details.component';
import { CounterComponent } from './Components/counter/counter.component';

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
        path: 'Rdetails/:code',
        title: 'Room Details',
        component: RoomDetailsComponent,
      },
      {
        path: 'tanents',
        title: 'Tanents',
        component: BookingComponent,
      },
      {
        path: 'Tdetails/:code',
        title: 'Tanent Details',
        component: BookingDetailsComponent,
      },
      {
        path: 'clients',
        title: 'Clients',
        component: ClientComponent,
      },
      {
        path: 'Cdetails/:code',
        title: 'Client Details',
        component: ClientDetailsComponent,
      },
      {
        path: 'products',
        title: 'Products',
        component: ProductComponent,
      },
      {
        path: 'Pdetails/:code',
        title: 'Product Details',
        component: ProductDetailsComponent,
      },
      {
        path: 'Operator',
        title: 'Operator',
        component: OperatorComponent,
      },
      {
        path: 'Odetails/:code',
        title: 'Operator Details',
        component: OperatorDetailsComponent,
      },
      {
        path: 'admin',
        title: 'Admin',
        canActivate: [StaffGuard],
        component: AdminComponent,
      },
      {
        path: 'counter',
        title: 'Counter',
        canActivate: [StaffGuard],
        component: CounterComponent,
      },
      {
        path: '404',
        title: 'Not Found',
        component: NotFoundComponent,
      },
      {
        path: '403',
        title: 'Forbidden',
        component: ForbidenComponent,
      },
    ],
  },
];
