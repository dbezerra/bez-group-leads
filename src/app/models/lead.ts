export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  status: 'new' | 'contacted' | 'qualified' | 'assigned' | 'in-progress' | 'completed' | 'cancelled';
  source: 'website' | 'referral' | 'social' | 'email' | 'phone' | 'other';
  value?: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  assignedTo?: string; // Worker ID
  tags?: string[];
  location: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    neighborhood?: string;
  };
  serviceType: string; // Type of service requested
  urgency: 'low' | 'medium' | 'high';
  estimatedDuration?: number; // in hours
  requirements?: string[];
  budget?: {
    min: number;
    max: number;
  };
  preferredSchedule?: {
    startDate: Date;
    endDate: Date;
    flexible: boolean;
  };
  visibilityCost: number; // BEZCoins needed to see details
  permitsRequired?: string[]; // Building permits needed
  inspectionRequired?: boolean;
}