import { useState } from "react";
import axios from "axios";
import { API_URL } from "@/hooks/auth/AuthContext";
import { TransactionProps } from "@/lib/transactionProps";
import { useToast } from "@/components/ui/Toast";

interface UseDeleteTransactionResult {
  isLoading: boolean;
  error: Error | null;
  deleteTransaction: (transaction: TransactionProps) => Promise<void>;
}

export const useDeleteTransaction = (): UseDeleteTransactionResult => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const deleteTransaction = async (transaction: TransactionProps) => {
    setIsLoading(true);
    setError(null);
    try {
      await axios.delete(`${API_URL}/movimentacao/${transaction.id}`);
      toast("Transação deletada com sucesso", "success");
    } catch (error) {
      setError(error as Error);
      toast("Erro ao deletar transação", "destructive");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, deleteTransaction };
};
