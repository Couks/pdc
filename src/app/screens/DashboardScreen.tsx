import React, { useState, useMemo, useCallback } from "react";
import { View, Text, ScrollView } from "react-native";
import { Header } from "@/components/ui/Header";
import { RoundedView } from "@/components/ui/RoundedView";
import { DashboardHeader } from "@/components/DashboardHeader";
import SelectInput from "@/components/ui/SelectInput";
import EconomyPieChart from "@/components/EconomyPieChart";
import PieChart from "@/components/ui/PieChart";
import { Ionicons } from "@expo/vector-icons";
import Separator from "@/components/ui/Separator";
import Animated, { FadeInDown } from "react-native-reanimated";
import {
  formatDate,
  formatName,
  formatPrice,
  formatTime,
  getFormattedCategoryName,
} from "@/utils/formatUtils";

export const transactions = [
  // Janeiro
  {
    id: 1,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    entrada_saida: "entrada",
    conta: "",
    valor: 1000,
    categoria: "MORADIA",
    userid: 1,
  },
  {
    id: 2,
    createdAt: "2024-01-02T00:00:00Z",
    updatedAt: "2024-01-02T00:00:00Z",
    entrada_saida: "saida",
    conta: "",
    valor: 200,
    categoria: "ALIMENTACAO",
    userid: 1,
  },
  {
    id: 3,
    createdAt: "2024-01-03T00:00:00Z",
    updatedAt: "2024-01-03T00:00:00Z",
    entrada_saida: "saida",
    conta: "",
    valor: 100,
    categoria: "TRANSPORTE",
    userid: 1,
  },

  // Fevereiro
  {
    id: 4,
    createdAt: "2024-02-10T00:00:00Z",
    updatedAt: "2024-02-10T00:00:00Z",
    entrada_saida: "entrada",
    conta: "",
    valor: 1500,
    categoria: "ECONOMIAS",
    userid: 1,
  },
  {
    id: 5,
    createdAt: "2024-02-15T00:00:00Z",
    updatedAt: "2024-02-15T00:00:00Z",
    entrada_saida: "saida",
    conta: "",
    valor: 300,
    categoria: "SAUDE",
    userid: 1,
  },

  // Março
  {
    id: 6,
    createdAt: "2024-03-05T00:00:00Z",
    updatedAt: "2024-03-05T00:00:00Z",
    entrada_saida: "entrada",
    conta: "",
    valor: 1200,
    categoria: "ESTUDOS",
    userid: 1,
  },
  {
    id: 7,
    createdAt: "2024-03-20T00:00:00Z",
    updatedAt: "2024-03-20T00:00:00Z",
    entrada_saida: "saida",
    conta: "",
    valor: 400,
    categoria: "LAZER",
    userid: 1,
  },

  // Abril
  {
    id: 8,
    createdAt: "2024-04-10T00:00:00Z",
    updatedAt: "2024-04-10T00:00:00Z",
    entrada_saida: "entrada",
    conta: "",
    valor: 1300,
    categoria: "ECONOMIAS",
    userid: 1,
  },
  {
    id: 9,
    createdAt: "2024-04-12T00:00:00Z",
    updatedAt: "2024-04-12T00:00:00Z",
    entrada_saida: "saida",
    conta: "",
    valor: 150,
    categoria: "ALIMENTACAO",
    userid: 1,
  },
  {
    id: 10,
    createdAt: "2024-04-18T00:00:00Z",
    updatedAt: "2024-04-18T00:00:00Z",
    entrada_saida: "saida",
    conta: "",
    valor: 200,
    categoria: "TRANSPORTE",
    userid: 1,
  },

  // Maio
  {
    id: 11,
    createdAt: "2024-05-01T00:00:00Z",
    updatedAt: "2024-05-01T00:00:00Z",
    entrada_saida: "entrada",
    conta: "",
    valor: 1000,
    categoria: "MORADIA",
    userid: 1,
  },
  {
    id: 12,
    createdAt: "2024-06-02T00:00:00Z",
    updatedAt: "2024-06-02T00:00:00Z",
    entrada_saida: "saida",
    conta: "",
    valor: 250,
    categoria: "SAUDE",
    userid: 1,
  },
  {
    id: 13,
    createdAt: "2024-06-03T00:00:00Z",
    updatedAt: "2024-06-03T00:00:00Z",
    entrada_saida: "saida",
    conta: "",
    valor: 100,
    categoria: "ALIMENTACAO",
    userid: 1,
  },

  // Junho
  {
    id: 14,
    createdAt: "2024-06-02T00:00:00Z",
    updatedAt: "2024-06-03T00:00:00Z",
    entrada_saida: "entrada",
    conta: "",
    valor: 1100,
    categoria: "ECONOMIAS",
    userid: 1,
  },
  {
    id: 15,
    createdAt: "2024-06-02T00:00:00Z",
    updatedAt: "2024-06-02T00:00:00Z",
    entrada_saida: "saida",
    conta: "",
    valor: 350,
    categoria: "LAZER",
    userid: 1,
  },

  // Julho
  {
    id: 16,
    createdAt: "2024-07-03T00:00:00Z",
    updatedAt: "2024-07-03T00:00:00Z",
    entrada_saida: "entrada",
    conta: "",
    valor: 900,
    categoria: "ESTUDOS",
    userid: 1,
  },
  {
    id: 17,
    createdAt: "2024-07-18T00:00:00Z",
    updatedAt: "2024-07-18T00:00:00Z",
    entrada_saida: "saida",
    conta: "",
    valor: 400,
    categoria: "SAUDE",
    userid: 1,
  },

  // Agosto
  {
    id: 18,
    createdAt: "2024-08-10T00:00:00Z",
    updatedAt: "2024-08-10T00:00:00Z",
    entrada_saida: "entrada",
    conta: "",
    valor: 1300,
    categoria: "ECONOMIAS",
    userid: 1,
  },
  {
    id: 19,
    createdAt: "2024-08-15T00:00:00Z",
    updatedAt: "2024-08-15T00:00:00Z",
    entrada_saida: "saida",
    conta: "",
    valor: 300,
    categoria: "ALIMENTACAO",
    userid: 1,
  },

  // Setembro
  {
    id: 20,
    createdAt: "2024-09-01T00:00:00Z",
    updatedAt: "2024-09-01T00:00:00Z",
    entrada_saida: "entrada",
    conta: "",
    valor: 1000,
    categoria: "MORADIA",
    userid: 1,
  },
  {
    id: 21,
    createdAt: "2024-09-10T00:00:00Z",
    updatedAt: "2024-09-10T00:00:00Z",
    entrada_saida: "saida",
    conta: "",
    valor: 400,
    categoria: "TRANSPORTE",
    userid: 1,
  },

  // Outubro
  {
    id: 22,
    createdAt: "2024-10-06T00:00:00Z",
    updatedAt: "2024-10-06T00:00:00Z",
    entrada_saida: "entrada",
    conta: "",
    valor: 1400,
    categoria: "ECONOMIAS",
    userid: 1,
  },
  {
    id: 23,
    createdAt: "2024-10-15T00:00:00Z",
    updatedAt: "2024-10-15T00:00:00Z",
    entrada_saida: "saida",
    conta: "",
    valor: 350,
    categoria: "SAUDE",
    userid: 1,
  },

  // Novembro
  {
    id: 24,
    createdAt: "2024-11-01T00:00:00Z",
    updatedAt: "2024-11-01T00:00:00Z",
    entrada_saida: "entrada",
    conta: "",
    valor: 1200,
    categoria: "ESTUDOS",
    userid: 1,
  },
  {
    id: 25,
    createdAt: "2024-11-12T00:00:00Z",
    updatedAt: "2024-11-12T00:00:00Z",
    entrada_saida: "saida",
    conta: "",
    valor: 300,
    categoria: "ALIMENTACAO",
    userid: 1,
  },

  // Dezembro
  {
    id: 26,
    createdAt: "2024-12-05T00:00:00Z",
    updatedAt: "2024-12-05T00:00:00Z",
    entrada_saida: "entrada",
    conta: "",
    valor: 1500,
    categoria: "ECONOMIAS",
    userid: 1,
  },
  {
    id: 27,
    createdAt: "2024-12-10T00:00:00Z",
    updatedAt: "2024-12-10T00:00:00Z",
    entrada_saida: "saida",
    conta: "",
    valor: 500,
    categoria: "LAZER",
    userid: 1,
  },
];

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export function DashboardScreen() {
  const [selectedSlice, setSelectedSlice] = useState<{
    value: number;
    color: string;
  } | null>(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  const filteredTransactions = useMemo(() => {
    return transactions.filter(
      (transaction) =>
        new Date(transaction.createdAt).getMonth() + 1 === selectedMonth
    );
  }, [selectedMonth]);

  const data = useMemo(() => {
    const result = filteredTransactions.reduce(
      (acc: { label: string; value: number; color: string }[], transaction) => {
        const category = acc.find(
          (item) => item.label === transaction.categoria
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
      },
      []
    );
    return result;
  }, [filteredTransactions]);

  const handleSlicePress = useCallback(
    (slice: { value: number; color: string }) => {
      setSelectedSlice(slice);
    },
    []
  );

  return (
    <View className="flex-1 bg-primary-500 dark:bg-primary-800">
      <Header style={{ height: 100 }}>
        <DashboardHeader navigation={undefined} />
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
          <View className="flex-1 gap-2">
            <Economies transactions={filteredTransactions} />
            <LatestExpenses transactions={filteredTransactions} />
            <ExpensesByCategory data={data} onSlicePress={handleSlicePress} />
            {selectedSlice && <SliceDetails slice={selectedSlice} />}
          </View>
        </ScrollView>
      </RoundedView>
    </View>
  );
}

const Economies = ({ transactions }) => {
  const totalReceitas = useMemo(() => {
    return transactions
      .filter((t) => t.entrada_saida === "entrada")
      .reduce((sum, t) => sum + t.valor, 0);
  }, [transactions]);

  const totalDespesas = useMemo(() => {
    return transactions
      .filter((t) => t.entrada_saida === "saida")
      .reduce((sum, t) => sum + t.valor, 0);
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
      <View className="flex-row justify-between gap-2">
        <View className="flex-col items-center justify-center">
          <EconomyPieChart percentage={economiaPercentual} />
          <Text className="text-green-500 text-2xl">
            R$ {totalEconomizado.toFixed(2)}
          </Text>
          <Text className="text-gray-500 text-md -mt-1">Valor economizado</Text>
        </View>

        <View className="flex-col justify-around">
          <View className="items-end">
            <Text className="text-gray-500 dark:text-gray-200 text-lg">
              Receita mensal
            </Text>
            <Text className="text-green-500 text-xl font-bold">
              R$ {totalReceitas.toFixed(2)}
            </Text>
          </View>

          <View className="items-end">
            <Text className="text-gray-500 dark:text-gray-200 text-lg">
              Despesa mensal
            </Text>
            <Text className="text-red-500 text-xl font-bold">
              R$ {totalDespesas.toFixed(2)}
            </Text>
          </View>
        </View>
      </View>
      <View className="flex-row bg-gray-300 dark:bg-gray-700 rounded-lg p-2 mt-4 gap-2 items-center justify-center">
        <Text className="text-gray-800 dark:text-white text-lg text-center">
          {mensagem}
        </Text>
        <Ionicons name={icone} size={24} color="white" />
      </View>
    </Animated.View>
  );
};

const LatestExpenses = ({ transactions }) => {
  const latestTransactions = useMemo(() => {
    return transactions
      .filter((t) => t.entrada_saida === "saida")
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
      {latestTransactions.map((transaction) => (
        <View
          key={transaction.id}
          className="flex-row justify-between items-center mt-2 bg-gray-300 dark:bg-gray-700 px-4 py-2 rounded-lg"
        >
          <View className="">
            <Text className="text-gray-800 dark:text-white">
              {getFormattedCategoryName(transaction.categoria)}
            </Text>
            <Text className="text-gray-700 dark:text-gray-300 text-xs">
              {formatDate(transaction.createdAt)} -
              {formatTime(transaction.createdAt)}
            </Text>
          </View>
          <Text className="text-red-500 text-xl">
            R$ {transaction.valor.toFixed(2)}
          </Text>
        </View>
      ))}
    </Animated.View>
  );
};

const ExpensesByCategory = ({ data, onSlicePress }) => {
  return (
    <Animated.View
      entering={FadeInDown.delay(1000).springify()}
      className="bg-gray-200 dark:bg-gray-800 p-6 rounded-3xl"
    >
      <Text className="text-gray-800 dark:text-white text-xl">
        Despesas por categoria
      </Text>
      <Separator />
      <PieChart data={data} onSlicePress={onSlicePress} />
    </Animated.View>
  );
};

const SliceDetails = ({ slice }) => {
  return (
    <View className="bg-gray-200 dark:bg-gray-800  p-6 rounded-3xl">
      <Text className="text-gray-800 dark:text-white text-lg">
        {slice.label}
      </Text>
      <Text className="text-gray-800 dark:text-white">
        Valor: R$ {slice.value.toFixed(2)}
      </Text>
    </View>
  );
};
