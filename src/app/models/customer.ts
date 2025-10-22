export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  status: 'active' | 'inactive' | 'prospect';
  industry?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  tags?: string[];
  totalValue?: number;
  lastContact?: Date;
}