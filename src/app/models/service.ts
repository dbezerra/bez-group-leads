export interface Service {
  id: string;
  name: string;
  description: string;
  category: 'construction' | 'electrical' | 'plumbing' | 'cleaning' | 'painting' | 'landscaping' | 'hvac' | 'roofing' | 'other';
  subcategory?: string; // Electrical repairs, Roof installation, etc.
  priceRange: {
    min: number;
    max: number;
  };
  duration?: number; // in hours - optional
  status: 'active' | 'inactive' | 'archived';
  createdAt: Date;
  updatedAt: Date;
  tags?: string[];
  requirements?: string[];
  deliverables?: string[];
  skillsRequired: string[];
  toolsRequired?: string[];
  materialsRequired?: string[];
  licensesRequired: USLicenseType[];
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  locationRestrictions?: string[]; // States where service can be offered
  estimatedWorkers: number; // How many workers are needed
  permitsRequired?: string[]; // Required permits
  insuranceRequired?: {
    generalLiability: boolean;
    workersCompensation: boolean;
    minimumCoverage?: number;
  };
}

export interface USLicenseType {
  type: 'contractor' | 'electrician' | 'plumber' | 'painter' | 'hvac' | 'roofing' | 'general';
  requiredStates: string[];
  description: string;
}