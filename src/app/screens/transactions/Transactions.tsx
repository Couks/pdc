import React from "react";
import { Transaction } from "./Transaction";
import { FlatList, View } from "react-native";
import { TransactionProps } from "@/lib/transactionProps";
import { Skeleton } from "@/components/ui/Skeleton";
import Separator from "@/components/ui/Separator";

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
    <>
      <FlatList
        data={transactions?.reverse() || []}
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
        className="bg-white dark:bg-secondary-800 w-full"
        showsVerticalScrollIndicator={false}
        refreshing={isLoading}
        onRefresh={onRefresh}
        ListEmptyComponent={ListEmptyComponent}
      />
    </>
  );
}
