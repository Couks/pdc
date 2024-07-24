import { useEffect, useState } from "react";
import { Transactions } from "./transaction-list";
import { Balance } from "@/components/Balance";
import { Header } from "@/components/ui/Header";
import { RoundedView } from "@/components/ui/RoundedView";
import { useTransactions } from "@/hooks/useTransactions";
import { TransactionProps } from "@/lib/transactionProps";
import { isSameMonth, isSameWeek, isToday } from "date-fns";
import Animated, { FadeInUp } from "react-native-reanimated";
import { Text, View, TouchableWithoutFeedback } from "react-native";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/Dialog";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CreateTransaction } from "@/components/CreateTransaction";
import { colors } from "@/assets/styles/colors";

export function TransactionsScreen() {
  const { transactions, isLoading, refetch } = useTransactions();
  const [filteredTransactions, setFilteredTransactions] = useState<
    TransactionProps[]
  >([]);
  const [selectedFilter, setSelectedFilter] = useState<
    "day" | "week" | "month"
  >("day");
  const [selectedType, setSelectedType] = useState<
    "recebi" | "gastei" | "default"
  >("default");

  useEffect(() => {
    filterTransactions(selectedFilter, selectedType);
  }, [selectedFilter, selectedType, transactions]);

  const filterTransactions = (
    period: "day" | "week" | "month",
    type: "recebi" | "gastei" | "default"
  ) => {
    const today = new Date();

    const filteredByType =
      transactions?.filter((transaction) => {
        if (type === "recebi") return transaction.entrada_saida === "recebi";
        if (type === "gastei") return transaction.entrada_saida === "gastei";
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

  const handleTypeChange = (type: "recebi" | "gastei" | "default") => {
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
            entering={FadeInUp.delay(800).springify().damping(4)}
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
          />
        </View>

        <Dialog>
          <DialogTrigger>
            <TouchableOpacity
              style={{
                position: "absolute",
                bottom: 90,
                right: 20,
                width: 50,
                height: 50,
                borderRadius: 30,
                backgroundColor: colors.primary[500],
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons name="add" size={32} color="white" />
            </TouchableOpacity>
          </DialogTrigger>
          <DialogContent>
            <CreateTransaction />
          </DialogContent>
        </Dialog>
      </RoundedView>
    </View>
  );
}
