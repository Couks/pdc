export type UserRole = "doctor" | "patient";
export type Gender = "MASCULINO" | "FEMININO";
export type ExamStatus = "PENDENTE" | "CONCLUIDO" | "EM_ANALISE";
export type Diagnosis = "POSITIVO" | "NEGATIVO" | "INCONCLUSIVO";

export interface BaseUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  phone: string;
  address: string;
}

export interface ClinicalData {
  bloodType: string;
  allergies: string[];
  chronicConditions: string[];
  medications: string[];
}

export interface MedicalHistory {
  id: string;
  date: string;
  doctorId: string;
  diagnosis: string;
  prescription: string;
  notes: string;
}
