import { Routes } from '@angular/router';
import { Login } from './login/login';

import { AddTrip } from './add-trip/add-trip';
import { EditTrip } from './edit-trip/edit-trip';
import { DeleteTrip } from './delete-trip/delete-trip';
import { TripListing } from './trip-listing/trip-listing';

export const routes: Routes = [
  {
  path: 'login',
  component: Login
  },
  {
    path: 'add-trip',
    component: AddTrip
  },
  {
    path: 'edit-trip',
    component: EditTrip
  },
  {
    path: 'delete-trip',
    component: DeleteTrip
  },
  {
    path: '',
    component: TripListing,
    pathMatch: 'full'
  }
];