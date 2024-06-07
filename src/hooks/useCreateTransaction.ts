import { useState } from "react";
import axios, { AxiosError } from "axios";
import { API_URL } from "@/hooks/auth/AuthContext";
import { TransactionProps } from "@/lib/transactionProps";

interface UseCreateTransactionResult {
  isLoading: boolean;
  error: string | null;
  createTransaction: (
    newTransactionData: Omit<TransactionProps, "id">
  ) => Promise<void>;
}

export const useCreateTransaction = (): UseCreateTransactionResult => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createTransaction = async (
    newTransactionData: Omit<TransactionProps, "id">
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post<TransactionProps>(
        `${API_URL}/movimentacao`,
        newTransactionData
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ message: string }>;
        const errorMessage =
          axiosError.response?.data.message || "Erro ao criar transação.";
        setError(errorMessage);
      } else {
        setError("Erro desconhecido.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, createTransaction };
};
