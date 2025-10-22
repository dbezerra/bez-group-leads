import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServicesService } from '../../services/services';
import { Service } from '../../models/service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './services.html',
  styleUrl: './services.scss'
})
export class ServicesComponent implements OnInit {
  services: Service[] = [];
  filteredServices: Service[] = [];
  loading = true;
  showAddForm = false;
  searchTerm = '';
  categoryFilter = 'all';
  
  newService: Service = {
    id: '',
    name: '',
    description: '',
    category: 'construction',
    priceRange: { min: 0, max: 0 },
    status: 'active',
    createdAt: new Date(),
    updatedAt: new Date(),
    tags: [],
    requirements: [],
    deliverables: [],
    skillsRequired: [],
    toolsRequired: [],
    materialsRequired: [],
    licensesRequired: [],
    difficulty: 'easy',
    locationRestrictions: [],
    estimatedWorkers: 1
  };

  constructor(private servicesService: ServicesService) {}

  ngOnInit() {
    this.loadServices();
  }

  loadServices() {
    this.servicesService.getServices().subscribe({
      next: (services) => {
        this.services = services;
        this.filteredServices = services;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar serviços:', error);
        this.loading = false;
      }
    });
  }

  filterServices() {
    this.filteredServices = this.services.filter(service => {
      const matchesSearch = !this.searchTerm || 
        service.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesCategory = this.categoryFilter === 'all' || service.category === this.categoryFilter;
      
      return matchesSearch && matchesCategory;
    });
  }

  onSearchChange() {
    this.filterServices();
  }

  onCategoryFilterChange() {
    this.filterServices();
  }

  addService() {
    if (this.newService.name && this.newService.description) {
      const serviceToAdd: Omit<Service, 'id' | 'createdAt' | 'updatedAt'> = {
        name: this.newService.name,
        description: this.newService.description,
        category: this.newService.category,
        priceRange: this.newService.priceRange,
        status: this.newService.status,
        tags: this.newService.tags,
        requirements: this.newService.requirements,
        deliverables: this.newService.deliverables,
        skillsRequired: this.newService.skillsRequired,
        toolsRequired: this.newService.toolsRequired,
        materialsRequired: this.newService.materialsRequired,
        licensesRequired: this.newService.licensesRequired,
        difficulty: this.newService.difficulty,
        locationRestrictions: this.newService.locationRestrictions,
        estimatedWorkers: this.newService.estimatedWorkers
      };
      
      this.servicesService.addService(serviceToAdd).subscribe({
        next: (service) => {
          this.services.unshift(service);
          this.filterServices();
          this.resetForm();
          this.showAddForm = false;
        },
        error: (error) => {
          console.error('Erro ao adicionar serviço:', error);
        }
      });
    }
  }

  onStatusChange(service: Service, event: Event) {
    const target = event.target as HTMLSelectElement;
    if (target) {
      this.updateServiceStatus(service, target.value);
    }
  }

  updateServiceStatus(service: Service, newStatus: string) {
    this.servicesService.updateService(service.id, { status: newStatus as any }).subscribe({
      next: (updatedService) => {
        if (updatedService) {
          const index = this.services.findIndex(s => s.id === service.id);
          if (index !== -1) {
            this.services[index] = updatedService;
            this.filterServices();
          }
        }
      },
      error: (error) => {
        console.error('Erro ao atualizar serviço:', error);
      }
    });
  }

  deleteService(service: Service) {
    if (confirm('Tem certeza que deseja excluir este serviço?')) {
      this.servicesService.deleteService(service.id).subscribe({
        next: (success) => {
          if (success) {
            this.services = this.services.filter(s => s.id !== service.id);
            this.filterServices();
          }
        },
        error: (error) => {
          console.error('Erro ao excluir serviço:', error);
        }
      });
    }
  }

  resetForm() {
    this.newService = {
      id: '',
      name: '',
      description: '',
      category: 'construction',
      priceRange: { min: 0, max: 0 },
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: [],
      requirements: [],
      deliverables: [],
      skillsRequired: [],
      toolsRequired: [],
      materialsRequired: [],
      licensesRequired: [],
      difficulty: 'easy',
      locationRestrictions: [],
      estimatedWorkers: 1
    };
  }

  getStatusColor(status: string): string {
    const colors: { [key: string]: string } = {
      'active': '#4CAF50',
      'inactive': '#9E9E9E',
      'archived': '#F44336'
    };
    return colors[status] || '#9E9E9E';
  }

  getStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      'active': 'Ativo',
      'inactive': 'Inativo',
      'archived': 'Arquivado'
    };
    return labels[status] || status;
  }

  getCategoryLabel(category: string): string {
    const labels: { [key: string]: string } = {
      'construction': 'Construction',
      'electrical': 'Electrical',
      'plumbing': 'Plumbing',
      'cleaning': 'Cleaning',
      'painting': 'Painting',
      'landscaping': 'Landscaping',
      'hvac': 'HVAC',
      'roofing': 'Roofing',
      'other': 'Other'
    };
    return labels[category] || category;
  }
}