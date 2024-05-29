import { useEffect, useState } from "react";
import { Header } from "@/components/ui/Header";
import { useTransactions } from "@/hooks/useTransactions";
import { RoundedView } from "@/components/ui/RoundedView";
import { TransactionProps } from "@/lib/transactionProps";
import { Transactions } from "./transactions/Transactions";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Text, TouchableWithoutFeedback, View } from "react-native";
import { format, isToday, isSameWeek, isSameMonth } from "date-fns";

export function DashboardScreen() {
  const { transactions, isLoading, refetch } = useTransactions();
  const [filteredTransactions, setFilteredTransactions] = useState<
    TransactionProps[]
  >([]);
  const [selectedFilter, setSelectedFilter] = useState<
    "day" | "week" | "month"
  >("day");

  useEffect(() => {
    filterTransactions(selectedFilter);
  }, [selectedFilter, transactions]);

  const filterTransactions = (period: "day" | "week" | "month") => {
    const today = new Date();

    const filtered = transactions?.filter((transaction) => {
      const transactionDate = transaction?.createdAt
        ? new Date(transaction.createdAt)
        : null;

      if (!transactionDate) {
        return false;
      }

      switch (period) {
        case "day":
          return isToday(transactionDate);
        case "week":
          return isSameWeek(transactionDate, today);
        case "month":
          return isSameMonth(transactionDate, today);

        default:
          return false;
      }
    });

    setFilteredTransactions(filtered);
  };

  const handleFilterChange = (period: "day" | "week" | "month") => {
    setSelectedFilter(period);
  };

  return (
    <View className="flex-1 bg-green-500 dark:bg-green-700">
      <Header style={{ height: 100 }}>
        <DashboardHeader navigation={undefined} />
      </Header>

      <RoundedView>
        <View className="flex-row p-4 bg-green-200 dark:bg-purple-600 w-full rounded-2xl justify-around">
          <TouchableWithoutFeedback onPress={() => handleFilterChange("day")}>
            <View
              className={`py-2 px-8 rounded-2xl ${
                selectedFilter === "day"
                  ? "bg-green-500 "
                  : "bg-green-200 dark:bg-purple-600"
              }`}
            >
              <Text
                className={`font-bold text-xl ${
                  selectedFilter === "day"
                    ? "text-purple-800"
                    : "text-purple-800 dark:text-white"
                }`}
              >
                Dia
              </Text>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={() => handleFilterChange("week")}>
            <View
              className={`py-2 px-8 rounded-2xl ${
                selectedFilter === "week"
                  ? "bg-green-500"
                  : "bg-green-200 dark:bg-purple-600"
              }`}
            >
              <Text
                className={`font-bold text-xl ${
                  selectedFilter === "week"
                    ? "text-purple-800"
                    : "text-purple-800 dark:text-white"
                }`}
              >
                Semana
              </Text>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={() => handleFilterChange("month")}>
            <View
              className={`py-2 px-8 rounded-2xl ${
                selectedFilter === "month"
                  ? "bg-green-500"
                  : "bg-green-200 dark:bg-purple-600"
              }`}
            >
              <Text
                className={`font-bold text-xl ${
                  selectedFilter === "month"
                    ? "text-purple-800"
                    : "text-purple-800 dark:text-white"
                }`}
              >
                Mês
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>

        <Transactions
          transactions={filteredTransactions}
          isLoading={isLoading}
          onRefresh={refetch}
          ListEmptyComponent={() => (
            <View className="flex-center items-center mt-10">
              <Text className="text-xl text-gray-500 dark:text-gray-200 font-medium">
                Nenhuma transação encontrada.
              </Text>
            </View>
          )}
        />
      </RoundedView>
    </View>
  );
}
