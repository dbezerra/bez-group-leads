import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { LogoComponent } from '../logo/logo';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, LogoComponent],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {
  email = '';
  password = '';
  loading = false;
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    if (!this.email || !this.password) {
      this.error = 'Please fill in all fields';
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService.login(this.email, this.password).subscribe({
      next: (user) => {
        this.loading = false;
        if (user) {
          if (user.type === 'admin') {
            this.router.navigate(['/admin/dashboard']);
          } else {
            this.router.navigate(['/worker/dashboard']);
          }
        } else {
          this.error = 'Invalid email or password';
        }
      },
      error: (error) => {
        this.loading = false;
        this.error = 'Login error. Please try again.';
        console.error('Login error:', error);
      }
    });
  }

  getDemoCredentials() {
    return {
      admin: { email: 'admin@bezleads.com', password: 'admin123' },
      worker: { email: 'mike@electrician.com', password: 'worker123' }
    };
  }

  fillDemo(type: 'admin' | 'worker') {
    const credentials = this.getDemoCredentials()[type];
    this.email = credentials.email;
    this.password = credentials.password;
  }
}