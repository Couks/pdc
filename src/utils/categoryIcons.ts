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
