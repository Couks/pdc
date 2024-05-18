import { TransactionProps } from "@/app/screens/transactions/[id]";
import { API_URL } from "@/hooks/auth/AuthContext";
import axios from "axios";

export async function postTransactionsList({
  entrada_saida,
  conta,
  valor,
  categoria,
}: TransactionProps) {
  const response = await axios.post(`${API_URL}/movimentacao/`, {
    entrada_saida,
    conta,
    valor,
    categoria,
  });
  return response.data;
}
