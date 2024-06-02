import React, { useState, useEffect, useMemo, useCallback } from "react";
import { View, Text, Dimensions, TouchableWithoutFeedback } from "react-native";
import Svg, { Path } from "react-native-svg";
import { useTransactions } from "@/hooks/useTransactions";
import { Transactions } from "@/app/screens/transactions/Transactions";
import { categoryNames } from "@/utils/categoryIcons";
import { isToday, isSameWeek, isSameMonth } from "date-fns";
import Animated, { FadeInUp } from "react-native-reanimated";

const screenWidth = Dimensions.get("window").width;

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

const polarToCartesian = (cx, cy, radius, angleInDegrees) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: cx + radius * Math.cos(angleInRadians),
    y: cy + radius * Math.sin(angleInRadians),
  };
};

const calculateArc = (value, total, radius, cx, cy, startAngle) => {
  const angle = (value / total) * 360;
  const endAngle = startAngle + angle;
  const largeArcFlag = angle > 180 ? 1 : 0;
  const start = polarToCartesian(cx, cy, radius, startAngle);
  const end = polarToCartesian(cx, cy, radius, endAngle);
  const pathData = [
    `M ${cx} ${cy}`,
    `L ${start.x} ${start.y}`,
    `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`,
    `Z`,
  ].join(" ");

  return { path: pathData, endAngle };
};

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

const ArcSlice = ({ slice, total, radius, cx, cy, startAngle, onPress }) => {
  const { path, endAngle } = calculateArc(
    slice.value,
    total,
    radius,
    cx,
    cy,
    startAngle
  );
  return <Path d={path} fill={slice.color} onPress={onPress} />;
};
import { transactions } from "@/app/screens/DashboardScreen";

export function PizzaGraph() {
  const { isLoading, refetch } = useTransactions();
  const [selectedCategory, setSelectedCategory] = useState("GERAL");
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

  const radius = 80;
  const cx = screenWidth / 1.5;
  const cy = 100;
  let startAngle = 0;

  const handleArcPress = useCallback((originalLabel) => {
    setSelectedCategory(originalLabel);
  }, []);

  const getFormattedCategoryName = (category) =>
    categoryNames[category] || category;

  const handleFilterChange = (period) => {
    setSelectedFilter(period);
  };

  return (
    <View className="flex-1 items-center justify-center w-full">
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

      <Svg height="230" width={screenWidth}>
        {categoryData.map((slice, index) => {
          const endAngle = calculateArc(
            slice.value,
            total,
            radius,
            cx,
            cy,
            startAngle
          ).endAngle;
          const arc = (
            <ArcSlice
              key={index}
              slice={slice}
              total={total}
              radius={radius}
              cx={cx}
              cy={cy}
              startAngle={startAngle}
              onPress={() => handleArcPress(slice.originalLabel)}
            />
          );
          startAngle = endAngle;
          return arc;
        })}
      </Svg>

      {selectedCategory && (
        <View
          className="flex-1 w-full items-center gap-2"
          style={{ marginTop: -30 }}
        >
          <View className="items-center">
            <Text className="font-bold text-3xl text-gray-200 dark:text-white">
              {(
                (categoryData.find(
                  (item) => item.originalLabel === selectedCategory
                )?.value /
                  total) *
                100
              ).toFixed(1)}
              %
            </Text>
            <Text className="text-secondary-500 dark:text-primary-500 font-bold text-xl">
              {getFormattedCategoryName(selectedCategory)}
            </Text>
          </View>
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
