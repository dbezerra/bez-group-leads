import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Service } from '../models/service';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private servicesSubject = new BehaviorSubject<Service[]>(this.getMockServices());
  public services$ = this.servicesSubject.asObservable();

  constructor() { }

  getServices(): Observable<Service[]> {
    return this.services$;
  }

  getServiceById(id: string): Service | undefined {
    return this.servicesSubject.value.find(service => service.id === id);
  }

  addService(service: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>): Observable<Service> {
    const newService: Service = {
      ...service,
      id: this.generateId(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const currentServices = this.servicesSubject.value;
    this.servicesSubject.next([...currentServices, newService]);
    return of(newService);
  }

  updateService(id: string, updates: Partial<Service>): Observable<Service | null> {
    const currentServices = this.servicesSubject.value;
    const serviceIndex = currentServices.findIndex(service => service.id === id);
    
    if (serviceIndex === -1) return of(null);
    
    const updatedService = {
      ...currentServices[serviceIndex],
      ...updates,
      updatedAt: new Date()
    };
    
    currentServices[serviceIndex] = updatedService;
    this.servicesSubject.next([...currentServices]);
    return of(updatedService);
  }

  deleteService(id: string): Observable<boolean> {
    const currentServices = this.servicesSubject.value;
    const filteredServices = currentServices.filter(service => service.id !== id);
    
    if (filteredServices.length === currentServices.length) return of(false);
    
    this.servicesSubject.next(filteredServices);
    return of(true);
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  private getMockServices(): Service[] {
    return [
      {
        id: '1',
        name: 'Residential Electrical Repairs',
        description: 'Professional electrical repair and maintenance services for homes',
        category: 'electrical',
        subcategory: 'Electrical repairs',
        priceRange: { min: 150, max: 500 },
        duration: 4,
        status: 'active',
        createdAt: new Date('2023-01-01'),
        updatedAt: new Date('2024-01-01'),
        tags: ['Electrical', 'Residential', 'Repairs'],
        requirements: ['Valid electrical license', 'Basic tools', 'Safety equipment'],
        deliverables: ['Technical report', '90-day warranty'],
        skillsRequired: ['Residential electrical', 'Electrical safety'],
        toolsRequired: ['Multimeter', 'Screwdriver set', 'Pliers'],
        materialsRequired: ['Wire', 'Outlets', 'Circuit breakers'],
        licensesRequired: [
          {
            type: 'electrician',
            requiredStates: ['CA', 'TX', 'FL', 'NY'],
            description: 'Licensed electrician required'
          }
        ],
        difficulty: 'medium',
        locationRestrictions: ['CA', 'TX', 'FL', 'NY'],
        estimatedWorkers: 1,
        permitsRequired: ['Electrical permit'],
        insuranceRequired: {
          generalLiability: true,
          workersCompensation: true,
          minimumCoverage: 100000
        }
      },
      {
        id: '2',
        name: 'Fence Construction & Installation',
        description: 'Professional fence construction and installation services for property boundaries',
        category: 'construction',
        subcategory: 'Fence construction',
        priceRange: { min: 800, max: 2500 },
        duration: 16,
        status: 'active',
        createdAt: new Date('2023-01-01'),
        updatedAt: new Date('2024-01-01'),
        tags: ['Construction', 'Fencing', 'Installation'],
        requirements: ['General contractor license', 'Construction tools'],
        deliverables: ['Completed fence', '1-year warranty'],
        skillsRequired: ['Fencing', 'Foundation work', 'Finishing'],
        toolsRequired: ['Level', 'Measuring tape', 'Trowel'],
        materialsRequired: ['Fence panels', 'Concrete', 'Sand'],
        licensesRequired: [
          {
            type: 'contractor',
            requiredStates: ['CA', 'TX', 'FL', 'NY'],
            description: 'General contractor license required'
          }
        ],
        difficulty: 'hard',
        locationRestrictions: ['CA', 'TX', 'FL', 'NY'],
        estimatedWorkers: 2,
        permitsRequired: ['Building permit'],
        insuranceRequired: {
          generalLiability: true,
          workersCompensation: true,
          minimumCoverage: 200000
        }
      },
      {
        id: '3',
        name: 'Post-Construction Cleanup',
        description: 'Complete cleaning services after renovations and construction projects',
        category: 'cleaning',
        subcategory: 'Post-construction cleanup',
        priceRange: { min: 300, max: 1200 },
        duration: 8,
        status: 'active',
        createdAt: new Date('2023-01-01'),
        updatedAt: new Date('2024-01-01'),
        tags: ['Cleaning', 'Post-construction', 'Renovation'],
        requirements: ['Protective equipment', 'Cleaning chemicals'],
        deliverables: ['Clean environment', 'Waste disposal'],
        skillsRequired: ['Heavy cleaning', 'Chemical handling'],
        toolsRequired: ['Industrial vacuum', 'Cleaning chemicals'],
        materialsRequired: ['Detergents', 'Degreasers', 'Gloves'],
        licensesRequired: [
          {
            type: 'general',
            requiredStates: ['CA', 'TX', 'FL', 'NY'],
            description: 'General business license required'
          }
        ],
        difficulty: 'easy',
        locationRestrictions: ['CA', 'TX', 'FL', 'NY'],
        estimatedWorkers: 2,
        permitsRequired: [],
        insuranceRequired: {
          generalLiability: true,
          workersCompensation: true,
          minimumCoverage: 50000
        }
      },
      {
        id: '4',
        name: 'Residential Plumbing Installation',
        description: 'Professional plumbing installation and repair services for homes',
        category: 'plumbing',
        subcategory: 'Plumbing installation',
        priceRange: { min: 200, max: 800 },
        duration: 6,
        status: 'active',
        createdAt: new Date('2023-01-01'),
        updatedAt: new Date('2024-01-01'),
        tags: ['Plumbing', 'Installation', 'Repairs'],
        requirements: ['Plumbing license', 'Specialized tools'],
        deliverables: ['Working system', '6-month warranty'],
        skillsRequired: ['Residential plumbing', 'Soldering', 'Installation'],
        toolsRequired: ['Pipe wrench', 'Soldering torch', 'Pipe cutter'],
        materialsRequired: ['Pipes', 'Fittings', 'Valves'],
        licensesRequired: [
          {
            type: 'plumber',
            requiredStates: ['CA', 'TX', 'FL', 'NY'],
            description: 'Licensed plumber required'
          }
        ],
        difficulty: 'medium',
        locationRestrictions: ['CA', 'TX', 'FL', 'NY'],
        estimatedWorkers: 1,
        permitsRequired: ['Plumbing permit'],
        insuranceRequired: {
          generalLiability: true,
          workersCompensation: true,
          minimumCoverage: 150000
        }
      },
      {
        id: '5',
        name: 'Residential Painting Services',
        description: 'Professional interior and exterior painting services for homes',
        category: 'painting',
        subcategory: 'Residential painting',
        priceRange: { min: 500, max: 2000 },
        duration: 12,
        status: 'active',
        createdAt: new Date('2023-01-01'),
        updatedAt: new Date('2024-01-01'),
        tags: ['Painting', 'Residential', 'Interior', 'Exterior'],
        requirements: ['Painting experience', 'Protective equipment'],
        deliverables: ['Completed painting', '1-year warranty'],
        skillsRequired: ['Surface preparation', 'Painting techniques'],
        toolsRequired: ['Paint roller', 'Brushes', 'Sandpaper'],
        materialsRequired: ['Paint', 'Primer', 'Spackle'],
        licensesRequired: [
          {
            type: 'painter',
            requiredStates: ['CA', 'TX', 'FL', 'NY'],
            description: 'Painting contractor license required'
          }
        ],
        difficulty: 'easy',
        locationRestrictions: ['CA', 'TX', 'FL', 'NY'],
        estimatedWorkers: 2,
        permitsRequired: [],
        insuranceRequired: {
          generalLiability: true,
          workersCompensation: true,
          minimumCoverage: 100000
        }
      },
      {
        id: '6',
        name: 'Landscaping & Garden Maintenance',
        description: 'Professional landscaping and garden maintenance services',
        category: 'landscaping',
        subcategory: 'Garden maintenance',
        priceRange: { min: 200, max: 800 },
        duration: 4,
        status: 'active',
        createdAt: new Date('2023-01-01'),
        updatedAt: new Date('2024-01-01'),
        tags: ['Landscaping', 'Garden', 'Maintenance'],
        requirements: ['Plant knowledge', 'Gardening tools'],
        deliverables: ['Maintained garden', 'Healthy plants'],
        skillsRequired: ['Gardening', 'Landscaping', 'Plant knowledge'],
        toolsRequired: ['Pruning shears', 'Watering can', 'Shovel'],
        materialsRequired: ['Fertilizer', 'Plants', 'Soil'],
        licensesRequired: [
          {
            type: 'general',
            requiredStates: ['CA', 'TX', 'FL', 'NY'],
            description: 'General business license required'
          }
        ],
        difficulty: 'easy',
        locationRestrictions: ['CA', 'TX', 'FL', 'NY'],
        estimatedWorkers: 1,
        permitsRequired: [],
        insuranceRequired: {
          generalLiability: true,
          workersCompensation: true,
          minimumCoverage: 50000
        }
      }
    ];
  }
}