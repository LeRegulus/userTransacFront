import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {FormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

// Importation des modules Angular Material
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: () => {
        this.router.navigate(['/transactions/liste']); // Redirection après connexion
      },
      error: () => {
        this.errorMessage = "Échec de l'authentification. Vérifiez vos identifiants.";
      }
    });
  }
}
