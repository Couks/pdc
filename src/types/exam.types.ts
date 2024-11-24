import { Diagnosis } from "./base.types";

export type ChagasExamType =
  | "IFI"
  | "HEMAGLUTINACAO"
  | "ELISA"
  | "WESTERN_BLOT";
export type ExamPhase = "AGUDA" | "CRONICA" | "AMBAS";

export interface ExamDescription {
  type: ChagasExamType;
  title: string;
  description: string;
  advantages: string[];
  limitations: string[];
  recommendedPhase: ExamPhase;
}

export interface ExamRequest {
  id: string;
  patientId: string;
  doctorId: string;
  examType: ChagasExamType;
  requestDate: string;
  status: "PENDENTE" | "CONCLUIDO" | "EM_ANALISE";
  result?: ExamResult;
}

export interface ExamResult {
  id: string;
  examRequestId: string;
  resultDate: string;
  value: number | string;
  isConclusive: boolean;
  diagnosis: Diagnosis;
  recommendedFollowUp?: ChagasExamType;
  notes?: string;
}

export const EXAM_DESCRIPTIONS: Record<ChagasExamType, ExamDescription> = {
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
