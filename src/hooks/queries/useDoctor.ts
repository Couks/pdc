import { useQuery } from "@tanstack/react-query";
import { doctorService } from "@/services/api";

export function useDoctorQueries(doctorId?: string) {
  const patients = useQuery({
    queryKey: ["doctor-patients", doctorId],
    queryFn: () => doctorService.getPatients(doctorId || ""),
    enabled: !!doctorId,
  });

  const profile = useQuery({
    queryKey: ["doctor-profile", doctorId],
    queryFn: () => doctorService.getProfile(doctorId || ""),
    enabled: !!doctorId,
  });

  const patientDetails = (patientId?: string) =>
    useQuery({
      queryKey: ["patient-details", patientId],
      queryFn: () => doctorService.getPatientDetails(patientId || ""),
      enabled: !!patientId,
    });

  const patientExams = (patientId?: string) =>
    useQuery({
      queryKey: ["patient-exams", patientId],
      queryFn: () => doctorService.getPatientExams(patientId || ""),
      enabled: !!patientId,
    });

  return {
    patients,
    profile,
    patientDetails,
    patientExams,
  };
}
