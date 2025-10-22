import { Injectable } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { LeadsService } from './leads';
import { CustomersService } from './customers';
import { ServicesService } from './services';

export interface DashboardStats {
  totalLeads: number;
  totalCustomers: number;
  totalServices: number;
  leadsByStatus: { [key: string]: number };
  customersByStatus: { [key: string]: number };
  recentLeads: any[];
  recentCustomers: any[];
  totalValue: number;
  conversionRate: number;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private leadsService: LeadsService,
    private customersService: CustomersService,
    private servicesService: ServicesService
  ) { }

  getDashboardStats(): Observable<DashboardStats> {
    return combineLatest([
      this.leadsService.getLeads(),
      this.customersService.getCustomers(),
      this.servicesService.getServices()
    ]).pipe(
      map(([leads, customers, services]) => {
        const leadsByStatus = this.groupByStatus(leads, 'status');
        const customersByStatus = this.groupByStatus(customers, 'status');
        
        const recentLeads = leads
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 5);
          
        const recentCustomers = customers
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 5);
          
        const totalValue = leads.reduce((sum, lead) => sum + (lead.value || 0), 0);
        const conversionRate = customers.length > 0 ? (customers.length / (leads.length + customers.length)) * 100 : 0;

        return {
          totalLeads: leads.length,
          totalCustomers: customers.length,
          totalServices: services.length,
          leadsByStatus,
          customersByStatus,
          recentLeads,
          recentCustomers,
          totalValue,
          conversionRate
        };
      })
    );
  }

  private groupByStatus(items: any[], statusField: string): { [key: string]: number } {
    return items.reduce((acc, item) => {
      const status = item[statusField];
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});
  }
}