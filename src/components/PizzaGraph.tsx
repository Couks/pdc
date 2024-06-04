import React, { useState, useEffect, useMemo, useCallback } from "react";
import { View, Text, Dimensions, TouchableWithoutFeedback } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { useTransactions } from "@/hooks/useTransactions";
import { categoryNames } from "@/utils/categoryIcons";
import { isToday, isSameWeek, isSameMonth } from "date-fns";
import Animated, { FadeInUp } from "react-native-reanimated";
import { transactions } from "@/assets/transactions";
import { Transactions } from "@/app/screens/transactions/Transactions";
import { useColorScheme } from "nativewind";
import colors from "tailwindcss/colors";
import { colors as defaultColors } from "@/assets/styles/colors";

const fixedColors = [
  "#FF5733",
  "#FFC300",
  "#DAF7A6",
  "#C70039",
  "#900C3F",
  "#581845",
  "#003f5c",
  "#374c80",
  "#7a5195",
];

const generateColor = (index) => fixedColors[index % fixedColors.length];

const useCategoryData = (transactions) => {
  return useMemo(() => {
    if (transactions && transactions.length > 0) {
      const categoryMap = transactions.reduce((acc, transaction) => {
        acc[transaction.categoria] =
          (acc[transaction.categoria] || 0) + transaction.valor;
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
  const { isLoading, refetch } = useTransactions();
  const [selectedCategory, setSelectedCategory] = useState();
  const [filteredTransactions, setFilteredTransactions] =
    useState(transactions);
  const [selectedFilter, setSelectedFilter] = useState("day");

  useEffect(() => {
    filterTransactions(selectedFilter);
  }, [selectedFilter, transactions]);

  const filterTransactions = (period) => {
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
    setFilteredTransactions(filtered);
  };

  const { data: categoryData, totalValue: total } =
    useCategoryData(filteredTransactions);

  const handleArcPress = useCallback((originalLabel) => {
    setSelectedCategory(originalLabel);
  }, []);

  const getFormattedCategoryName = (category) =>
    categoryNames[category] || category;

  const handleFilterChange = (period) => {
    setSelectedFilter(period);
  };

  return (
    <View className="flex-1 items-center">
      <Animated.View
        entering={FadeInUp.delay(800).duration(800).springify()}
        className=" flex-row p-2 bg-primary-200 dark:bg-secondary-600 w-full rounded-full justify-around shadow"
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
        sectionAutoFocus
        focusOnPress
        innerCircleColor={
          colorScheme == "light" ? colors.white : defaultColors.secondary[800]
        }
        radius={120}
        innerRadius={80}
        centerLabelComponent={() => (
          <View className=" justify-center items-center">
            <Text className="font-bold text-4xl text-gray-800 dark:text-white">
              {(
                (categoryData.find(
                  (item) => item.originalLabel === selectedCategory
                )?.value /
                  total) *
                100
              ).toFixed(1) | 100}
              %
            </Text>
            <Text className="text-secondary-500 dark:text-primary-500 font-bold text-xl">
              {getFormattedCategoryName(selectedCategory)}
            </Text>
          </View>
        )}
        onPress={(item) => handleArcPress(item.originalLabel)}
      />

      {selectedCategory == null ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-2xl text-gray-400 px-8 text-center">
            Selecione uma categoria no gráfico para visualizar as transações
          </Text>
        </View>
      ) : (
        <View className="w-full gap-2 h-full">
          <Transactions
            transactions={filteredTransactions?.filter(
              (transaction) => transaction.categoria === selectedCategory
            )}
            isLoading={isLoading}
            onRefresh={refetch}
            ListEmptyComponent={() => (
              <View className="items-center mt-4">
                <Text className="text-2xl text-gray-400 font-medium text-center">
                  Envie uma transação para visualizar o gráfico
                </Text>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
}
