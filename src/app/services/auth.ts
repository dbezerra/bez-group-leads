import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User, Worker, Admin } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    // Verificar se há usuário salvo no localStorage
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }

  login(email: string, password: string): Observable<User | null> {
    // Simulação de login - em produção seria uma chamada HTTP
    const users = this.getMockUsers();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      this.currentUserSubject.next(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return of(user);
    }
    
    return of(null);
  }

  logout(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  isAdmin(): boolean {
    return this.currentUserSubject.value?.type === 'admin';
  }

  isWorker(): boolean {
    return this.currentUserSubject.value?.type === 'worker';
  }

  private getMockUsers(): User[] {
    return [
      {
        id: '1',
        email: 'admin@bezleads.com',
        password: 'admin123',
        name: 'BEZ Leads Administrator',
        type: 'admin',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
        company: 'BEZ Leads LLC',
        role: 'General Manager'
      } as Admin,
      {
        id: '2',
        email: 'mike@electrician.com',
        password: 'worker123',
        name: 'Mike Johnson',
        type: 'worker',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
        phone: '(555) 123-4567',
        company: 'Johnson Electrical Services',
        professionalType: 'Licensed Electrician',
        servicesOffered: ['Electrical repairs', 'Outlet installation', 'Circuit breaker replacement', 'Panel upgrades'],
        licenses: [
          {
            id: '1',
            type: 'electrician',
            licenseNumber: 'EL-2024-001',
            issuingState: 'CA',
            expirationDate: new Date('2025-12-31'),
            status: 'active',
            verified: true
          }
        ],
        skills: ['Residential electrical', 'Commercial electrical', 'Automation'],
        rating: 4.8,
        completedJobs: 45,
        bezCoins: 150,
        location: {
          city: 'Los Angeles',
          state: 'CA',
          zipCode: '90210',
          neighborhood: 'Beverly Hills'
        },
        availability: 'available',
        bio: 'Licensed electrician with 10 years of experience in residential and commercial repairs.',
        insurance: {
          generalLiability: true,
          workersCompensation: true,
          bondAmount: 50000
        },
        yearsExperience: 10
      } as Worker,
      {
        id: '3',
        email: 'sarah@cleaning.com',
        password: 'worker123',
        name: 'Sarah Williams',
        type: 'worker',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
        phone: '(555) 987-6543',
        company: 'Williams Cleaning Services',
        professionalType: 'Cleaning Specialist',
        servicesOffered: ['Residential cleaning', 'Commercial cleaning', 'Post-construction cleanup'],
        licenses: [
          {
            id: '2',
            type: 'general',
            licenseNumber: 'GC-2024-002',
            issuingState: 'CA',
            expirationDate: new Date('2025-12-31'),
            status: 'active',
            verified: true
          }
        ],
        skills: ['General cleaning', 'Organization', 'Chemical handling'],
        rating: 4.9,
        completedJobs: 78,
        bezCoins: 200,
        location: {
          city: 'Los Angeles',
          state: 'CA',
          zipCode: '90028',
          neighborhood: 'Hollywood'
        },
        availability: 'available',
        bio: 'Professional cleaning specialist with trained team for residential and commercial services.',
        insurance: {
          generalLiability: true,
          workersCompensation: true,
          bondAmount: 25000
        },
        yearsExperience: 8
      } as Worker
    ];
  }
}