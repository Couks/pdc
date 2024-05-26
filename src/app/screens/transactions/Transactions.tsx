import { FlatList, Text } from "react-native";
import { View } from "react-native";
import { Transaction } from "./Transaction";
import { useTransactions } from "@/hooks/useTransactions";
import { Loading } from "@/components/ui/Loading";

export function Transactions() {
  const { isLoading, error, transactions } = useTransactions();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <View className="flex-center items-center mt-10">
        <Text className="text-lg text-red-500">
          Algo deu errado, tente novamente
        </Text>
      </View>
    );
  }

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
      ListEmptyComponent={() => (
        <View className="flex-center items-center mt-10">
          <Text className="text-lg text-gray-500 dark:text-gray-200 font-medium">
            Nenhuma transação encontrada
          </Text>
        </View>
      )}
    />
  );
}
