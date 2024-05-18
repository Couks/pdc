import Header from "@/components/ui/Header";
import Transaction from "./[id]";
import { ScrollView, SafeAreaView, View, Text } from "react-native";
import transactionsData from "@/assets/transactionsData.json";

import Balance from "@/components/Balance";
import { useState } from "react";

export default function TransactionsScreen() {
  const [filteredTransactions, setFilteredTransactions] =
    useState(transactionsData);

  const filterTransactions = (type) => {
    if (type === "entradas") {
      setFilteredTransactions(
        filteredTransactions.filter(
          (transaction) => transaction.entrada_saida === "entrada"
        )
      );
    } else if (type === "saidas") {
      setFilteredTransactions(
        filteredTransactions.filter(
          (transaction) => transaction.entrada_saida === "saida"
        )
      );
    } else {
      setFilteredTransactions(filteredTransactions);
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-green-500 dark:bg-green-700">
      <Header title="Transações">
        <Balance filterTransactions={filterTransactions} />
      </Header>

      <ScrollView className="bg-white dark:bg-purple-800 p-6 rounded-t-[50px]">
        {filteredTransactions.map((transaction) => (
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
