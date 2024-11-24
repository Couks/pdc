import { BaseUser } from "./base.types";

export interface Doctor extends BaseUser {
  role: "doctor";
  crm: string;
  specialization: string;
  patients: string[];
}

export interface DoctorProfile extends Omit<Doctor, "password"> {
  patientCount: number;
}
