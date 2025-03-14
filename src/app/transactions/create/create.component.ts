import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { UserService } from '../../services/user.service';
import { User } from '../../models/User';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {

  amount: number = 0;
    description: string = '';
    loading: boolean = false;
    error: string = '';
    success: string = '';
    user: User = {
      name: '',
      email: '',
      _id: '',
      transactions: []
    };
  
    constructor(private transactionService: TransactionService, private router: Router, @Inject(PLATFORM_ID) private platformId: Object, private userService: UserService) {}
  
    ngOnInit(): void {
      if (isPlatformBrowser(this.platformId)) {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('user_id');
        if (!token || !userId) {
          this.router.navigate(['/login']);
          return;
        }
  
        this.userService.getUserProfile(userId, token).subscribe(
          (resp) => {
            this.user = resp;
          },
          (err) => {
            this.error = 'Impossible de récupérer les informations de l\'utilisateur';
            this.router.navigate(['/login']);
          }
        );
      }
    }

    createTransaction(): void {
      if(isPlatformBrowser(this.platformId)) {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('user_id');
        if (!token || !userId) {
          this.router.navigate(['/login']);
          return;
        }
    
        this.loading = true;
        this.transactionService.createTransaction(userId, this.amount, this.description, token).subscribe(
          (data) => {
            this.success = 'Transaction créée avec succès !';
            this.loading = false;
            this.amount = 0;
            this.description = '';
            this.router.navigate(['/transactions/liste']);
          },
          (err) => {
            this.error = 'Erreur lors de la création de la transaction';
            this.loading = false;
          }
        );
      }
    }

}
