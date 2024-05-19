import { API_URL } from "@/hooks/auth/AuthContext";
import axios from "axios";
import { useEffect, useState } from "react";

interface TransactionProps {
  id: string;
  createdAt: string;
  updatedAt?: string;
  entrada_saida?: string;
  conta?: string;
  valor: number;
  categoria: string;
  userid?: number;
}

export async function useTransactions() {
  const [userTransactions, setUserTransactions] = useState<
    TransactionProps | undefined
  >(undefined);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API_URL}/movimentacao/`);
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
  }, [userTransactions]);

  return userTransactions;
}
