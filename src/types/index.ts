// Tipos Base
export type UserRole = "doctor" | "patient";
export type Gender = "MASCULINO" | "FEMININO";
export type ExamStatus = "PENDENTE" | "CONCLUIDO" | "EM_ANALISE";
export type Diagnosis = "POSITIVO" | "NEGATIVO" | "INCONCLUSIVO";
export type ChagasExamType =
  | "IFI"
  | "HEMAGLUTINACAO"
  | "ELISA"
  | "WESTERN_BLOT";

// Interfaces Base
export interface BaseUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  phone: string;
  address: string;
}

// Autenticação
export interface AuthToken {
  id: string;
  token: string;
  role: UserRole;
}

export interface LoginCredentials {
  email: string;
  password: string;
  role: UserRole;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
  confirmPassword: string;
}

export interface AuthResponse {
  user: Omit<BaseUser, "password">;
  token: string;
}

// Sintomas e Dados Clínicos
export interface Symptoms {
  fever: boolean;
  malaise: boolean;
  swellingAtBiteLocation: boolean;
  swollenEyes: boolean;
  fatigue: boolean;
  nauseaAndVomiting: boolean;
  diarrhea: boolean;
  lymphNodeInflammation: boolean;
  bodyNodes: boolean;
  bodyRedness: boolean;
  enlargedLiverAndSpleen: boolean;
}

export interface ClinicalData {
  bloodType: string;
  allergies: string[];
  chronicConditions: string[];
  medications: string[];
  symptoms: Symptoms;
  description: string;
}

export interface MedicalHistory {
  id: string;
  date: string;
  diagnosis: string;
  prescription: string;
  notes: string;
}

// Exames
export interface ExamResult {
  id: string;
  examRequestId: string;
  resultDate: string;
  value: string;
  isConclusive: boolean;
  diagnosis: Diagnosis;
  notes?: string;
}

export interface ExamRequest {
  id: string;
  requestDate: string;
  status: ExamStatus;
  examType: ChagasExamType;
  result?: ExamResult;
}

export interface ComplementaryExam {
  id: string;
  type: string;
  date: string;
  result: string;
  notes?: string;
}

// Usuários
export interface Doctor extends BaseUser {
  role: "doctor";
  crm: string;
  specialization: string;
  patients: string[];
}

export interface Patient extends BaseUser {
  role: "patient";
  birthDate: string;
  gender: Gender;
  doctors: string[];
  clinicalData: ClinicalData;
  examRequests: ExamRequest[];
  medicalHistory: MedicalHistory[];
  exams: ComplementaryExam[];
}

// Tipos Utilitários
export interface ExamWithPatient extends ExamRequest {
  patient: {
    name: string;
    id: string;
  };
}

export interface PatientSummary {
  id: string;
  name: string;
  email: string;
  clinicalData: Pick<ClinicalData, "bloodType" | "symptoms">;
  lastExamDate?: string;
}

export interface DoctorProfile extends Omit<Doctor, "password"> {
  patientCount: number;
}

// Estrutura do Banco de Dados
export interface DatabaseStructure {
  auth: {
    tokens: AuthToken[];
  };
  doctors: Doctor[];
  patients: Patient[];
}

// Resposta da API
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

// Constantes
export const EXAM_DESCRIPTIONS: Record<
  ChagasExamType,
  {
    type: ChagasExamType;
    title: string;
    description: string;
    advantages: string[];
    limitations: string[];
    recommendedPhase: "AGUDA" | "CRONICA" | "AMBAS";
  }
> = {
  IFI: {
    type: "IFI",
    title: "Imunofluorescência Indireta (IFI)",
    description:
      "Método que detecta anticorpos IgM, especialmente útil na fase aguda da infecção.",
    advantages: [
      "Alta sensibilidade para detecção precoce",
      "Útil na fase aguda da doença",
      "Permite diferenciação entre IgG e IgM",
    ],
    limitations: [
      "Pode apresentar reatividade cruzada",
      "Requer equipamentos especializados",
      "Interpretação subjetiva",
    ],
    recommendedPhase: "AGUDA",
  },
  HEMAGLUTINACAO: {
    type: "HEMAGLUTINACAO",
    title: "Hemaglutinação Indireta",
    description:
      "Teste simples e acessível baseado na aglutinação de hemácias sensibilizadas.",
    advantages: [
      "Método simples e rápido",
      "Baixo custo",
      "Não requer equipamentos sofisticados",
    ],
    limitations: [
      "Menor reprodutibilidade",
      "Possibilidade de falso-positivos",
      "Requer reagentes adicionais",
    ],
    recommendedPhase: "AMBAS",
  },
  ELISA: {
    type: "ELISA",
    title: "Ensaio Imunoenzimático (ELISA)",
    description:
      "Método automatizado que permite processar múltiplas amostras com alta precisão.",
    advantages: [
      "Alta sensibilidade",
      "Processamento de múltiplas amostras",
      "Resultados quantitativos",
      "Boa reprodutibilidade",
    ],
    limitations: [
      "Variação conforme antígeno utilizado",
      "Custo moderado",
      "Requer equipamento específico",
    ],
    recommendedPhase: "AMBAS",
  },
  WESTERN_BLOT: {
    type: "WESTERN_BLOT",
    title: "Western Blot",
    description:
      "Método altamente específico usado principalmente para confirmação diagnóstica.",
    advantages: [
      "Alta especificidade",
      "Excelente para confirmação",
      "Identificação precisa de proteínas específicas",
    ],
    limitations: [
      "Custo elevado",
      "Processo laborioso",
      "Tempo de execução maior",
    ],
    recommendedPhase: "CRONICA",
  },
};
