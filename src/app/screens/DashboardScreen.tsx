import { format, isToday, isSameWeek, isSameMonth, isSameYear } from "date-fns";
import { useState } from "react";
import Header from "@/components/Header";
import Transaction from "./transactions/[id]";
import transactionsData from "@/assets/transactionsData.json";
import { Text, TouchableOpacity, View, ScrollView } from "react-native";
import DashboardHeader from "@/components/dinamic-components/DashboardHeader";

export default function DashboardScreen({ navigation }: any) {
  const [filteredTransactions, setFilteredTransactions] =
    useState(transactionsData);
  const [selectedFilter, setSelectedFilter] = useState<
    "day" | "week" | "month" | "year"
  >("day");

  const filterTransactions = (transactions: Transaction[], period: string) => {
    const today = new Date();

    return transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.createdAt);

      switch (period) {
        case "day":
          return isToday(transactionDate);
        case "week":
          return isSameWeek(transactionDate, today);
        case "month":
          return isSameMonth(transactionDate, today);
        case "year":
          return isSameYear(transactionDate, today);
        default:
          return transactions;
      }
    });
  };

  const handleFilterChange = (period: "day" | "week" | "month" | "year") => {
    setSelectedFilter(period);
    setFilteredTransactions(filterTransactions(transactionsData, period));
  };

  return (
    <View className="flex-1 bg-green-500 dark:bg-green-700">
      <Header style={{ height: 230 }}>
        <DashboardHeader />
      </Header>

      <View className="flex-1 bg-white dark:bg-purple-800 items-center p-6 gap-4 rounded-t-[50px]">
        <View className="flex-row p-2 bg-green-200 dark:bg-purple-600 w-full rounded-2xl justify-around">
          <TouchableOpacity onPress={() => handleFilterChange("day")}>
            <View
              className={`py-2 px-4 rounded-2xl ${
                selectedFilter === "day"
                  ? "bg-green-500"
                  : "bg-green-200 dark:bg-purple-600"
              }`}
            >
              <Text className="text-purple-800 dark:text-white font-bold text-lg">
                Dia
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleFilterChange("week")}>
            <View
              className={`py-2 px-4 rounded-2xl ${
                selectedFilter === "week"
                  ? "bg-green-500"
                  : "bg-green-200 dark:bg-purple-600"
              }`}
            >
              <Text className="text-purple-800 dark:text-white font-bold text-lg">
                Semana
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleFilterChange("month")}>
            <View
              className={`py-2 px-4 rounded-2xl ${
                selectedFilter === "month"
                  ? "bg-green-500"
                  : "bg-green-200 dark:bg-purple-600"
              }`}
            >
              <Text className="text-purple-800 dark:text-white font-bold text-lg">
                Mês
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleFilterChange("year")}>
            <View
              className={`py-2 px-4 rounded-2xl ${
                selectedFilter === "year"
                  ? "bg-green-500"
                  : "bg-green-200 dark:bg-purple-600"
              }`}
            >
              <Text className="text-purple-800 dark:text-white font-bold text-lg">
                Ano
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <ScrollView className="bg-white dark:bg-purple-800 w-full">
          {filteredTransactions.length ? (
            filteredTransactions.map((transaction) => (
              <Transaction
                key={transaction.id}
                id={transaction.id}
                createdAt={transaction.createdAt}
                entrada_saida={transaction.entrada_saida}
                valor={transaction.valor}
                categoria={transaction.categoria}
              />
            ))
          ) : (
            <View className="flex-center items-center mt-10">
              <Text className="text-lg text-gray-500 dark:text-gray-200 font-medium">
                Nenhuma transação encontrada para o filtro selecionado.
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}
