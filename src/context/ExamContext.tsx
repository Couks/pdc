import { createContext, useContext, ReactNode, useState } from "react";

interface ExamContextType {
  // Estados
  exams: [];
  isLoading: boolean;
  analysis: {
    diagnosis: string;
    confidence: number;
    recommendations?: string;
    examDate: Date;
    status: "pending" | "completed" | "error";
  } | null;

  // Funções de gerenciamento
  addExam: (exam: any) => Promise<void>;
  updateExam: (examId: string, updates: any) => Promise<void>;
  deleteExam: (examId: string) => Promise<void>;

  // Funções de análise
  analyzeResults: (patientId: string) => Promise<void>;
  getPatientExams: (patientId: string) => any[];

  // Funções de filtro e busca
  filterExamsByType: (type: any) => any[];
  filterExamsByDate: (startDate: Date, endDate: Date) => any[];

  // Estatísticas
  getPatientHistory: (patientId: string) => {
    examCount: number;
    lastExam: Date;
    positiveResults: number;
    negativeResults: number;
  };
}

const ExamContext = createContext<ExamContextType | undefined>(undefined);

export function ExamProvider({ children }: { children: ReactNode }) {
  const [exams, setExams] = useState<any[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentAnalysis, setCurrentAnalysis] = useState<any | null>(null);

  const getPatientExams = (patientId: string) => {
    return exams.filter((exam) => exam.patientId === patientId);
  };

  // Exemplo de implementação da análise com IA
  const analyzeResults = async (patientId: string) => {
    setIsAnalyzing(true);
    try {
      const patientExams = getPatientExams(patientId);

      // // Aqui você faria a chamada para sua API de IA
      // const aiAnalysis = await fetchAIDiagnosis({
      //   elisa: patientExams.find((e) => e.type === "ELISA")?.result,
      //   ifi: patientExams.find((e) => e.type === "IFI")?.result,
      //   hemaglutinacao: patientExams.find((e) => e.type === "HEMAGLUTINACAO")
      //     ?.result,
      //   westernBlot: patientExams.find((e) => e.type === "WESTERN_BLOT")
      //     ?.result,
      // });

      // setCurrentAnalysis(aiAnalysis);
    } catch (error) {
      console.error("Erro na análise:", error);
      // Implementar tratamento de erro
    } finally {
      setIsAnalyzing(false);
    }
  };

  const value = {
    exams,
    isAnalyzing,
    isLoading,
    currentAnalysis,
    analyzeResults,
  };

  return <ExamContext.Provider value={value}>{children}</ExamContext.Provider>;
}

export function useExam() {
  const context = useContext(ExamContext);
  if (context === undefined) {
    throw new Error("useExam must be used within an ExamProvider");
  }
  return context;
}
