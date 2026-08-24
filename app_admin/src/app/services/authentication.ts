import { Inject, Injectable } from '@angular/core';

import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { TripDataService } from './trip-data';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authResp: AuthResponse = new AuthResponse();

  constructor(
    @Inject(BROWSER_STORAGE) private storage: globalThis.Storage,
    private tripDataService: TripDataService
  ) {}

  // Retrieve JWT from browser local storage
  public getToken(): string {
    const token = this.storage.getItem('travlr-token');

    if (!token) {
      return '';
    }

    return token;
  }

  // Save JWT into browser local storage
  public saveToken(token: string): void {
    this.storage.setItem('travlr-token', token);
  }

  // Logout and remove JWT
  public logout(): void {
    this.storage.removeItem('travlr-token');
  }

  // Determine whether we have a non-expired JWT
  public isLoggedIn(): boolean {
    const token = this.getToken();

    if (!token) {
      return false;
    }

    try {
      const payload = JSON.parse(
        atob(token.split('.')[1])
      );

      return payload.exp > (Date.now() / 1000);

    } catch {
      return false;
    }
  }

  // Retrieve user information from JWT
  public getCurrentUser(): User {
    const token = this.getToken();

    const { email, name } = JSON.parse(
      atob(token.split('.')[1])
    );

    return {
      email,
      name
    } as User;
  }

  // Login using TripDataService
  public login(user: User, passwd: string): void {
    this.tripDataService
      .login(user, passwd)
      .subscribe({
        next: (value: AuthResponse) => {
          if (value) {
            console.log(value);

            this.authResp = value;
            this.saveToken(this.authResp.token);
          }
        },

        error: (error: any) => {
          console.log('Error: ' + error);
        }
      });
  }

  // Register using TripDataService
  public register(user: User, passwd: string): void {
    this.tripDataService
      .register(user, passwd)
      .subscribe({
        next: (value: AuthResponse) => {
          if (value) {
            console.log(value);

            this.authResp = value;
            this.saveToken(this.authResp.token);
          }
        },

        error: (error: any) => {
          console.log('Error: ' + error);
        }
      });
  }
}