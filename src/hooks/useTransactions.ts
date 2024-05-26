import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "@/hooks/auth/AuthContext";
import { TransactionProps } from "@/lib/transactionProps";

interface UseTransactionsResult {
  isLoading: boolean;
  error: Error | null;
  transactions: TransactionProps[] | null;
}

export const useTransactions = (): UseTransactionsResult => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [transactions, setTransactions] = useState<TransactionProps[] | null>(
    null
  );

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<TransactionProps[]>(
          `${API_URL}/movimentacao`
        );
        setTransactions(response.data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return { isLoading, error, transactions };
};
