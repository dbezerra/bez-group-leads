import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  private customersSubject = new BehaviorSubject<Customer[]>(this.getMockCustomers());
  public customers$ = this.customersSubject.asObservable();

  constructor() { }

  getCustomers(): Observable<Customer[]> {
    return this.customers$;
  }

  getCustomerById(id: string): Customer | undefined {
    return this.customersSubject.value.find(customer => customer.id === id);
  }

  addCustomer(customer: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>): Observable<Customer> {
    const newCustomer: Customer = {
      ...customer,
      id: this.generateId(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const currentCustomers = this.customersSubject.value;
    this.customersSubject.next([...currentCustomers, newCustomer]);
    return of(newCustomer);
  }

  updateCustomer(id: string, updates: Partial<Customer>): Observable<Customer | null> {
    const currentCustomers = this.customersSubject.value;
    const customerIndex = currentCustomers.findIndex(customer => customer.id === id);
    
    if (customerIndex === -1) return of(null);
    
    const updatedCustomer = {
      ...currentCustomers[customerIndex],
      ...updates,
      updatedAt: new Date()
    };
    
    currentCustomers[customerIndex] = updatedCustomer;
    this.customersSubject.next([...currentCustomers]);
    return of(updatedCustomer);
  }

  deleteCustomer(id: string): Observable<boolean> {
    const currentCustomers = this.customersSubject.value;
    const filteredCustomers = currentCustomers.filter(customer => customer.id !== id);
    
    if (filteredCustomers.length === currentCustomers.length) return of(false);
    
    this.customersSubject.next(filteredCustomers);
    return of(true);
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  private getMockCustomers(): Customer[] {
    return [
      {
        id: '1',
        name: 'TechCorp Ltda',
        email: 'contato@techcorp.com',
        phone: '(11) 3333-3333',
        company: 'TechCorp Ltda',
        address: {
          street: 'Rua das Flores, 123',
          city: 'São Paulo',
          state: 'SP',
          zipCode: '01234-567',
          country: 'Brasil'
        },
        status: 'active',
        industry: 'Tecnologia',
        notes: 'Cliente desde 2023, muito satisfeito com nossos serviços',
        createdAt: new Date('2023-06-15'),
        updatedAt: new Date('2024-01-10'),
        tags: ['TI', 'Corporativo'],
        totalValue: 25000,
        lastContact: new Date('2024-01-10')
      },
      {
        id: '2',
        name: 'StartupXYZ',
        email: 'contato@startupxyz.com',
        phone: '(11) 4444-4444',
        company: 'StartupXYZ',
        address: {
          street: 'Av. Paulista, 1000',
          city: 'São Paulo',
          state: 'SP',
          zipCode: '01310-100',
          country: 'Brasil'
        },
        status: 'active',
        industry: 'Startup',
        notes: 'Startup em crescimento, precisa de soluções escaláveis',
        createdAt: new Date('2023-08-20'),
        updatedAt: new Date('2024-01-05'),
        tags: ['Startup', 'Inovação'],
        totalValue: 15000,
        lastContact: new Date('2024-01-05')
      },
      {
        id: '3',
        name: 'Agência Digital Pro',
        email: 'contato@agenciadigital.com',
        phone: '(11) 5555-5555',
        company: 'Agência Digital Pro',
        address: {
          street: 'Rua Augusta, 500',
          city: 'São Paulo',
          state: 'SP',
          zipCode: '01305-000',
          country: 'Brasil'
        },
        status: 'prospect',
        industry: 'Marketing',
        notes: 'Agência interessada em parceria',
        createdAt: new Date('2023-12-01'),
        updatedAt: new Date('2023-12-15'),
        tags: ['Marketing', 'Parceria'],
        totalValue: 0,
        lastContact: new Date('2023-12-15')
      }
    ];
  }
}