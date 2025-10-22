import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LeadsService } from '../../services/leads';
import { Lead } from '../../models/lead';

@Component({
  selector: 'app-leads',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './leads.html',
  styleUrl: './leads.scss'
})
export class LeadsComponent implements OnInit {
  leads: Lead[] = [];
  filteredLeads: Lead[] = [];
  loading = true;
  showAddForm = false;
  searchTerm = '';
  statusFilter = 'all';
  
  newLead: Partial<Lead> = {
    name: '',
    email: '',
    phone: '',
    company: '',
    status: 'new',
    source: 'website',
    value: 0,
    notes: '',
    tags: []
  };

  constructor(private leadsService: LeadsService) {}

  ngOnInit() {
    this.loadLeads();
  }

  loadLeads() {
    this.leadsService.getLeads().subscribe({
      next: (leads) => {
        this.leads = leads;
        this.filteredLeads = leads;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar leads:', error);
        this.loading = false;
      }
    });
  }

  filterLeads() {
    this.filteredLeads = this.leads.filter(lead => {
      const matchesSearch = !this.searchTerm || 
        lead.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        lead.company?.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesStatus = this.statusFilter === 'all' || lead.status === this.statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }

  onSearchChange() {
    this.filterLeads();
  }

  onStatusFilterChange() {
    this.filterLeads();
  }

  addLead() {
    if (this.newLead.name && this.newLead.email) {
      this.leadsService.addLead(this.newLead as Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>).subscribe({
        next: (lead) => {
          this.leads.unshift(lead);
          this.filterLeads();
          this.resetForm();
          this.showAddForm = false;
        },
        error: (error) => {
          console.error('Erro ao adicionar lead:', error);
        }
      });
    }
  }

  onStatusChange(lead: Lead, event: Event) {
    const target = event.target as HTMLSelectElement;
    if (target) {
      this.updateLeadStatus(lead, target.value);
    }
  }

  updateLeadStatus(lead: Lead, newStatus: string) {
    this.leadsService.updateLead(lead.id, { status: newStatus as any }).subscribe({
      next: (updatedLead) => {
        if (updatedLead) {
          const index = this.leads.findIndex(l => l.id === lead.id);
          if (index !== -1) {
            this.leads[index] = updatedLead;
            this.filterLeads();
          }
        }
      },
      error: (error) => {
        console.error('Erro ao atualizar lead:', error);
      }
    });
  }

  deleteLead(lead: Lead) {
    if (confirm('Tem certeza que deseja excluir este lead?')) {
      this.leadsService.deleteLead(lead.id).subscribe({
        next: (success) => {
          if (success) {
            this.leads = this.leads.filter(l => l.id !== lead.id);
            this.filterLeads();
          }
        },
        error: (error) => {
          console.error('Erro ao excluir lead:', error);
        }
      });
    }
  }

  resetForm() {
    this.newLead = {
      name: '',
      email: '',
      phone: '',
      company: '',
      status: 'new',
      source: 'website',
      value: 0,
      notes: '',
      tags: []
    };
  }

  getStatusColor(status: string): string {
    const colors: { [key: string]: string } = {
      'new': '#4CAF50',
      'contacted': '#2196F3',
      'qualified': '#FF9800',
      'proposal': '#9C27B0',
      'negotiation': '#FF5722',
      'closed-won': '#4CAF50',
      'closed-lost': '#F44336'
    };
    return colors[status] || '#9E9E9E';
  }

  getStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      'new': 'Novo',
      'contacted': 'Contatado',
      'qualified': 'Qualificado',
      'proposal': 'Proposta',
      'negotiation': 'Negociação',
      'closed-won': 'Fechado - Ganho',
      'closed-lost': 'Fechado - Perdido'
    };
    return labels[status] || status;
  }

  getSourceLabel(source: string): string {
    const labels: { [key: string]: string } = {
      'website': 'Website',
      'referral': 'Indicação',
      'social': 'Redes Sociais',
      'email': 'E-mail',
      'phone': 'Telefone',
      'other': 'Outro'
    };
    return labels[source] || source;
  }
}