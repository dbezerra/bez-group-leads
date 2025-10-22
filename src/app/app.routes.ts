import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { LayoutComponent } from './components/layout/layout';
import { DashboardComponent } from './components/dashboard/dashboard';
import { LeadsComponent } from './components/leads/leads';
import { CustomersComponent } from './components/customers/customers';
import { ServicesComponent } from './components/services/services';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'leads', component: LeadsComponent },
      { path: 'customers', component: CustomersComponent },
      { path: 'services', component: ServicesComponent }
    ]
  },
  {
    path: 'worker',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'leads', component: LeadsComponent },
      { path: 'profile', component: CustomersComponent }, // Reutilizando componente
      { path: 'jobs', component: ServicesComponent } // Reutilizando componente
    ]
  },
  { path: '**', redirectTo: '/login' }
];