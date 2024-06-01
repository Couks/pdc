import { useEffect, useState } from "react";
import { Text, View, TouchableWithoutFeedback } from "react-native";
import { Transactions } from "./Transactions";
import { Balance } from "@/components/Balance";
import { Header } from "@/components/ui/Header";
import { RoundedView } from "@/components/ui/RoundedView";
import { useTransactions } from "@/hooks/useTransactions";
import { TransactionProps } from "@/lib/transactionProps";
import { isSameMonth, isSameWeek, isToday } from "date-fns";
import Animated, { FadeInUp } from "react-native-reanimated";

export function TransactionsScreen() {
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
    <View className="flex-1 bg-primary-500 dark:bg-primary-800">
      <Header style={{ height: 180 }}>
        <Balance onFilterChange={handleFilterChange} />
      </Header>

      <RoundedView>
        <Animated.View
          entering={FadeInUp.delay(800).duration(800).springify()}
          className="flex-row p-2 bg-primary-200 dark:bg-secondary-600 w-full rounded-full justify-around shadow"
        >
          {["day", "week", "month"].map((period) => (
            <TouchableWithoutFeedback
              key={period}
              onPress={() => handleFilterChange(period)}
            >
              <View
                className={`py-2 px-8 rounded-3xl ${
                  selectedFilter === period
                    ? "bg-primary-500"
                    : "bg-primary-200 dark:bg-secondary-600"
                }`}
              >
                <Text
                  className={`font-bold text-xl ${
                    selectedFilter === period
                      ? "text-secondary-800"
                      : "text-secondary-800 dark:text-white"
                  }`}
                >
                  {period === "day"
                    ? "Dia"
                    : period === "week"
                    ? "Semana"
                    : "Mês"}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </Animated.View>

        <Transactions
          transactions={filteredTransactions}
          isLoading={isLoading}
          onRefresh={refetch}
          ListEmptyComponent={() => (
            <View className="flex-center items-center mt-10">
              <Text className="text-lg text-gray-500 dark:text-gray-200 font-medium">
                Nenhuma transação encontrada.
              </Text>
            </View>
          )}
        />
      </RoundedView>
    </View>
  );
}
