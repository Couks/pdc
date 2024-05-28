import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { API_URL } from "@/hooks/auth/AuthContext";
import { TransactionProps } from "@/lib/transactionProps";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface UseTransactionsResult {
  isLoading: boolean;
  error: Error | null;
  transactions: TransactionProps[] | null;
  refetch: () => void;
}

export const useTransactions = (): UseTransactionsResult => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [transactions, setTransactions] = useState<TransactionProps[] | null>(
    null
  );

  const fetchTransactions = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get<TransactionProps[]>(
        `${API_URL}/movimentacao`
      );
      setTransactions(response.data);
      await AsyncStorage.setItem("transactions", JSON.stringify(response.data));
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const refetch = useCallback(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return { isLoading, error, transactions, refetch };
};
