import { create } from 'zustand';
import { Patient, VitalSigns, MedicationAdministration } from '../domain/entities/patient';
import { apiClient } from '../../infrastructure/api/api-client';

interface PatientState {
  patients: Patient[];
  selectedPatientId: string | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchPatients: () => Promise<void>;
  addPatient: (patient: Omit<Patient, 'id' | 'createdAt' | 'updatedAt' | 'vitals'>) => Promise<void>;
  updatePatient: (id: string, patient: Partial<Patient>) => Promise<void>;
  deletePatient: (id: string) => Promise<void>;
  selectPatient: (id: string | null) => void;
  addVitals: (patientId: string, vitals: Omit<VitalSigns, 'id' | 'patientId' | 'timestamp'>) => Promise<void>;
  administerMedication: (patientId: string, administration: Omit<MedicationAdministration, 'id' | 'patientId' | 'timestamp'>) => Promise<void>;
}

export const usePatientStore = create<PatientState>((set) => ({
  patients: [],
  selectedPatientId: null,
  isLoading: false,
  error: null,

  fetchPatients: async () => {
    set({ isLoading: true, error: null });
    try {
      const patients = await apiClient.get('/patients');
      set({ patients, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  addPatient: async (patientData) => {
    set({ isLoading: true, error: null });
    try {
      const newPatient = await apiClient.post('/patients', patientData);
      set((state) => ({ 
        patients: [newPatient, ...state.patients],
        isLoading: false 
      }));
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  updatePatient: async (id, patientData) => {
    set({ isLoading: true, error: null });
    try {
      const updatedPatient = await apiClient.patch(`/patients/${id}`, patientData);
      set((state) => ({
        patients: state.patients.map((p) => p.id === id ? updatedPatient : p),
        isLoading: false
      }));
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  deletePatient: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await apiClient.delete(`/patients/${id}`);
      set((state) => ({
        patients: state.patients.filter((p) => p.id !== id),
        isLoading: false
      }));
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  selectPatient: (id) => set({ selectedPatientId: id }),

  addVitals: async (patientId, vitalsData) => {
    set({ isLoading: true, error: null });
    try {
      const newVitals = await apiClient.post(`/medical/vitals/${patientId}`, vitalsData);
      set((state) => ({
        patients: state.patients.map((p) => {
          if (p.id === patientId) {
            return {
              ...p,
              vitals: [newVitals, ...(p.vitals || [])]
            };
          }
          return p;
        }),
        isLoading: false
      }));
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  administerMedication: async (patientId, administrationData) => {
    set({ isLoading: true, error: null });
    try {
      await apiClient.post(`/medical/administration/${patientId}`, administrationData);
      // Optionnel: Re-fetch ou mise à jour locale de l'état si nécessaire
      set({ isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
}));
