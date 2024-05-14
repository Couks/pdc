import Header from "@/components/Header";
import Transaction from "./[id]";
import { ScrollView, SafeAreaView, View } from "react-native";
import transactionsData from "@/assets/transactionsData.json";

export default function TransactionsScreen({
  navigation,
}: {
  navigation: any;
}) {
  return (
    <SafeAreaView className="flex-1 bg-green-500 dark:bg-green-700 ">
      <Header title="Transações" />

      <ScrollView className="bg-white dark:bg-purple-800 p-2 rounded-t-[50px]">
        {transactionsData.map((transaction) => (
          <View key={transaction.id}>
            <Transaction
              id={transaction.id}
              createdAt={transaction.createdAt}
              entrada_saida={transaction.entrada_saida}
              valor={transaction.valor}
              categoria={transaction.categoria}
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
