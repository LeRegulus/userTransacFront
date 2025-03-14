import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../env';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private apiUrl = environment.apiUrl; // URL de ton API backend

  constructor(private http: HttpClient) {}

  // Récupérer les transactions d'un utilisateur
  getTransactions(userId: string, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/users/${userId}/transactions`, { headers });
  }

  // Créer une nouvelle transaction pour un utilisateur
  createTransaction(userId: string, amount: number, description: string, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const body = { amount, description };
    return this.http.post(`${this.apiUrl}/users/${userId}/transactions`, body, { headers });
  }
}
