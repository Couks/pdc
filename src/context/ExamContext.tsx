import { createContext, useContext, ReactNode, useState } from "react";
import { patientService } from "@/services/api";

interface Exam {
  id: string;
  patientId: string;
  doctorId: string;
  examType: string;
  requestDate: string;
  status: "PENDING" | "COMPLETED";
  result?: {
    id: string;
    examRequestId: string;
    resultDate: string;
    value: string;
    isConclusive: boolean;
    diagnosis: "POSITIVE" | "NEGATIVE";
    notes: string;
  };
}

interface ExamContextType {
  exams: Exam[];
  isLoading: boolean;
  error: string | null;
  fetchPatientExams: (patientId: string) => Promise<void>;
}

const ExamContext = createContext<ExamContextType | undefined>(undefined);

export function ExamProvider({ children }: { children: ReactNode }) {
  const [exams, setExams] = useState<Exam[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPatientExams = async (patientId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const examData = await patientService.getExams(patientId);
      setExams(examData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao buscar exames");
      console.error("Erro ao buscar exames:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    exams,
    isLoading,
    error,
    fetchPatientExams,
  };

  return <ExamContext.Provider value={value}>{children}</ExamContext.Provider>;
}

export function useExam() {
  const context = useContext(ExamContext);
  if (context === undefined) {
    throw new Error("useExam deve ser usado dentro de um ExamProvider");
  }
  return context;
}
