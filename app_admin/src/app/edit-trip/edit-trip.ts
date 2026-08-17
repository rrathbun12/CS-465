import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';

import { TripDataService } from '../services/trip-data';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-edit-trip',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './edit-trip.html',
  styleUrl: './edit-trip.css'
})
export class EditTrip implements OnInit {

  public editForm!: FormGroup;
  public trip?: Trip;

  submitted = false;
  message: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripDataService: TripDataService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    // Retrieve the trip code saved by the TripCard component
    const tripCode = localStorage.getItem('tripCode');

    if (!tripCode) {
      console.error('Could not find a stored trip code.');
      this.router.navigate(['/']);
      return;
    }

    console.log('EditTrip::ngOnInit');
    console.log('tripCode: ' + tripCode);

    this.editForm = this.formBuilder.group({
      _id: [''],
      code: [tripCode, Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required]
    });

    this.tripDataService.getTrip(tripCode)
      .subscribe({
        next: (value: Trip[]) => {

          if (value.length === 0) {
            this.message = 'No Trip Retrieved!';
            this.cdr.markForCheck();
            return;
          }

          this.trip = value[0];

          // Convert MongoDB/JSON ISO date into YYYY-MM-DD
          // so the HTML date input can display it correctly.
          const formValue = {
            ...value[0],
            start: this.formatDateForInput(value[0].start)
          };

          this.editForm.patchValue(formValue);

          this.message =
            'Trip: ' + tripCode + ' retrieved';

          console.log(this.message);

          this.cdr.markForCheck();
        },

        error: (error: any) => {
          console.error('Error: ', error);
          this.message = 'Error retrieving trip';
          this.cdr.markForCheck();
        }
      });
  }

  public onSubmit(): void {

    this.submitted = true;

    if (this.editForm.valid) {

      const updatedTrip =
        this.editForm.getRawValue() as Trip;

      this.tripDataService.updateTrip(updatedTrip)
        .subscribe({
          next: (value: Trip) => {
            console.log(value);

            localStorage.removeItem('tripCode');

            this.router.navigate(['/']);
          },

          error: (error: any) => {
            console.error('Error: ', error);
          }
        });
    }
  }

  get f() {
    return this.editForm.controls;
  }

  private formatDateForInput(
    value: Date | string
  ): string {

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return '';
    }

    return date.toISOString().slice(0, 10);
  }
}