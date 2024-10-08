// src/utils/formatUtils.ts
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";

export const formatDate = (dateString: string): string => {
  const dateObject = dateString && parseISO(dateString);
  return dateObject ? format(dateObject, "PP", { locale: ptBR }) : "";
};

export const formatTime = (dateString: string): string => {
  const dateObject = dateString && parseISO(dateString);
  return dateObject ? format(dateObject, "HH:mm") : "";
};

export const formatPrice = (entrada_saida: string, valor: number): string => {
  return `${entrada_saida === "gastei" ? "-" : "+"} R$${Math.abs(valor).toFixed(
    2
  )}`;
};
