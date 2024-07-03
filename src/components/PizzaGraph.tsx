import colors from "tailwindcss/colors";
import { categoryNames } from "@/utils/categoryIcons";
import { useColorScheme } from "nativewind";
import { PieChart } from "react-native-gifted-charts";
import { useTransactions } from "@/hooks/useTransactions";
import { isToday, isSameWeek, isSameMonth } from "date-fns";
import Animated, { FadeInUp } from "react-native-reanimated";
import { colors as defaultColors } from "@/assets/styles/colors";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import { Transactions } from "@/app/screens/transactions/Transactions";
import React, { useState, useEffect, useMemo, useCallback } from "react";

const fixedColors = [
  "#FF5733", // Laranja
  "#FFC300", // Amarelo
  "#4CAF50", // Verde
  "#FF4081", // Rosa
  "#9C27B0", // Roxo
  "#3F51B5", // Azul
  "#00BCD4", // Ciano
  "#FF5722", // Laranja escuro
  "#8BC34A", // Verde claro
];

const generateColor = (index: number) =>
  fixedColors[index % fixedColors.length];

const useCategoryData = (transactions) => {
  return useMemo(() => {
    if (transactions && transactions.length > 0) {
      const categoryMap = transactions.reduce((acc, transaction) => {
        const category = transaction.categoria.toString(); // Garante que a chave é uma string
        acc[category] = (acc[category] || 0) + transaction.valor;
        return acc;
      }, {});

      const data = Object.keys(categoryMap).map((key, index) => ({
        label: categoryNames[key] || key,
        originalLabel: key,
        value: categoryMap[key],
        color: generateColor(index),
      }));

      const totalValue = data.reduce((acc, curr) => acc + curr.value, 0);
      return { data, totalValue };
    }
    return { data: [], totalValue: 0 };
  }, [transactions]);
};

export function PizzaGraph() {
  const { colorScheme } = useColorScheme();
  const { transactions, isLoading, refetch } = useTransactions();
  const [selectedCategory, setSelectedCategory] = useState();
  const [filteredTransactions, setFilteredTransactions] =
    useState(transactions);
  const [selectedFilter, setSelectedFilter] = useState("week");

  useEffect(() => {
    filterTransactions(selectedFilter);
  }, [selectedFilter, transactions]);

  const filterTransactions = (period: string) => {
    const today = new Date();
    const filtered = transactions?.filter((transaction) => {
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
    setFilteredTransactions(filtered || []);
  };

  const { data: categoryData, totalValue: total } =
    useCategoryData(filteredTransactions);

  const handleArcPress = useCallback((originalLabel: any) => {
    setSelectedCategory(originalLabel);
  }, []);

  const getFormattedCategoryName = (category: any) =>
    categoryNames[category] || category;

  const handleFilterChange = (period: any) => {
    setSelectedFilter(period);
  };

  const noTransactionsText =
    filteredTransactions && filteredTransactions.length === 0
      ? "Nenhuma transação encontrada."
      : null;

  return (
    <View className="flex-1 items-center gap-2">
      <Animated.View
        entering={FadeInUp.delay(200).springify()}
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

      <PieChart
        data={categoryData}
        donut
        strokeWidth={5}
        focusOnPress
        toggleFocusOnPress
        strokeColor="#000"
        innerCircleBorderWidth={5}
        innerCircleBorderColor="#000"
        innerCircleColor={
          colorScheme == "light" ? colors.white : defaultColors.secondary[700]
        }
        radius={100}
        innerRadius={70}
        centerLabelComponent={() => (
          <View className=" justify-center items-center">
            <Text className="font-bold text-2xl text-gray-800 dark:text-white">
              {(
                (categoryData.find(
                  (item) => item.originalLabel === selectedCategory
                )?.value /
                  total) *
                100
              ).toFixed(1) || 0}
              %
            </Text>
            {selectedCategory != null && (
              <Text className="text-secondary-500 dark:text-primary-500 font-bold text-lg">
                {getFormattedCategoryName(selectedCategory)}
              </Text>
            )}
          </View>
        )}
        onPress={(item: { originalLabel: any }) =>
          handleArcPress(item.originalLabel)
        }
      />

      <Transactions
        transactions={filteredTransactions?.filter(
          (transaction) => transaction.categoria === selectedCategory
        )}
        isLoading={isLoading}
        onRefresh={refetch}
      />

      {noTransactionsText && (
        <View className="flex-1">
          <Text className="text-center text-gray-700 dark:text-gray-100">
            {noTransactionsText}
          </Text>
        </View>
      )}
    </View>
  );
}
