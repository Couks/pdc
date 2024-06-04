import Animated, {
  BounceInLeft,
  BounceInRight,
  SlideInUp,
  FadeIn,
} from "react-native-reanimated";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { useTransactions } from "@/hooks/useTransactions";
import { TransactionProps } from "@/lib/transactionProps";
import { Pressable } from "react-native";
import { colors as defaultColors } from "@/assets/styles/colors";
import colors from "tailwindcss/colors";
import { transactions } from "@/assets/transactions";

interface BalanceProps {
  onFilterChange?: (filteredTransactions: TransactionProps[]) => void;
}

export function Balance({ onFilterChange }: BalanceProps) {
  // const { transactions } = useTransactions();

  const [totalEntradas, setTotalEntradas] = useState(0);
  const [totalSaidas, setTotalSaidas] = useState(0);
  const [balance, setBalance] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState("entrada");

  useEffect(() => {
    const entradas = transactions
      ?.filter((transaction) => transaction.entrada_saida === "entrada")
      .reduce((total, transaction) => total + transaction?.valor, 0);
    const saidas = transactions
      ?.filter((transaction) => transaction.entrada_saida === "saida")
      .reduce((total, transaction) => total + transaction?.valor, 0);

    setTotalEntradas(entradas || 0);
    setTotalSaidas(saidas || 0);
    setBalance((entradas || 0) - (saidas || 0));
  }, [transactions]);

  const handlePress = (filter: string) => {
    setSelectedFilter(filter);
    let filteredTransactions: TransactionProps[] | undefined | null = [];

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
    <Animated.View entering={FadeIn.delay(400).springify()} className="gap-2">
      <Pressable onPress={() => handlePress("default")}>
        <Animated.View
          entering={BounceInRight.delay(600)}
          className="flex-row items-center w-full justify-between bg-white px-3 py-1 rounded-3xl"
        >
          <View className="flex-row gap-2 justify-center items-center">
            <Ionicons name="wallet" size={38} color={colors.blue[500]} />
            <Text className="text-2xl font-semibold text-secondary-800">
              Saldo
            </Text>
          </View>
          <Text className="font-bold text-2xl text-blue-500">
            R$ {balance?.toFixed(2)}
          </Text>
        </Animated.View>
      </Pressable>

      <Pressable onPress={() => handlePress("entradas")}>
        <Animated.View
          entering={BounceInLeft.delay(800).springify()}
          className={`flex-row items-center w-full justify-between bg-white px-3 py-1 rounded-3xl ${
            selectedFilter === "entradas" &&
            "border-4 border-primary-600 dark:border-secondary-500"
          }`}
        >
          <View className="flex-row gap-2 justify-center items-center">
            <Ionicons
              name="add-circle"
              size={40}
              color={defaultColors.primary[500]}
            />
            <Text className="text-2xl font-semibold text-secondary-800">
              Receitas
            </Text>
          </View>

          <Text className="font-semibold text-primary-500 text-2xl">
            R$ {totalEntradas?.toFixed(2)}
          </Text>
        </Animated.View>
      </Pressable>

      <Pressable onPress={() => handlePress("saidas")}>
        <Animated.View
          entering={BounceInRight.delay(1000).springify()}
          className={`flex-row items-center w-full justify-between bg-white px-3 py-1 rounded-3xl ${
            selectedFilter === "saidas" &&
            "border-4 border-primary-600 dark:border-secondary-500"
          }`}
        >
          <View className="flex-row gap-2 justify-center items-center">
            <Ionicons name="remove-circle" size={40} color={colors.red[500]} />
            <Text className="text-2xl font-semibold text-secondary-800">
              Despesas
            </Text>
          </View>

          <Text className="font-semibold text-red-500 text-2xl">
            R$ {totalSaidas?.toFixed(2)}
          </Text>
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
}
