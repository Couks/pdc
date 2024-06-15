import React, { Suspense } from "react";
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
      {isLoading ? (
        <View className="h-full w-full gap-3 pt-8 pb-24 overflow-hidden">
          <View className="flex-row gap-4 w-full">
            <Skeleton className="size-20 rounded-full" />
            <View className="flex-1 gap-4 justify-center">
              <Skeleton className="w-auto h-6" />
              <Skeleton className="w-auto h-6" />
            </View>
          </View>
          <Separator />
          <View className="flex-row gap-4 w-full">
            <Skeleton className="size-20 rounded-full" />
            <View className="flex-1 gap-4 justify-center">
              <Skeleton className="w-auto h-6" />
              <Skeleton className="w-auto h-6" />
            </View>
          </View>
          <Separator />
          <View className="flex-row gap-4 w-full">
            <Skeleton className="size-20 rounded-full" />
            <View className="flex-1 gap-4 justify-center">
              <Skeleton className="w-auto h-6" />
              <Skeleton className="w-auto h-6" />
            </View>
          </View>
          <Separator />
          <View className="flex-row gap-4 w-full">
            <Skeleton className="size-20 rounded-full" />
            <View className="flex-1 gap-4 justify-center">
              <Skeleton className="w-auto h-6" />
              <Skeleton className="w-auto h-6" />
            </View>
          </View>
          <Separator />
          <View className="flex-row gap-4 w-full">
            <Skeleton className="size-20 rounded-full" />
            <View className="flex-1 gap-4 justify-center">
              <Skeleton className="w-auto h-6" />
              <Skeleton className="w-auto h-6" />
            </View>
          </View>
          <Separator />
        </View>
      ) : (
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
      )}
    </>
  );
}
