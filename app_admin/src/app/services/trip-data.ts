import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Trip } from '../models/trip';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {

  private readonly baseUrl =
    'http://localhost:3000/api';

  private readonly url =
    `${this.baseUrl}/trips`;

  constructor(
    private http: HttpClient
  ) {}

  // Get all trips
  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(
      `${this.url}`
    );
  }

  // Get one trip
  getTrip(
    tripCode: string
  ): Observable<Trip[]> {

    return this.http.get<Trip[]>(
      `${this.url}/${tripCode}`
    );
  }

  // Add a trip
  addTrip(
    formData: Trip
  ): Observable<Trip> {

    return this.http.post<Trip>(
      `${this.url}`,
      formData
    );
  }

  // Update a trip
  updateTrip(
    formData: Trip
  ): Observable<Trip> {

    return this.http.put<Trip>(
      `${this.url}/${formData.code}`,
      formData
    );
  }

  // Delete a trip
  deleteTrip(
    tripCode: string
  ): Observable<Trip> {

    return this.http.delete<Trip>(
      `${this.url}/${tripCode}`
    );
  }

  // Login
  login(
    user: User,
    passwd: string
  ): Observable<AuthResponse> {

    return this.handleAuthAPICall(
      'login',
      user,
      passwd
    );
  }

  // Register
  register(
    user: User,
    passwd: string
  ): Observable<AuthResponse> {

    return this.handleAuthAPICall(
      'register',
      user,
      passwd
    );
  }

  // Shared login/register helper
  private handleAuthAPICall(
    endpoint: string,
    user: User,
    passwd: string
  ): Observable<AuthResponse> {

    const formData = {
      name: user.name,
      email: user.email,
      password: passwd
    };

    return this.http.post<AuthResponse>(
      `${this.baseUrl}/${endpoint}`,
      formData
    );
  }
}