import { Ionicons } from "@expo/vector-icons";

export const categoryIcons: { [key: string]: keyof typeof Ionicons.glyphMap } =
  {
    GERAL: "add",
    MORADIA: "home",
    ALIMENTACAO: "fast-food",
    TRANSPORTE: "bus",
    SAUDE: "medical",
    EDUCACAO: "school",
    LAZER: "beer",
    DESPESAS_PESSOAIS: "shirt",
    ECONOMIAS: "cash",
  };

export const categoryNames: { [key: string]: string } = {
  GERAL: "Gastos Gerais",
  MORADIA: "Moradia",
  ALIMENTACAO: "Alimentação",
  TRANSPORTE: "Transporte",
  SAUDE: "Saúde",
  EDUCACAO: "Educação",
  LAZER: "Lazer",
  DESPESAS_PESSOAIS: "Despesas pessoais",
  ECONOMIAS: "Economias",
};

export const categoryOptions = [
  { label: "Gastos Gerais", value: "GERAL" },
  { label: "Moradia", value: "MORADIA" },
  { label: "Alimentação ", value: "ALIMENTACAO" },
  { label: "Transporte ", value: "TRANSPORTE" },
  { label: "Saúde ", value: "SAUDE" },
  { label: "Educação ", value: "EDUCACAO" },
  { label: "Lazer ", value: "LAZER" },
  { label: "Despesas pessoais ", value: "DESPESAS_PESSOAIS" },
  { label: "Economias ", value: "ECONOMIAS" },
];

export const typeOptions = [
  { label: "Entrada", value: "entrada" },
  { label: "Saída", value: "saida" },
];
