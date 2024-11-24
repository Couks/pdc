import { useQuery } from "@tanstack/react-query";
import { patientService } from "@/services/api";

export function usePatientQueries(patientId?: string) {
  const exams = useQuery({
    queryKey: ["patient-exams", patientId],
    queryFn: () => patientService.getExams(patientId || ""),
    enabled: !!patientId,
  });

  const medicalHistory = useQuery({
    queryKey: ["medical-history", patientId],
    queryFn: () => patientService.getMedicalHistory(patientId || ""),
    enabled: !!patientId,
  });

  const clinicalData = useQuery({
    queryKey: ["clinical-data", patientId],
    queryFn: () => patientService.getClinicalData(patientId || ""),
    enabled: !!patientId,
  });

  const profile = useQuery({
    queryKey: ["patient-profile", patientId],
    queryFn: () => patientService.getProfile(patientId || ""),
    enabled: !!patientId,
  });

  return {
    exams,
    medicalHistory,
    clinicalData,
    profile,
  };
}
