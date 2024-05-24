import { useState } from "react";
import { Transaction } from "./[id]";
import { Balance } from "@/components/Balance";
import { Header } from "@/components/ui/Header";
import { ScrollView, SafeAreaView, View } from "react-native";
import transactionsData from "@/assets/transactionsData.json";

export function TransactionsScreen() {
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
