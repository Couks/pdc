import React, { useState, useEffect } from "react";
import { View, Text, Dimensions } from "react-native";
import Svg, { Path } from "react-native-svg";
import { useTransactions } from "@/hooks/useTransactions";
import { Transactions } from "@/app/screens/transactions/Transactions";
import { categoryNames } from "@/utils/categoryIcons";

const screenWidth = Dimensions.get("window").width;

const fixedColors = [
  "#FF5733", // Laranja
  "#FFC300", // Amarelo
  "#DAF7A6", // Verde claro
  "#C70039", // Vermelho
  "#900C3F", // Vinho
  "#581845", // Roxo escuro
  "#003f5c", // Azul escuro
  "#374c80", // Azul médio
  "#7a5195", // Roxo médio
];

const generateColor = (index: number) => {
  return fixedColors[index % fixedColors.length];
};

const calculateArc = (
  value: number,
  total: number,
  radius: number,
  cx: number,
  cy: number,
  startAngle: number
) => {
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

const polarToCartesian = (
  cx: number,
  cy: number,
  radius: number,
  angleInDegrees: number
) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: cx + radius * Math.cos(angleInRadians),
    y: cy + radius * Math.sin(angleInRadians),
  };
};

export function PizzaGraph() {
  const { transactions, isLoading, refetch } = useTransactions();
  const [selectedCategory, setSelectedCategory] = useState<string>(
    "GERAL" ||
      "MORADIA" ||
      "ALIMENTACAO" ||
      "TRANSPORTE" ||
      "SAUDE" ||
      "EDUCACAO" ||
      "LAZER" ||
      "DESPESAS_PESSOAIS" ||
      "ECONOMIAS"
  );
  const [categoryData, setCategoryData] = useState<
    { label: string; originalLabel: string; value: number; color: string }[]
  >([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (transactions && transactions.length > 0) {
      const categoryMap: { [key: string]: number } = {};
      transactions.forEach((transaction) => {
        if (categoryMap[transaction?.categoria]) {
          categoryMap[transaction?.categoria] += transaction.valor;
        } else {
          categoryMap[transaction?.categoria] = transaction.valor;
        }
      });

      const data = Object.keys(categoryMap).map((key, index) => ({
        label: categoryNames[key],
        originalLabel: key,
        value: categoryMap[key],
        color: generateColor(index),
      }));

      const totalValue = data.reduce((acc, curr) => acc + curr.value, 0);

      setCategoryData(data);
      setTotal(totalValue);
    }
  }, [transactions]);

  const radius = 80;
  const cx = screenWidth / 1.5;
  const cy = 100;
  let startAngle = 0;

  const getFormattedCategoryName = (category: string) => {
    return categoryNames[category] || category;
  };

  return (
    <View className="flex-1 items-center justify-center w-full">
      <Svg height="230" width={screenWidth}>
        {categoryData.map((slice, index) => {
          const { path, endAngle } = calculateArc(
            slice.value,
            total,
            radius,
            cx,
            cy,
            startAngle
          );
          startAngle = endAngle;

          return (
            <View className="px-8">
              <Text className="dark:text-white font-bold text-lg">
                {slice.label}
              </Text>
              <Path
                key={index}
                d={path}
                fill={slice.color}
                onPress={() => setSelectedCategory(slice.originalLabel)}
              />
            </View>
          );
        })}
      </Svg>

      {selectedCategory && (
        <View
          className="flex-1 w-full items-center gap-2"
          style={{ marginTop: -30 }}
        >
          <View className="items-center">
            <Text className=" font-bold text-3xl text-gray-200 dark:text-white">
              {(
                (categoryData.find(
                  (item) => item.originalLabel === selectedCategory
                )?.value! /
                  total) *
                100
              ).toFixed(2)}
              %
            </Text>
            <Text className="text-secondary-500 dark:text-primary-500 font-bold text-xl">
              {getFormattedCategoryName(selectedCategory)}
            </Text>
          </View>
          <Transactions
            transactions={transactions?.filter(
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
