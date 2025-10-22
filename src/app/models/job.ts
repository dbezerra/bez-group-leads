export interface BezCoinTransaction {
  id: string;
  workerId: string;
  leadId: string;
  amount: number;
  type: 'spent' | 'earned';
  description: string;
  createdAt: Date;
}

export interface Job {
  id: string;
  leadId: string;
  workerId: string;
  serviceId: string;
  status: 'assigned' | 'accepted' | 'in-progress' | 'completed' | 'cancelled';
  startDate?: Date;
  endDate?: Date;
  actualDuration?: number;
  rating?: number;
  review?: string;
  paymentStatus: 'pending' | 'paid' | 'disputed';
  paymentAmount?: number;
  createdAt: Date;
  updatedAt: Date;
}
