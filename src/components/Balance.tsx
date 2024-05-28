import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import Animated, {
  BounceInLeft,
  BounceInRight,
  SlideInUp,
  FadeIn,
} from "react-native-reanimated";
import { TouchableWithoutFeedback } from "react-native";
import { useTransactions } from "@/hooks/useTransactions";
import { TransactionProps } from "@/lib/transactionProps";

interface BalanceProps {
  onFilterChange: (filteredTransactions: TransactionProps[]) => void;
}

export function Balance({ onFilterChange }: BalanceProps) {
  const { transactions } = useTransactions();

  const [totalEntradas, setTotalEntradas] = useState(0);
  const [totalSaidas, setTotalSaidas] = useState(0);
  const [balance, setBalance] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState("");

  useEffect(() => {
    const entradas = transactions
      ?.filter((transaction) => transaction.entrada_saida === "entrada")
      .reduce((total, transaction) => total + transaction.valor, 0);
    const saidas = transactions
      ?.filter((transaction) => transaction.entrada_saida === "saida")
      .reduce((total, transaction) => total + transaction.valor, 0);

    setTotalEntradas(entradas || 0);
    setTotalSaidas(saidas || 0);
    setBalance((entradas || 0) - (saidas || 0));
  }, [transactions]);

  const handlePress = (filter: string) => {
    setSelectedFilter(filter);
    let filteredTransactions: TransactionProps[] | null | undefined = [];

    switch (filter) {
      case "entradas":
        filteredTransactions = transactions?.filter(
          (transaction) => transaction.entrada_saida === "entrada"
        );
        break;
      case "saidas":
        filteredTransactions = transactions?.filter(
          (transaction) => transaction.entrada_saida === "saida"
        );
        break;
      default:
        filteredTransactions = transactions;
    }

    if (onFilterChange) {
      onFilterChange(filteredTransactions!);
    }
  };

  return (
    <Animated.View
      entering={FadeIn.duration(1000).springify()}
      className="items-center justify-center gap-4"
    >
      <TouchableWithoutFeedback onPress={() => handlePress("default")}>
        <Animated.View
          entering={SlideInUp.duration(1000)}
          className="bg-white py-2 rounded-xl items-center w-full"
        >
          <Text className="text-lg font-semibold text-purple-800">
            Balanço Total
          </Text>
          <Text className="font-bold text-2xl text-purple-500">
            R$ {balance?.toFixed(2)}
          </Text>
        </Animated.View>
      </TouchableWithoutFeedback>

      <View className="flex-row gap-4  w-full">
        <TouchableWithoutFeedback onPress={() => handlePress("entradas")}>
          <Animated.View
            entering={BounceInLeft.duration(1000).springify()}
            className={`bg-white py-2 px-6 rounded-xl items-center ${
              selectedFilter === "entradas" && "bg-purple-400"
            }`}
          >
            <View className="flex-row gap-1 self-start">
              <Feather
                name="arrow-up-right"
                size={24}
                color={selectedFilter === "entradas" ? "white" : "black"}
              />
              <Text
                className={`text-lg font-semibold text-purple-800 ${
                  selectedFilter === "entradas" && "text-white"
                }`}
              >
                Entradas
              </Text>
            </View>
            <Text
              className={`font-semibold text-green-500 text-xl ${
                selectedFilter === "entradas" && "text-white"
              }`}
            >
              R$ {totalEntradas?.toFixed(2)}
            </Text>
          </Animated.View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => handlePress("saidas")}>
          <Animated.View
            entering={BounceInRight.duration(1000).springify()}
            className={`bg-white py-2 px-6 rounded-xl items-center ${
              selectedFilter === "saidas" && "bg-purple-400"
            }`}
          >
            <View className="flex-row gap-1 self-start">
              <Feather
                name="arrow-down-right"
                size={24}
                color={selectedFilter === "saidas" ? "white" : "black"}
              />
              <Text
                className={`text-lg font-semibold text-purple-800 ${
                  selectedFilter === "saidas" && "text-white"
                }`}
              >
                Saidas
              </Text>
            </View>

            <Text
              className={`font-semibold text-red-500 text-xl ${
                selectedFilter === "saidas" && "text-white"
              }`}
            >
              R$ {totalSaidas?.toFixed(2)}
            </Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </Animated.View>
  );
}
