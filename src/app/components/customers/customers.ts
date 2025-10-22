import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomersService } from '../../services/customers';
import { Customer } from '../../models/customer';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customers.html',
  styleUrl: './customers.scss'
})
export class CustomersComponent implements OnInit {
  customers: Customer[] = [];
  filteredCustomers: Customer[] = [];
  loading = true;
  showAddForm = false;
  searchTerm = '';
  statusFilter = 'all';
  
  newCustomer: Partial<Customer> = {
    name: '',
    email: '',
    phone: '',
    company: '',
    status: 'prospect',
    industry: '',
    notes: '',
    tags: []
  };

  constructor(private customersService: CustomersService) {}

  ngOnInit() {
    this.loadCustomers();
  }

  loadCustomers() {
    this.customersService.getCustomers().subscribe({
      next: (customers) => {
        this.customers = customers;
        this.filteredCustomers = customers;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar clientes:', error);
        this.loading = false;
      }
    });
  }

  filterCustomers() {
    this.filteredCustomers = this.customers.filter(customer => {
      const matchesSearch = !this.searchTerm || 
        customer.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        customer.company?.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesStatus = this.statusFilter === 'all' || customer.status === this.statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }

  onSearchChange() {
    this.filterCustomers();
  }

  onStatusFilterChange() {
    this.filterCustomers();
  }

  addCustomer() {
    if (this.newCustomer.name && this.newCustomer.email) {
      this.customersService.addCustomer(this.newCustomer as Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>).subscribe({
        next: (customer) => {
          this.customers.unshift(customer);
          this.filterCustomers();
          this.resetForm();
          this.showAddForm = false;
        },
        error: (error) => {
          console.error('Erro ao adicionar cliente:', error);
        }
      });
    }
  }

  onStatusChange(customer: Customer, event: Event) {
    const target = event.target as HTMLSelectElement;
    if (target) {
      this.updateCustomerStatus(customer, target.value);
    }
  }

  updateCustomerStatus(customer: Customer, newStatus: string) {
    this.customersService.updateCustomer(customer.id, { status: newStatus as any }).subscribe({
      next: (updatedCustomer) => {
        if (updatedCustomer) {
          const index = this.customers.findIndex(c => c.id === customer.id);
          if (index !== -1) {
            this.customers[index] = updatedCustomer;
            this.filterCustomers();
          }
        }
      },
      error: (error) => {
        console.error('Erro ao atualizar cliente:', error);
      }
    });
  }

  deleteCustomer(customer: Customer) {
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
      this.customersService.deleteCustomer(customer.id).subscribe({
        next: (success) => {
          if (success) {
            this.customers = this.customers.filter(c => c.id !== customer.id);
            this.filterCustomers();
          }
        },
        error: (error) => {
          console.error('Erro ao excluir cliente:', error);
        }
      });
    }
  }

  resetForm() {
    this.newCustomer = {
      name: '',
      email: '',
      phone: '',
      company: '',
      status: 'prospect',
      industry: '',
      notes: '',
      tags: []
    };
  }

  getStatusColor(status: string): string {
    const colors: { [key: string]: string } = {
      'active': '#4CAF50',
      'inactive': '#9E9E9E',
      'prospect': '#FF9800'
    };
    return colors[status] || '#9E9E9E';
  }

  getStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      'active': 'Ativo',
      'inactive': 'Inativo',
      'prospect': 'Prospect'
    };
    return labels[status] || status;
  }
}