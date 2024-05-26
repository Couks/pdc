import { useEffect, useState } from "react";

import { Header } from "@/components/ui/Header";
import { View } from "react-native";
import { TransactionProps } from "@/lib/transactionProps";

import { Balance } from "@/components/Balance";
import { useTransactions } from "@/hooks/useTransactions";
import { Transactions } from "./Transactions";
import { RoundedView } from "@/components/ui/RoundedView";

export function TransactionsScreen() {
  const { transactions, isLoading, error } = useTransactions();

  const [filteredTransactions, setFilteredTransactions] = useState<
    TransactionProps[]
  >([]);

  useEffect(() => {
    // Inicializa as transações filtradas com todas as transações
    setFilteredTransactions(transactions);
  }, [transactions]);

  const filterTransactions = (
    type: "entradas" | "saidas" | "balanco total"
  ) => {
    // Implemente a lógica de filtragem aqui
    // ...
    setFilteredTransactions(/* transações filtradas */);
  };

  return (
    <View className="flex-1 bg-green-500 dark:bg-green-700">
      <Header title="Transações">
        <Balance
          transactions={filteredTransactions}
          filterTransactions={filterTransactions}
          isLoading={isLoading}
          error={error}
        />
      </Header>
      <RoundedView>
        <Transactions
          transactions={filteredTransactions}
          isLoading={isLoading}
        />
      </RoundedView>
    </View>
  );
}
