import axios from "axios";
export const API_URL = "https://actively-settling-rodent.ngrok-free.app/api";

export async function getTransactionsList() {
  const response = await axios.get(`${API_URL}/movimentacao/eu`);
  return response.data;
}
// console.log(getTransactionsList);

export async function getUsersInfo() {
  const response = await axios.get(`${API_URL}/users/eu`);
  return response.data;
}

// console.log(getUsersInfo());
