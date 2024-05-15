import axios from "axios";
import { API_URL } from "../../baseUrl";

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
