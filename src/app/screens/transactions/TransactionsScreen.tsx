import { Text, View } from "react-native";
import { Header } from "@/components/ui/Header";
import { Balance } from "@/components/Balance";
import { Transactions } from "./Transactions";
import { RoundedView } from "@/components/ui/RoundedView";
import { FabGroup } from "@/components/ui/FabGroup";
import { PaperProvider } from "react-native-paper";
import { useTransactions } from "@/hooks/useTransactions";
import { TransactionProps } from "@/lib/transactionProps";
import { useState } from "react";

export function TransactionsScreen() {
  const { transactions, isLoading, refetch } = useTransactions();
  const [filteredTransactions, setFilteredTransactions] = useState<
    TransactionProps[]
  >(transactions || []);

  const handleFilterChange = (filteredTransactions: TransactionProps[]) => {
    setFilteredTransactions(filteredTransactions);
  };

  return (
    <PaperProvider>
      <View className="flex-1 bg-green-500 dark:bg-green-700">
        <Header title="Transações" style={{ height: 250 }}>
          <Balance onFilterChange={handleFilterChange} />
        </Header>

        <RoundedView>
          <Transactions
            transactions={filteredTransactions}
            isLoading={isLoading}
            onRefresh={refetch}
            ListEmptyComponent={() => (
              <View className="flex-center items-center mt-10">
                <Text className="text-lg text-gray-500 dark:text-gray-200 font-medium">
                  Nenhuma transação encontrada.
                </Text>
              </View>
            )}
          />
        </RoundedView>
        <FabGroup />
      </View>
    </PaperProvider>
  );
}
