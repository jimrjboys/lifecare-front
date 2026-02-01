export interface VitalSigns {
  id: string;
  patientId: string;
  timestamp: Date;
  heartRate: number;
  bloodPressureSys: number;
  bloodPressureDia: number;
  temperature: number;
  oxygenSaturation: number;
  respiratoryRate?: number;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  instructions?: string;
}

export interface MedicationAdministration {
  id: string;
  medicationId: string;
  patientId: string;
  timestamp: Date;
  administeredBy: string;
  status: 'administered' | 'refused' | 'deferred';
  notes?: string;
}

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: 'M' | 'F' | 'O';
  socialSecurityNumber?: string;
  phone?: string;
  email?: string;
  address?: string;
  bloodType?: string;
  allergies?: string[];
  conditions?: string[];
  room?: string;
  vitals: VitalSigns[];
  medications?: Medication[];
  administrations?: MedicationAdministration[];
  createdAt: Date;
  updatedAt: Date;
}
