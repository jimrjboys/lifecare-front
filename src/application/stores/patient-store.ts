import { create } from 'zustand';
import { Patient, VitalSigns, MedicationAdministration } from '../domain/entities/patient';

interface PatientState {
  patients: Patient[];
  selectedPatientId: string | null;
  
  // Actions
  addPatient: (patient: Omit<Patient, 'id' | 'createdAt' | 'updatedAt' | 'vitals'>) => void;
  updatePatient: (id: string, patient: Partial<Patient>) => void;
  deletePatient: (id: string) => void;
  selectPatient: (id: string | null) => void;
  addVitals: (patientId: string, vitals: Omit<VitalSigns, 'id' | 'patientId' | 'timestamp'>) => void;
  administerMedication: (patientId: string, administration: Omit<MedicationAdministration, 'id' | 'patientId' | 'timestamp'>) => void;
}

export const usePatientStore = create<PatientState>((set) => ({
  patients: [
    {
      id: '1',
      firstName: 'Jean',
      lastName: 'Dupont',
      birthDate: '1980-05-15',
      gender: 'M',
      room: '204',
      socialSecurityNumber: '1 80 05 75 001 002',
      bloodType: 'A+',
      allergies: ['Pénicilline'],
      conditions: ['Hypertension', 'Diabète Type 2'],
      medications: [
        {
          id: 'm1',
          name: 'Doliprane',
          dosage: '1000mg',
          frequency: '3x/jour',
          instructions: 'À prendre pendant les repas'
        },
        {
          id: 'm2',
          name: 'Amlodipine',
          dosage: '5mg',
          frequency: '1x/jour',
          instructions: 'Le matin'
        }
      ],
      vitals: [
        {
          id: 'v1',
          patientId: '1',
          timestamp: new Date(Date.now() - 3600000 * 2),
          heartRate: 72,
          bloodPressureSys: 120,
          bloodPressureDia: 80,
          temperature: 36.6,
          oxygenSaturation: 98,
        },
        {
          id: 'v2',
          patientId: '1',
          timestamp: new Date(Date.now() - 3600000),
          heartRate: 75,
          bloodPressureSys: 125,
          bloodPressureDia: 82,
          temperature: 36.8,
          oxygenSaturation: 97,
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      firstName: 'Marie',
      lastName: 'Curie',
      birthDate: '1992-11-20',
      gender: 'F',
      vitals: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ],
  selectedPatientId: null,

  addPatient: (patientData) => set((state) => ({
    patients: [
      ...state.patients,
      {
        ...patientData,
        id: Math.random().toString(36).substring(7),
        vitals: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]
  })),

  updatePatient: (id, patientData) => set((state) => ({
    patients: state.patients.map((p) => 
      p.id === id ? { ...p, ...patientData, updatedAt: new Date() } : p
    )
  })),

  deletePatient: (id) => set((state) => ({
    patients: state.patients.filter((p) => p.id !== id)
  })),

  selectPatient: (id) => set({ selectedPatientId: id }),

  addVitals: (patientId, vitalsData) => set((state) => ({
    patients: state.patients.map((p) => 
      p.id === patientId 
        ? { 
            ...p, 
            vitals: [
              ...p.vitals, 
              { 
                ...vitalsData, 
                id: Math.random().toString(36).substring(7), 
                patientId, 
                timestamp: new Date() 
              }
            ],
            updatedAt: new Date() 
          } 
        : p
    )
  })),

  administerMedication: (patientId, adminData) => set((state) => ({
    patients: state.patients.map((p) => 
      p.id === patientId 
        ? { 
            ...p, 
            administrations: [
              ...(p.administrations || []), 
              { 
                ...adminData, 
                id: Math.random().toString(36).substring(7), 
                patientId, 
                timestamp: new Date() 
              }
            ],
            updatedAt: new Date() 
          } 
        : p
    )
  })),
}));
