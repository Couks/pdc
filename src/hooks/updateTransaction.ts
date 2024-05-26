// hooks/useUpdateTransaction.ts
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { API_URL } from "@/hooks/auth/AuthContext";
import { TransactionProps } from "@/lib/transactionProps";

interface UseUpdateTransactionResult {
  isLoading: boolean;
  error: Error | null;
  updatedTransaction: TransactionProps | null;
  updateTransaction: (transaction: TransactionProps) => Promise<void>;
}

export const useUpdateTransaction = (): UseUpdateTransactionResult => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [updatedTransaction, setUpdatedTransaction] =
    useState<TransactionProps | null>(null);

  const updateTransaction = async (transaction: TransactionProps) => {
    setIsLoading(true);
    try {
      const response = await axios.put<TransactionProps>(
        `${API_URL}/movimentacao/${transaction.id}`,
        transaction
      );
      setUpdatedTransaction(response.data);
      // Aqui você pode usar o toast para notificar o sucesso
    } catch (error) {
      setError(error as Error);
      // Aqui você pode usar o toast para notificar o erro
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, updatedTransaction, updateTransaction };
};
