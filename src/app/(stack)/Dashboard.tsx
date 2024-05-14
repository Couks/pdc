import { useState } from "react";
import Header from "@/components/Header";
import Transaction from "./transactions/[id]";
import transactionsData from "@/assets/transactionsData.json";
import { Text, TouchableOpacity, View, ScrollView } from "react-native";
import DashboardHeader from "@/components/dinamic-components/DashboardHeader";
import AnalysisComponent from "@/components/dinamic-components/AnalysisComponent";

export default function Dashboard({ navigation }: { navigation: any }) {
  const [filteredTransactions, setFilteredTransactions] =
    useState(transactionsData);

  return (
    <View className="flex-1 bg-green-500 dark:bg-green-700">
      <Header style={{ height: 230 }}>
        <DashboardHeader />
      </Header>

      <View className="flex-1 bg-white dark:bg-purple-800 items-center p-6 gap-4 rounded-t-[50px]">
        <View className="flex-row p-2 bg-green-200 dark:bg-purple-600 w-full rounded-2xl justify-around">
          <TouchableOpacity>
            <View className=" py-2 px-8 rounded-2xl">
              <Text className="text-purple-800 dark:text-white font-bold text-lg">
                Dia
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View className=" py-2 px-8 rounded-2xl">
              <Text className="text-purple-800 dark:text-white font-bold text-lg">
                Semana
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View className="bg-green-500 py-2 px-8 rounded-2xl">
              <Text className="text-white dark:text-purple-600 font-bold text-lg">
                Mês
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <ScrollView className="bg-white dark:bg-purple-800 w-full">
          {transactionsData.map((transaction) => (
            <Transaction
              key={transaction.id}
              id={transaction.id}
              createdAt={transaction.createdAt}
              entrada_saida={transaction.entrada_saida}
              valor={transaction.valor}
              categoria={transaction.categoria}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
