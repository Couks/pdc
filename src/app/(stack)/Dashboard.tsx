import {
  format,
  parseISO,
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
} from "date-fns";

import { useState } from "react";
import Header from "@/components/Header";
import { Ionicons } from "@expo/vector-icons";
import Transaction from "./transactions/[transaction]";
import transactionsData from "@/assets/transactionsData.json";
import { Text, TouchableOpacity, View, ScrollView } from "react-native";
import DashboardHeader from "@/components/dinamic-components/DashboardHeader";

interface Transactions {
  id: string;
  iconName: string;
  category: string;
  date: string;
  type: string;
  value: string;
}

const filterByDateRange = (
  transactions: Transactions,
  startDate: Date,
  endDate: Date
) => {
  console.log("Filtrando por intervalo de datas...");
  return transactions.filter((transaction) => {
    const transactionDate = parseISO(transaction.date);
    console.log("Data da transação:", transactionDate);
    console.log("Intervalo de datas:", startDate, "-", endDate);
    const isInRange =
      transactionDate >= startDate && transactionDate <= endDate;
    console.log("Está no intervalo:", isInRange);
    return isInRange;
  });
};

const filterByDay = (transactions, selectedDate) => {
  console.log("Filtrando por dia >>>");
  const startDate = startOfDay(selectedDate);
  const endDate = endOfDay(selectedDate);
  return filterByDateRange(transactions, startDate, endDate);
};

const filterByWeek = (transactions, selectedDate) => {
  console.log("Filtrando por semana >>>");
  const startDate = startOfWeek(selectedDate);
  const endDate = endOfWeek(selectedDate);
  return filterByDateRange(transactions, startDate, endDate);
};

const filterByMonth = (transactions, selectedDate) => {
  console.log("Filtrando por mês >>>");
  const startDate = startOfMonth(selectedDate);
  const endDate = endOfMonth(selectedDate);
  return filterByDateRange(transactions, startDate, endDate);
};

export default function Dashboard({ navigation }) {
  const [filteredTransactions, setFilteredTransactions] =
    useState(transactionsData);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleFilterDay = () => {
    setFilteredTransactions(filterByDay(transactionsData, selectedDate));
  };

  const handleFilterWeek = () => {
    setFilteredTransactions(filterByWeek(transactionsData, selectedDate));
  };

  const handleFilterMonth = () => {
    setFilteredTransactions(filterByMonth(transactionsData, selectedDate));
  };

  return (
    <View className="flex-1 bg-green-500 dark:bg-green-700">
      <Header style={{ height: 220 }}>
        <DashboardHeader />
      </Header>

      <View className="flex-1 bg-white dark:bg-purple-800 items-center p-6 gap-4 rounded-t-[50px]">
        <View className="flex-row gap-5 bg-green-500 px-8 py-4 w-full rounded-3xl h-40 mx-8 items-center justify-around">
          <View className="gap-2 items-center justify-center">
            <View className="items-center justify-center rounded-full bg-transparent border-2 size-20 border-white">
              <Ionicons name="car-sport" color="#47286C" size={40} />
            </View>

            <Text className="font-bold text-purple-800">Meta de Gastos</Text>
          </View>

          <View className="bg-white rounded-full h-full w-[2px] my-8" />

          <View className="flex-col items-center justify-between gap-4">
            <View className="flex-row gap-4 justify-center items-center">
              <Ionicons name="cash" color="#47286C" size={35} />
              <View className="flex-col">
                <Text className="font-bold text-purple-800">Categoria</Text>
                <Text className="font-bold text-xl text-purple-600 -mt-1">
                  R$100.00
                </Text>
              </View>
            </View>

            <View className="bg-white rounded-full h-[2px] w-full" />

            <View className="flex-row gap-4 justify-center items-center">
              <Ionicons name="fast-food" color="#47286C" size={35} />
              <View className="flex-col">
                <Text className="font-bold text-purple-800">Categoria</Text>
                <Text className="font-bold text-xl text-purple-600 -mt-1">
                  R$100.00
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View className="flex-row p-2 bg-green-200 dark:bg-purple-600 w-full rounded-2xl justify-around">
          <TouchableOpacity onPress={handleFilterDay}>
            <View className=" py-2 px-8 rounded-2xl">
              <Text className="text-purple-800 dark:text-white font-bold text-lg">
                Dia
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleFilterWeek}>
            <View className=" py-2 px-8 rounded-2xl">
              <Text className="text-purple-800 dark:text-white font-bold text-lg">
                Semana
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleFilterMonth}>
            <View className="bg-green-500 py-2 px-8 rounded-2xl">
              <Text className="text-white dark:text-purple-600 font-bold text-lg">
                Mês
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <ScrollView className="bg-white dark:bg-purple-800 w-full">
          {filteredTransactions.map((transaction) => (
            <Transaction
              key={transaction.id}
              id={transaction.id}
              iconName={transaction.iconName}
              category={transaction.category}
              date={transaction.date}
              type={transaction.type}
              value={transaction.value}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
