import { Injectable } from '@angular/core';
import { environment } from '../../env';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.apiUrl; // URL de ton backend

  constructor(private http: HttpClient) { }

  getUserProfile(userId: string, token: string): Observable<User> {
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<User>(`${this.apiUrl}/users/${userId}`, { headers });
  }
}
