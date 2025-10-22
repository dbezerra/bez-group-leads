import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Lead } from '../models/lead';

@Injectable({
  providedIn: 'root'
})
export class LeadsService {
  private leadsSubject = new BehaviorSubject<Lead[]>(this.getMockLeads());
  public leads$ = this.leadsSubject.asObservable();

  constructor() { }

  getLeads(): Observable<Lead[]> {
    return this.leads$;
  }

  getLeadById(id: string): Lead | undefined {
    return this.leadsSubject.value.find(lead => lead.id === id);
  }

  getLeadsForWorker(workerSkills: string[]): Observable<Lead[]> {
    const allLeads = this.leadsSubject.value;
    const qualifiedLeads = allLeads.filter(lead => 
      lead.status === 'qualified' && 
      workerSkills.some(skill => 
        lead.serviceType.toLowerCase().includes(skill.toLowerCase()) ||
        lead.tags?.some(tag => tag.toLowerCase().includes(skill.toLowerCase()))
      )
    );
    return of(qualifiedLeads);
  }

  addLead(lead: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>): Observable<Lead> {
    const newLead: Lead = {
      ...lead,
      id: this.generateId(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const currentLeads = this.leadsSubject.value;
    this.leadsSubject.next([...currentLeads, newLead]);
    return of(newLead);
  }

  updateLead(id: string, updates: Partial<Lead>): Observable<Lead | null> {
    const currentLeads = this.leadsSubject.value;
    const leadIndex = currentLeads.findIndex(lead => lead.id === id);
    
    if (leadIndex === -1) return of(null);
    
    const updatedLead = {
      ...currentLeads[leadIndex],
      ...updates,
      updatedAt: new Date()
    };
    
    currentLeads[leadIndex] = updatedLead;
    this.leadsSubject.next([...currentLeads]);
    return of(updatedLead);
  }

  deleteLead(id: string): Observable<boolean> {
    const currentLeads = this.leadsSubject.value;
    const filteredLeads = currentLeads.filter(lead => lead.id !== id);
    
    if (filteredLeads.length === currentLeads.length) return of(false);
    
    this.leadsSubject.next(filteredLeads);
    return of(true);
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  private getMockLeads(): Lead[] {
    return [
      {
        id: '1',
        name: 'Carlos Mendes',
        email: 'carlos@empresa.com',
        phone: '(11) 99999-9999',
        company: 'Construtora Mendes',
        status: 'qualified',
        source: 'website',
        value: 2500,
        notes: 'Precisa de reparos elétricos em escritório comercial',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15'),
        assignedTo: undefined,
        tags: ['Elétrica', 'Comercial', 'Urgente'],
        location: {
          street: 'Rua das Flores, 123',
          city: 'São Paulo',
          state: 'SP',
          zipCode: '01234-567',
          neighborhood: 'Centro'
        },
        serviceType: 'Reparos Elétricos',
        urgency: 'high',
        estimatedDuration: 6,
        requirements: ['CREA obrigatório', 'Experiência comercial'],
        budget: { min: 2000, max: 3000 },
        preferredSchedule: {
          startDate: new Date('2024-01-20'),
          endDate: new Date('2024-01-25'),
          flexible: false
        },
        visibilityCost: 50
      },
      {
        id: '2',
        name: 'Ana Silva',
        email: 'ana@casa.com',
        phone: '(11) 88888-8888',
        company: undefined,
        status: 'qualified',
        source: 'referral',
        value: 800,
        notes: 'Quer construir muro na casa nova',
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-01-12'),
        assignedTo: undefined,
        tags: ['Construção', 'Residencial', 'Muro'],
        location: {
          street: 'Av. Paulista, 1000',
          city: 'São Paulo',
          state: 'SP',
          zipCode: '01310-100',
          neighborhood: 'Bela Vista'
        },
        serviceType: 'Construção de Muros',
        urgency: 'medium',
        estimatedDuration: 20,
        requirements: ['Experiência em alvenaria'],
        budget: { min: 600, max: 1000 },
        preferredSchedule: {
          startDate: new Date('2024-02-01'),
          endDate: new Date('2024-02-15'),
          flexible: true
        },
        visibilityCost: 30
      },
      {
        id: '3',
        name: 'Roberto Santos',
        email: 'roberto@loja.com',
        phone: '(11) 77777-7777',
        company: 'Loja Santos',
        status: 'qualified',
        source: 'social',
        value: 400,
        notes: 'Loja precisa de limpeza pós-reforma',
        createdAt: new Date('2024-01-08'),
        updatedAt: new Date('2024-01-14'),
        assignedTo: undefined,
        tags: ['Limpeza', 'Comercial', 'Pós-obra'],
        location: {
          street: 'Rua Augusta, 500',
          city: 'São Paulo',
          state: 'SP',
          zipCode: '01305-000',
          neighborhood: 'Consolação'
        },
        serviceType: 'Limpeza Pós-Obra',
        urgency: 'medium',
        estimatedDuration: 8,
        requirements: ['Equipamentos de limpeza'],
        budget: { min: 300, max: 500 },
        preferredSchedule: {
          startDate: new Date('2024-01-25'),
          endDate: new Date('2024-01-30'),
          flexible: true
        },
        visibilityCost: 25
      },
      {
        id: '4',
        name: 'Maria Costa',
        email: 'maria@casa.com',
        phone: '(11) 66666-6666',
        company: undefined,
        status: 'new',
        source: 'website',
        value: 300,
        notes: 'Problema no encanamento da cozinha',
        createdAt: new Date('2024-01-20'),
        updatedAt: new Date('2024-01-20'),
        assignedTo: undefined,
        tags: ['Hidráulica', 'Residencial', 'Reparo'],
        location: {
          street: 'Rua das Palmeiras, 200',
          city: 'São Paulo',
          state: 'SP',
          zipCode: '04567-890',
          neighborhood: 'Vila Madalena'
        },
        serviceType: 'Reparos Hidráulicos',
        urgency: 'high',
        estimatedDuration: 3,
        requirements: ['Experiência em hidráulica'],
        budget: { min: 200, max: 400 },
        preferredSchedule: {
          startDate: new Date('2024-01-22'),
          endDate: new Date('2024-01-24'),
          flexible: false
        },
        visibilityCost: 20
      },
      {
        id: '5',
        name: 'João Oliveira',
        email: 'joao@casa.com',
        phone: '(11) 55555-5555',
        company: undefined,
        status: 'qualified',
        source: 'phone',
        value: 500,
        notes: 'Quer pintar toda a casa',
        createdAt: new Date('2024-01-18'),
        updatedAt: new Date('2024-01-19'),
        assignedTo: undefined,
        tags: ['Pintura', 'Residencial', 'Completa'],
        location: {
          street: 'Rua dos Lírios, 150',
          city: 'São Paulo',
          state: 'SP',
          zipCode: '02345-678',
          neighborhood: 'Pinheiros'
        },
        serviceType: 'Pintura Residencial',
        urgency: 'low',
        estimatedDuration: 15,
        requirements: ['Experiência em pintura'],
        budget: { min: 400, max: 600 },
        preferredSchedule: {
          startDate: new Date('2024-02-10'),
          endDate: new Date('2024-02-25'),
          flexible: true
        },
        visibilityCost: 35
      }
    ];
  }
}