import axios from "axios";
export const API_URL = "https://actively-settling-rodent.ngrok-free.app/api";

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
