import axios from "axios";
import { API_URL } from "../../baseUrl";

export async function getTransactionsList() {
  try {
    const response = await axios.get(`${API_URL}/movimentacao`);
    return response.data;
  } catch (e) {
    return console.error(e);
  }
}

export async function getUsersInfo() {
  const response = await axios.get(`${API_URL}/users/eu`);
  return response.data;
}
