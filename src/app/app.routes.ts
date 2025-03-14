import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { ListComponent } from './transactions/list/list.component';
import { CreateComponent } from './transactions/create/create.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent},
    {path: 'transactions', component:  TransactionsComponent, children: [
            { path: 'liste', component: ListComponent },
            { path: 'create', component: CreateComponent}
        ]
    }
];
