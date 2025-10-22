import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth';
import { User } from '../../models/user';
import { LogoComponent } from '../logo/logo';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, LogoComponent],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class LayoutComponent implements OnInit {
  isSidebarOpen = true;
  currentUser: User | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  onMobileNavClick() {
    // Close sidebar on mobile when navigation link is clicked
    if (window.innerWidth <= 768) {
      this.isSidebarOpen = false;
    }
  }

  logout() {
    this.authService.logout();
    window.location.href = '/login';
  }

  getMenuItems() {
    if (!this.currentUser) return [];

    if (this.currentUser.type === 'admin') {
      return [
        { path: '/admin/dashboard', icon: 'dashboard', label: 'Dashboard' },
        { path: '/admin/leads', icon: 'person_add', label: 'Leads' },
        { path: '/admin/customers', icon: 'people', label: 'Workers' },
        { path: '/admin/services', icon: 'work', label: 'Services' }
      ];
    } else {
      return [
        { path: '/worker/dashboard', icon: 'dashboard', label: 'Dashboard' },
        { path: '/worker/leads', icon: 'assignment', label: 'Available Leads' },
        { path: '/worker/jobs', icon: 'work', label: 'My Jobs' },
        { path: '/worker/profile', icon: 'person', label: 'My Profile' }
      ];
    }
  }

  getUserTypeLabel() {
    return this.currentUser?.type === 'admin' ? 'Administrator' : 'Worker';
  }

  getUserBezCoins() {
    if (this.currentUser?.type === 'worker') {
      return (this.currentUser as any).bezCoins || 0;
    }
    return 0;
  }
}