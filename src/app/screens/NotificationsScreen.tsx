import Header from "@/components/Header";
import { ScrollView, SafeAreaView } from "react-native";
import transactionsData from "@/assets/transactionsData.json";
import Transaction from "./transactions/[id]";

export default function NotificationScreen() {
  return (
    <SafeAreaView className="flex-1 bg-green-500 dark:bg-green-700">
      <Header title="Notificações" style={{ height: 150 }} />

      <ScrollView className="bg-white dark:bg-purple-800 p-2 rounded-t-[50px]">
        {transactionsData.map((transaction) => (
          <Transaction
            key={transaction.id}
            id={transaction.id}
            createdAt={transaction.createdAt}
            entrada_saida={transaction.entrada_saida}
            valor={transaction.valor}
            categoria={transaction.categoria}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
