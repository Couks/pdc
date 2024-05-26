import { useEffect, useState } from "react";
import { Header } from "@/components/ui/Header";
import { Transaction } from "./transactions/Transaction";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Text, TouchableOpacity, View, FlatList } from "react-native";
import { format, isToday, isSameWeek, isSameMonth, isSameYear } from "date-fns";
import { useTransactions } from "@/hooks/useTransactions";
import { Transactions } from "./transactions/Transactions";
import { RoundedView } from "@/components/ui/RoundedView";

export function DashboardScreen() {
  const { isLoading, error, transactions } = useTransactions();

  const [filteredTransactions, setFilteredTransactions] =
    useState(transactions);
  const [selectedFilter, setSelectedFilter] = useState<
    "day" | "week" | "month" | "year"
  >();

  const filterTransactions = (
    transactions: TransactionProps[],
    period: "day" | "week" | "month" | "year"
  ) => {
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
    setFilteredTransactions(filterTransactions(transactions, period));
  };

  return (
    <View className="flex-1 bg-green-500 dark:bg-green-700">
      <Header style={{ height: 150 }}>
        <DashboardHeader />
      </Header>

      <RoundedView>
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

        <Transactions />
      </RoundedView>
    </View>
  );
}
