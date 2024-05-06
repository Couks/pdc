import { Feather } from "@expo/vector-icons";
import transactionsData from "@/assets/transactionsData.json";

import { ScrollView, SafeAreaView } from "react-native";

import Header from "@/components/Header";
import Transaction, { TransactionProps } from "./transactions/[transaction]";

export default function Notification({ transactions }: TransactionProps) {
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-purple-700">
      <Header title="Notificações" style={{ height: 150 }} />

      <ScrollView className="bg-white dark:bg-purple-800 p-2">
        {transactionsData.map((transaction) => (
          <Transaction
            key={transaction.id}
            id={transaction.id}
            iconName={transaction.iconName}
            category={transaction.category}
            date={transaction.date}
            type={transaction.type}
            price={transaction.price}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
