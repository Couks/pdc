import { useState } from "react";
import axios from "axios";
import { API_URL } from "@/hooks/auth/AuthContext";
import { TransactionProps } from "@/lib/transactionProps";
import { useToast } from "@/components/ui/Toast";

interface UseCreateTransactionResult {
  isLoading: boolean;
  error: Error | null;
  createTransaction: (
    newTransactionData: Omit<TransactionProps, "id">
  ) => Promise<void>;
}

export const useCreateTransaction = (): UseCreateTransactionResult => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  useState<TransactionProps | null>(null);

  const createTransaction = async (
    newTransactionData: Omit<TransactionProps, "id">
  ) => {
    setIsLoading(true);
    try {
      const response = await axios.post<TransactionProps>(
        `${API_URL}/movimentacao`,
        newTransactionData
      );
      if (response.data) {
        console.log(response.data);
      }
      toast("Transação criada com sucesso!", "success", 3000);
    } catch (error) {
      setError(error as Error);
      toast("Erro ao criar transação!", "destructive", 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, createTransaction };
};
