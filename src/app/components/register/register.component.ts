import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.register({ name: this.name, email: this.email, password: this.password }).subscribe({
      next: (response) => {
        this.successMessage = response.message;
        console.log(response.message);
        setTimeout(() => this.router.navigate(['/login']), 2000); // Rediriger vers login après 2s
      },
      error: () => {
        this.errorMessage = "Échec de l'inscription. Vérifiez vos informations.";
      }
    });
  }
}
