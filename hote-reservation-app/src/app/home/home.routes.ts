import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { ReservationComponent } from '../reservation/reservation.component';
import { ReservationListComponent } from '../reservation-list/reservation-list.component';

export const home_routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'new',
    component: ReservationComponent,
  },
  {
    path: 'list',
    component: ReservationListComponent,
  },
  {
    path: 'edit/:id',
    component: ReservationComponent,
  },
];
