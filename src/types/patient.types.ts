import { BaseUser, Gender, ClinicalData, MedicalHistory } from "./base.types";
import { ExamRequest } from "./exam.types";

export interface Patient extends BaseUser {
  role: "patient";
  birthDate: string;
  gender: Gender;
  doctors: string[];
  clinicalData: ClinicalData;
  medicalHistory: MedicalHistory[];
  exams: ExamRequest[];
}
