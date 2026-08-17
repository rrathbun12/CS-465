import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';

import { Trip } from '../models/trip';
import { TripDataService } from '../services/trip-data';

@Component({
  selector: 'app-add-trip',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-trip.html',
  styleUrl: './add-trip.css'
})
export class AddTrip implements OnInit {

  public addForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripService: TripDataService
  ) {}

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      _id: [''],
      code: ['', Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  public onSubmit(): void {
    this.submitted = true;

    if (this.addForm.valid) {
      const newTrip = this.addForm.getRawValue() as Trip;

      this.tripService.addTrip(newTrip)
        .subscribe({
          next: (data: Trip) => {
            console.log(data);
            this.router.navigate(['/']);
          },

          error: (error: any) => {
            console.log('Error: ' + error);
          }
        });
    }
  }

  get f() {
    return this.addForm.controls;
  }
}