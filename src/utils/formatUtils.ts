// src/utils/formatUtils.ts
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { categoryNames } from "./categoryIcons";

export const formatDate = (dateString: string): string => {
  const dateObject = dateString && parseISO(dateString);
  return dateObject ? format(dateObject, "PP", { locale: ptBR }) : "";
};

export const formatTime = (dateString: string): string => {
  const dateObject = dateString && parseISO(dateString);
  return dateObject ? format(dateObject, "HH:mm") : "";
};

export const formatPrice = (entrada_saida: string, valor: number): string => {
  return `${entrada_saida === "saida" ? "-" : "+"} R$${Math.abs(valor).toFixed(
    2
  )}`;
};

export const getFormattedCategoryName = (category: string) => {
  return categoryNames[category] || category;
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};
