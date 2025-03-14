import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { UserService } from '../../services/user.service';
import { User } from '../../models/User';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  transactions: any[] = [];
    loading: boolean = false;
    error: string = '';
    user: User = {
      name: '',
      email: '',
      _id: '',
      transactions: []
    };
  
    constructor(private transactionService: TransactionService, private router: Router, @Inject(PLATFORM_ID) private platformId: Object, private userService: UserService) {}
  
    ngOnInit(): void {
      
      if(isPlatformBrowser(this.platformId)) {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('user_id');
        if (!token || !userId) {
          this.router.navigate(['/login']);
          return;
        }
    
        this.loading = true;
        this.transactionService.getTransactions(userId, token).subscribe(
          (data) => {
            this.userService.getUserProfile(userId, token).subscribe(
              (res) => {
                this.user = res;
              }, (err) => {
                this.error = 'Impossible de récupérer les informations de l\'utilisateur';
              });
            this.transactions = data;
            this.loading = false;
          },
          (err) => {
            this.error = 'Pas de transaction disponible';
            this.loading = false;
          }
        );
      }
    }

    navigateToCreateTransaction(): void {
      this.router.navigate(['/transactions/create']);
    }
}
