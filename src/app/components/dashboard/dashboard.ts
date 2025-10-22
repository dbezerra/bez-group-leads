import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';
import { DashboardService, DashboardStats } from '../../services/dashboard';
import { LeadsService } from '../../services/leads';
import { User, Worker } from '../../models/user';
import { Lead } from '../../models/lead';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent implements OnInit {
  stats: DashboardStats | null = null;
  loading = true;
  currentUser: User | null = null;
  qualifiedLeads: Lead[] = [];
  workerStats: any = null;

  constructor(
    private authService: AuthService,
    private dashboardService: DashboardService,
    private leadsService: LeadsService
  ) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.loadDashboardData();
      }
    });
  }

  loadDashboardData() {
    if (this.currentUser?.type === 'admin') {
      this.loadAdminDashboard();
    } else {
      this.loadWorkerDashboard();
    }
  }

  loadAdminDashboard() {
    this.dashboardService.getDashboardStats().subscribe({
      next: (stats) => {
        this.stats = stats;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar estatísticas:', error);
        this.loading = false;
      }
    });
  }

  loadWorkerDashboard() {
    const worker = this.currentUser as Worker;
    
    // Carregar leads qualificados para o worker
    this.leadsService.getLeadsForWorker(worker.skills).subscribe({
      next: (leads) => {
        this.qualifiedLeads = leads;
        this.workerStats = {
          bezCoins: worker.bezCoins,
          completedJobs: worker.completedJobs,
          rating: worker.rating,
          availability: worker.availability,
          qualifiedLeads: leads.length
        };
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar leads:', error);
        this.loading = false;
      }
    });
  }

  getStatusColor(status: string): string {
    const colors: { [key: string]: string } = {
      'new': '#4CAF50',
      'contacted': '#2196F3',
      'qualified': '#FF9800',
      'assigned': '#9C27B0',
      'in-progress': '#FF5722',
      'completed': '#4CAF50',
      'cancelled': '#F44336',
      'active': '#4CAF50',
      'inactive': '#9E9E9E',
      'prospect': '#FF9800'
    };
    return colors[status] || '#9E9E9E';
  }

  getStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      'new': 'New',
      'contacted': 'Contacted',
      'qualified': 'Qualified',
      'assigned': 'Assigned',
      'in-progress': 'In Progress',
      'completed': 'Completed',
      'cancelled': 'Cancelled',
      'active': 'Active',
      'inactive': 'Inactive',
      'prospect': 'Prospect'
    };
    return labels[status] || status;
  }

  getUrgencyColor(urgency: string): string {
    const colors: { [key: string]: string } = {
      'low': '#4CAF50',
      'medium': '#FF9800',
      'high': '#F44336'
    };
    return colors[urgency] || '#9E9E9E';
  }

  getUrgencyLabel(urgency: string): string {
    const labels: { [key: string]: string } = {
      'low': 'Low',
      'medium': 'Medium',
      'high': 'High'
    };
    return labels[urgency] || urgency;
  }
}