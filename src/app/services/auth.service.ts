import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { environment } from '../../env';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { RegisterResponse } from '../models/RegisterResponse';
import { LoginResponse } from '../models/LoginResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl; // Remplace avec ton backend

  constructor(private http: HttpClient, private router: Router, @Inject(PLATFORM_ID) private platformId: object) {}

  login(credentials: { email: string; password: string }): Observable<LoginResponse> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap(response => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user_id', response._id);
        }
      })
    );
  }

  register(userData: { name: string; email: string; password: string }): Observable<RegisterResponse> {
    return this.http.post<any>(`${this.apiUrl}/auth/register`, userData);
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
