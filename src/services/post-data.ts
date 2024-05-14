import axios from "axios";
export const API_URL = "https://actively-settling-rodent.ngrok-free.app/api";

interface TransactionsProps {
  entrada_saida: string;
  conta: string;
  valor: string;
  categoria: string;
}

export async function postTransactionsList({
  entrada_saida,
  conta,
  valor,
  categoria,
}: TransactionsProps) {
  const response = await axios.post(`${API_URL}/movimentacao/`, {
    entrada_saida,
    conta,
    valor,
    categoria,
  });
  return response.data;
}
