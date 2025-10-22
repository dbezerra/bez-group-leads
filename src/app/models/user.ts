export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  type: 'admin' | 'worker';
  createdAt: Date;
  updatedAt: Date;
}

export interface Worker extends User {
  type: 'worker';
  phone: string;
  company?: string;
  professionalType: string; // Electrician, Plumber, Painter, etc.
  servicesOffered: string[];
  licenses: USLicense[];
  skills: string[];
  rating: number;
  completedJobs: number;
  bezCoins: number;
  location: {
    city: string;
    state: string;
    zipCode: string;
    neighborhood?: string;
  };
  availability: 'available' | 'busy' | 'unavailable';
  bio?: string;
  profileImage?: string;
  insurance: {
    generalLiability: boolean;
    workersCompensation: boolean;
    bondAmount?: number;
  };
  yearsExperience: number;
}

export interface Admin extends User {
  type: 'admin';
  company: string;
  role: string;
}

export interface USLicense {
  id: string;
  type: 'contractor' | 'electrician' | 'plumber' | 'painter' | 'hvac' | 'roofing' | 'general';
  licenseNumber: string;
  issuingState: string;
  expirationDate: Date;
  status: 'active' | 'expired' | 'suspended';
  verified: boolean;
}