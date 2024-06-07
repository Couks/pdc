import { useEffect, useState } from "react";
import { Transactions } from "./Transactions";
import { Balance } from "@/components/Balance";
import { Header } from "@/components/ui/Header";
import { RoundedView } from "@/components/ui/RoundedView";
import { useTransactions } from "@/hooks/useTransactions";
import { TransactionProps } from "@/lib/transactionProps";
import { isSameMonth, isSameWeek, isToday } from "date-fns";
import Animated, { FadeInUp } from "react-native-reanimated";
import { Text, View, TouchableWithoutFeedback } from "react-native";
import { Skeleton } from "@/components/ui/Skeleton";

export function TransactionsScreen() {
  const { transactions, isLoading, refetch } = useTransactions();
  const [filteredTransactions, setFilteredTransactions] = useState<
    TransactionProps[]
  >([]);
  const [selectedFilter, setSelectedFilter] = useState<
    "day" | "week" | "month"
  >("day");
  const [selectedType, setSelectedType] = useState<
    "entradas" | "saidas" | "default"
  >("default");

  useEffect(() => {
    filterTransactions(selectedFilter, selectedType);
  }, [selectedFilter, selectedType, transactions]);

  const filterTransactions = (
    period: "day" | "week" | "month",
    type: "entradas" | "saidas" | "default"
  ) => {
    const today = new Date();

    const filteredByType =
      transactions?.filter((transaction) => {
        if (type === "entradas") return transaction.entrada_saida === "entrada";
        if (type === "saidas") return transaction.entrada_saida === "saida";
        return true;
      }) || [];

    const filteredByDate = filteredByType?.filter((transaction) => {
      const transactionDate = transaction?.createdAt
        ? new Date(transaction.createdAt)
        : null;
      if (!transactionDate) return false;

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

    setFilteredTransactions(filteredByDate);
  };

  const handleFilterChange = (period: "day" | "week" | "month") => {
    setSelectedFilter(period);
  };

  const handleTypeChange = (type: "entradas" | "saidas" | "default") => {
    setSelectedType(type);
  };

  return (
    <View className="flex-1 bg-primary-500 dark:bg-primary-800">
      <Header style={{ height: 180 }}>
        <Balance onTypeChange={handleTypeChange} />
      </Header>

      <RoundedView>
        <View className="flex-1">
          <Animated.View
            entering={FadeInUp.delay(800).duration(800).springify()}
            className="flex-row p-2 bg-primary-200 dark:bg-secondary-600 w-full rounded-full justify-around"
          >
            {["day", "week", "month"].map((period) => (
              <TouchableWithoutFeedback
                key={period}
                onPress={() =>
                  handleFilterChange(period as "day" | "week" | "month")
                }
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
              <View className="w-full gap-6 items-center mt-4">
                <Skeleton className="w-full h-20" />
                <Skeleton className="w-full h-20" />
                <Skeleton className="w-full h-20" />
                <Skeleton className="w-full h-20" />
                <Skeleton className="w-full h-20" />
                <Skeleton className="w-full h-20" />
              </View>
            )}
          />
        </View>
      </RoundedView>
    </View>
  );
}
