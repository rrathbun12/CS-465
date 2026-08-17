import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import { Router } from '@angular/router';

import { TripDataService } from '../services/trip-data';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-delete-trip',
  imports: [],
  templateUrl: './delete-trip.html',
  styleUrl: './delete-trip.css'
})
export class DeleteTrip implements OnInit {

  tripCode: string = '';
  tripName: string = '';

  deleted = false;
  message: string = '';

  constructor(
    private tripDataService: TripDataService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.tripCode = localStorage.getItem('tripCode') || '';
    this.tripName = localStorage.getItem('tripName') || '';

    if (!this.tripCode) {
      this.router.navigate(['/']);
    }
  }

  public confirmDelete(): void {
    this.tripDataService.deleteTrip(this.tripCode)
      .subscribe({
        next: (value: Trip) => {
          console.log('Trip deleted:', value);

          this.deleted = true;
          this.message = this.tripName + ' trip is deleted.';

          localStorage.removeItem('tripCode');
          localStorage.removeItem('tripName');

          this.cdr.markForCheck();
        },

        error: (error: any) => {
          console.error('Error deleting trip:', error);

          this.message = 'Unable to delete ' + this.tripName + '.';

          this.cdr.markForCheck();
        }
      });
  }

  public cancel(): void {
    localStorage.removeItem('tripCode');
    localStorage.removeItem('tripName');

    this.router.navigate(['/']);
  }

  public returnToTrips(): void {
    this.router.navigate(['/']);
  }
}