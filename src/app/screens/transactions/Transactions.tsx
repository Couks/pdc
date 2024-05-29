import React from "react";
import { Transaction } from "./Transaction";
import { FlatList } from "react-native";
import { TransactionProps } from "@/lib/transactionProps";

interface TransactionsProps {
  transactions?: TransactionProps[] | undefined | null;
  isLoading?: boolean;
  onRefresh?: () => void;
  ListEmptyComponent?: React.ComponentType;
}
export function Transactions({
  transactions,
  isLoading,
  onRefresh,
  ListEmptyComponent,
}: TransactionsProps) {
  return (
    <FlatList
      data={transactions}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <Transaction
          key={item.id}
          id={item.id}
          createdAt={item.createdAt}
          entrada_saida={item.entrada_saida}
          valor={item.valor}
          categoria={item.categoria}
        />
      )}
      className="bg-white dark:bg-purple-800 w-full"
      showsVerticalScrollIndicator={false}
      refreshing={isLoading}
      onRefresh={onRefresh}
      ListEmptyComponent={ListEmptyComponent}
    />
  );
}
