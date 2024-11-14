import { User } from "./auth.types";
import { Doctor } from "./doctor.types";
import { Exam } from "./exam.types";

export interface Patient extends User {
  role: "patient";
  birthDate: string;
  gender: "male" | "female" | "other";
  doctors: Doctor[];
  exams: Exam[];
  clinicalData: {
    bloodType?: string;
    allergies?: string[];
    chronicConditions?: string[];
    medications?: string[];
  };
  medicalHistory: {
    id: string;
    date: string;
    doctorId: string;
    diagnosis: string;
    prescription: string;
    notes: string;
  }[];
}
