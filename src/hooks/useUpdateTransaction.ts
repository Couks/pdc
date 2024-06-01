import { useState } from "react";
import axios from "axios";
import { API_URL } from "@/hooks/auth/AuthContext";
import { TransactionProps } from "@/lib/transactionProps";

import { useToast } from "@/components/ui/Toast";

interface UseUpdateTransactionResult {
  isLoading: boolean;
  error: Error | null;
  updatedTransaction: TransactionProps | null;
  updateTransaction: (transaction: TransactionProps) => Promise<void>;
}

export const useUpdateTransaction = (): UseUpdateTransactionResult => {
  const { toast } = useToast();
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
      toast("Transação atualizada com sucesso!", "success", 2000);
    } catch (error) {
      setError(error as Error);
      toast("Erro ao atualizar transação!", "destructive", 2000);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, updatedTransaction, updateTransaction };
};
