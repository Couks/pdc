import { User } from "./auth.types";
import { Patient } from "./patient.types";

export interface Doctor extends User {
  role: "doctor";
  crm: string;
  specialization: string;
  patients: Patient[];
}

export interface DoctorProfile {
  id: string;
  name: string;
  crm: string;
  specialization: string;
  phone: string;
  email: string;
  address: string;
  patientCount: number;
}
