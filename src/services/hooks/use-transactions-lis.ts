import axios from "axios";

export function getTransactionsList() {
  async function loadAll() {
    const response = await axios.get("/movimentacoes");
    return response.data;
  }

  return {
    loadAll,
  };
}
