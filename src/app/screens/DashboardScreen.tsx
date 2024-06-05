import colors from "tailwindcss/colors";
import { useColorScheme } from "nativewind";
import { Ionicons } from "@expo/vector-icons";
import { Header } from "@/components/ui/Header";
import Separator from "@/components/ui/Separator";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import SelectInput from "@/components/ui/SelectInput";
import { PieChart } from "react-native-gifted-charts";
import { RoundedView } from "@/components/ui/RoundedView";
import EconomyPieChart from "@/components/EconomyPieChart";
import React, { useState, useMemo } from "react";
import { getFormattedCategoryName } from "@/utils/formatUtils";
import { DashboardHeader } from "@/components/DashboardHeader";
import Animated, { FadeInDown, PinwheelIn } from "react-native-reanimated";
import Quotes from "@/components/Quotes";
import { useTransactions } from "@/hooks/useTransactions";
import { Skeleton } from "@/components/ui/Skeleton";

export function DashboardScreen() {
  const { transactions, isLoading, refetch } = useTransactions();

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  const filteredTransactions = useMemo(() => {
    return (transactions ?? []).filter(
      (transaction) =>
        new Date(transaction.createdAt).getMonth() + 1 === selectedMonth
    );
  }, [transactions, selectedMonth]);

  const data = useMemo(() => {
    const result = filteredTransactions?.reduce((acc, transaction) => {
      const category = acc.find(
        (item) => item?.label === transaction.categoria
      );
      if (category) {
        category.value += transaction.valor;
      } else {
        acc.push({
          label: transaction.categoria,
          value: transaction.valor,
          color: getRandomColor(),
        });
      }
      return acc;
    }, []);
    return result?.map((item: any) => ({
      ...item,
      value: (item.value / result.reduce((sum, i) => sum + i.value, 0)) * 100,
    }));
  }, [filteredTransactions]);

  return (
    <View className="flex-1 bg-primary-500 dark:bg-primary-800">
      <Header style={{ height: 100 }}>
        <View className="flex-row items-center justify-between">
          <DashboardHeader navigation={undefined} />
          <TouchableOpacity onPress={refetch}>
            <Ionicons
              name="reload"
              size={18}
              color={colors.gray[400]}
              className="mt-8"
            />
          </TouchableOpacity>
        </View>
      </Header>

      <RoundedView>
        <Text className="text-gray-800 dark:text-gray-200 text-lg px-2">
          Selecione o período
        </Text>
        <SelectInput
          label="Mês"
          options={[
            { label: "Janeiro", value: "1" },
            { label: "Fevereiro", value: "2" },
            { label: "Março", value: "3" },
            { label: "Abril", value: "4" },
            { label: "Maio", value: "5" },
            { label: "Junho", value: "6" },
            { label: "Julho", value: "7" },
            { label: "Agosto", value: "8" },
            { label: "Setembro", value: "9" },
            { label: "Outubro", value: "10" },
            { label: "Novembro", value: "11" },
            { label: "Dezembro", value: "12" },
          ]}
          selectedValue={String(selectedMonth)}
          onValueChange={(value) => setSelectedMonth(Number(value))}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="flex-1 gap-4">
            <Economies
              transactions={filteredTransactions}
              isLoading={isLoading}
            />

            <ExpensesByCategory data={data} isLoading={isLoading} />
            <LatestExpenses
              transactions={filteredTransactions}
              isLoading={isLoading}
            />
            <LatestIncomes
              transactions={filteredTransactions}
              isLoading={isLoading}
            />
            <Quotes />
          </View>
        </ScrollView>
      </RoundedView>
    </View>
  );
}

const Economies = ({ transactions, isLoading }: any) => {
  const totalReceitas = useMemo(() => {
    return transactions
      .filter((t) => t?.entrada_saida === "entrada")
      .reduce((sum, t) => sum + t?.valor, 0);
  }, [transactions]);

  const totalDespesas = useMemo(() => {
    return transactions
      .filter((t) => t?.entrada_saida === "saida")
      .reduce((sum, t) => sum + t?.valor, 0);
  }, [transactions]);

  const totalEconomizado = totalReceitas - totalDespesas;
  const economiaPercentual =
    totalReceitas !== 0 ? (totalEconomizado / totalReceitas) * 100 : 0;

  let mensagem;
  let icone;

  if (economiaPercentual > 50) {
    mensagem = "Você está indo muito bem!";
    icone = "star";
  } else if (economiaPercentual > 20) {
    mensagem = "Você está indo bem!";
    icone = "happy";
  } else {
    mensagem = "Cuidado! Você pode se endividar";
    icone = "sad";
  }

  return (
    <Animated.View
      entering={FadeInDown.delay(600).springify()}
      className="flex-col w-full h-auto rounded-3xl p-6 bg-gray-200 dark:bg-gray-800 "
    >
      <Text className="text-gray-800 dark:text-white text-xl">
        Economia Mensal
      </Text>
      <Separator />
      <View className="flex-row justify-around gap-2 py-2">
        <View className="flex-col justify-around">
          <EconomyPieChart percentage={economiaPercentual} />
          {isLoading ? (
            <Skeleton className="w-full h-4 mt-2 mb-2" />
          ) : (
            <Text className="text-green-500 text-2xl text-center">
              R$ {totalEconomizado.toFixed(2)}
            </Text>
          )}
          <Text className="text-gray-500 text-md -mt-1">Valor economizado</Text>
        </View>

        <Separator orientation="vertical" />

        <View className="flex-col justify-around">
          <View className="items-end">
            <Text className="text-gray-500 dark:text-gray-200 text-lg">
              Receita mensal
            </Text>
            {isLoading ? (
              <Skeleton className="w-full h-4 mt-2" />
            ) : (
              <Text className="text-green-500 text-xl font-bold">
                R$ {totalReceitas.toFixed(2)}
              </Text>
            )}
          </View>

          <View className="items-end">
            <Text className="text-gray-500 dark:text-gray-200 text-lg">
              Despesa mensal
            </Text>
            {isLoading ? (
              <Skeleton className="w-full h-4 mt-2" />
            ) : (
              <Text className="text-red-500 text-xl font-bold">
                R$ {totalDespesas.toFixed(2)}
              </Text>
            )}
          </View>
        </View>
      </View>
      {isLoading ? (
        <View className="flex-row mt-4 items-center justify-center">
          <Skeleton className="w-full h-6" />
        </View>
      ) : (
        <View className="flex-row bg-gray-300 dark:bg-gray-700 rounded-lg p-2 mt-4 gap-2 items-center justify-center">
          <Text className="text-gray-800 dark:text-white text-lg text-center">
            {mensagem}
          </Text>
          <Ionicons name={icone} size={24} color="white" />
        </View>
      )}
    </Animated.View>
  );
};

const LatestExpenses = ({ transactions, isLoading }: any) => {
  const latestTransactions = useMemo(() => {
    return transactions
      .filter((t) => t?.entrada_saida === "saida")
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);
  }, [transactions]);

  return (
    <Animated.View
      entering={FadeInDown.delay(800).springify()}
      className="bg-gray-200 dark:bg-gray-800 p-6 rounded-3xl"
    >
      <Text className="text-gray-800 dark:text-white text-xl">
        Últimas despesas
      </Text>
      <Separator />
      <View>
        {isLoading ? (
          <Skeleton className="w-full h-8" />
        ) : (
          <View className="w-full">
            {latestTransactions?.map((transaction: any) => (
              <View
                key={transaction.id}
                className="flex-row justify-between items-center mt-2 bg-gray-300 dark:bg-gray-700 px-4 py-2 rounded-lg"
              >
                <View className="">
                  <Text className="text-gray-800 dark:text-white">
                    {getFormattedCategoryName(transaction.categoria)}
                  </Text>
                  <Text className="text-gray-700 dark:text-gray-300 text-xs">
                    {new Date(transaction.createdAt).toLocaleDateString()} -
                    {new Date(transaction.createdAt).toLocaleTimeString()}
                  </Text>
                </View>
                <Text className="text-red-500 text-xl">
                  - R$ {transaction.valor.toFixed(2)}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </Animated.View>
  );
};

const LatestIncomes = ({ transactions, isLoading }) => {
  const latestTransactions = useMemo(() => {
    return transactions
      .filter((t: any) => t.entrada_saida === "entrada")
      .sort(
        (a: string, b: string) => new Date(b.createdAt) - new Date(a.createdAt)
      )
      .slice(0, 5);
  }, [transactions]);

  return (
    <Animated.View
      entering={FadeInDown.delay(800).springify()}
      className="bg-gray-200 dark:bg-gray-800 p-6 rounded-3xl"
    >
      <Text className="text-gray-800 dark:text-white text-xl">
        Últimas receitas
      </Text>
      <Separator />
      <View>
        {isLoading ? (
          <Skeleton className="w-full h-8" />
        ) : (
          <View className="w-full">
            {latestTransactions.map((transaction: any) => (
              <View
                key={transaction.id}
                className="flex-row justify-between items-center mt-2 bg-gray-300 dark:bg-gray-700 px-4 py-2 rounded-lg"
              >
                <View>
                  <Text className="text-gray-800 dark:text-white">
                    {getFormattedCategoryName(transaction.categoria)}
                  </Text>
                  <Text className="text-gray-700 dark:text-gray-300 text-xs">
                    {new Date(transaction.createdAt).toLocaleDateString()} -
                    {new Date(transaction.createdAt).toLocaleTimeString()}
                  </Text>
                </View>
                <Text className="text-green-500 text-xl">
                  + R$ {transaction.valor.toFixed(2)}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </Animated.View>
  );
};

const ExpensesByCategory = ({ data }: any) => {
  const { colorScheme } = useColorScheme();

  return (
    <Animated.View
      entering={FadeInDown.delay(1000).springify()}
      className="bg-gray-200 dark:bg-gray-800 p-6 rounded-3xl"
    >
      <Text className="text-gray-800 dark:text-white text-xl">
        Despesas por categoria
      </Text>
      <Separator />

      <View className="flex-row justify-between items-center ">
        <Animated.View
          entering={PinwheelIn.delay(300).duration(10000).springify()}
        >
          <PieChart
            data={data}
            donut
            radius={60}
            innerRadius={40}
            innerCircleColor={
              colorScheme == "light" ? colors.gray[200] : colors.gray[800]
            }
            selectedIndex={data}
          />
        </Animated.View>

        {renderLegendComponent(data)}
      </View>
    </Animated.View>
  );
};

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const renderDot = (color: string) => (
  <View
    style={{
      height: 10,
      width: 10,
      borderRadius: 5,
      backgroundColor: color,
      marginRight: 10,
    }}
  />
);

const renderLegendComponent = (data: any[]) => {
  return (
    <View className="">
      {data.map((item, index) => (
        <View key={index} className="flex-row items-center w-30 ">
          {renderDot(item.color)}
          <Text className="text-sm text-secondary-800 dark:text-white">{`${getFormattedCategoryName(
            item.label
          )}: ${item.value.toFixed(1)}%`}</Text>
        </View>
      ))}
    </View>
  );
};
