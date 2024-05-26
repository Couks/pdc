import { API_URL } from "@/hooks/auth/AuthContext";
import { TransactionProps } from "@/lib/transactionProps";
import axios from "axios";
import { useEffect, useState } from "react";

export async function createTransactions() {
  const [userTransactions, setUserTransactions] = useState<
    TransactionProps | undefined
  >(undefined);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.post(`${API_URL}/movimentacao/`);
        console.log(response.data);

        if (response) {
          const data = await response.data;
          setUserTransactions(data);
        } else {
          console.error("Falha ao buscar as transações");
        }
      } catch (error) {
        console.error("Erro ao buscar as transações:", error);
      }
    };

    fetchUserData();
  }, []);

  return userTransactions;
}
