import { useState } from "react";
import axios, { AxiosError } from "axios";
import { API_URL } from "@/hooks/auth/AuthContext";
import { TransactionProps } from "@/lib/transactionProps";
import { useToast } from "@/components/ui/Toast";

interface UseCreateTransactionResult {
  isLoading: boolean;
  error: string | null;
  createTransaction: (
    newTransactionData: Omit<TransactionProps, "id">
  ) => Promise<void>;
}

export const useCreateTransaction = (): UseCreateTransactionResult => {
  const { toast } = useToast();
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
      if (response.data) {
        console.log(response.data);
      }
      toast("Transação criada!", "success", 2000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Erro do Axios
        const axiosError = error as AxiosError<{ message: string }>;
        const errorMessage =
          axiosError.response?.data.message || "Erro ao criar transação.";
        setError(errorMessage);
        toast(errorMessage, "destructive", 2000);
      } else {
        // Outro tipo de erro
        setError("Erro desconhecido.");
        toast("Erro desconhecido.", "destructive", 2000);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, createTransaction };
};
