import { Text, View } from "react-native";
import { Header } from "@/components/ui/Header";
import { Transactions } from "./transactions/Transactions";
import { RoundedView } from "@/components/ui/RoundedView";
import { useTransactions } from "@/hooks/useTransactions";

export function NotificationScreen() {
  const { transactions, isLoading, refetch } = useTransactions();
  return (
    <View className="flex-1 bg-primary-500 dark:bg-primary-800">
      <Header style={{ height: 150 }} />
      <RoundedView>
        <Transactions
          transactions={transactions}
          isLoading={isLoading}
          onRefresh={refetch}
          ListEmptyComponent={() => (
            <View className="flex-center items-center mt-10">
              <Text className="text-lg text-gray-500 dark:text-gray-200 font-medium">
                Nenhuma transação encontrada
              </Text>
            </View>
          )}
        />
      </RoundedView>
    </View>
  );
}
