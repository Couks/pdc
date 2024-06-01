import { Header } from "@/components/ui/Header";
import { RoundedView } from "@/components/ui/RoundedView";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Text, View, ScrollView, ActivityIndicator } from "react-native";
import PieChart from "@/components/ui/PieChart";
import { useState, useEffect } from "react";
import { useTransactions } from "@/hooks/useTransactions";

export function DashboardScreen() {
  const { transactions, isLoading, error } = useTransactions();
  const [selectedSlice, setSelectedSlice] = useState(null);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const data = transactions
    ? transactions.reduce((acc, transaction) => {
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
      }, [])
    : [];

  const handleSlicePress = (slice) => {
    setSelectedSlice(slice);
  };

  return (
    <View className="flex-1 bg-primary-500 dark:bg-primary-800">
      <Header style={{ height: 200 }}>
        <DashboardHeader navigation={undefined} />
      </Header>

      <RoundedView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="flex-1 gap-4">
            <Economies transactions={transactions} />
            <MonthlyEconomy transactions={transactions} />
            <LatestExpenses transactions={transactions} />
            <ExpensesByCategory data={data} onSlicePress={handleSlicePress} />
            {selectedSlice && <SliceDetails slice={selectedSlice} />}
          </View>
        </ScrollView>
      </RoundedView>
    </View>
  );
}

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const Economies = ({ transactions }) => {
  const totalReceitas = transactions
    .filter((t) => t.entrada_saida === "entrada")
    .reduce((sum, t) => sum + t.valor, 0);
  const totalDespesas = transactions
    .filter((t) => t.entrada_saida === "saida")
    .reduce((sum, t) => sum + t.valor, 0);

  return (
    <View className="flex-row w-full h-52 rounded-3xl p-6 bg-gray-800 dark:bg-primary-900">
      <View className="flex-col justify-between w-1/2">
        <Text className="text-white marker:dark:text-gray-400 text-xl">
          Economia
        </Text>
      </View>
      <View className="flex-col justify-between w-1/2 gap-2">
        <View>
          <Text className="text-gray-200 dark:text-gray-600 text-sm">
            Receitas consideradas
          </Text>
          <Text className="text-green-500 text-xl font-bold">
            R$ {totalReceitas.toFixed(2)}
          </Text>
        </View>

        <View>
          <Text className="text-gray-200 dark:text-gray-600 text-sm">
            Despesas consideradas
          </Text>
          <Text className="text-red-500 text-xl font-bold">
            R$ {totalDespesas.toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const MonthlyEconomy = ({ transactions }) => {
  const totalReceitas = transactions
    .filter((t) => t.entrada_saida === "entrada")
    .reduce((sum, t) => sum + t.valor, 0);
  const totalDespesas = transactions
    .filter((t) => t.entrada_saida === "saida")
    .reduce((sum, t) => sum + t.valor, 0);
  const economia = totalReceitas - totalDespesas;
  const economiaPercentual =
    totalDespesas !== 0 ? (economia / totalReceitas) * 100 : 0;

  return (
    <View className="bg-gray-800 p-4 rounded-lg mt-4">
      <Text className="text-white text-lg">Economia mensal</Text>
      <View className="flex-row justify-between items-center mt-2">
        <Text className="text-green-500 text-2xl">
          {economiaPercentual.toFixed(0)}%
        </Text>
        <Text className="text-white text-xl">R$ {economia.toFixed(2)}</Text>
      </View>
      <View className="flex-row justify-between items-center mt-2">
        <Text className="text-green-500">Receitas consideradas</Text>
        <Text className="text-green-500">R$ {totalReceitas.toFixed(2)}</Text>
      </View>
      <View className="flex-row justify-between items-center mt-2">
        <Text className="text-red-500">Despesas consideradas</Text>
        <Text className="text-red-500">R$ {totalDespesas.toFixed(2)}</Text>
      </View>
      <Text className="text-white mt-2">Você está indo bem!</Text>
    </View>
  );
};

const LatestExpenses = ({ transactions }) => {
  const latestTransactions = transactions.slice(-3).reverse();

  return (
    <View className="bg-gray-800 p-4 rounded-lg mt-4">
      <Text className="text-white text-lg">Últimas despesas</Text>
      {latestTransactions.map((transaction, index) => (
        <ExpenseItem
          key={index}
          category={transaction.categoria}
          amount={`R$ ${transaction.valor.toFixed(2)}`}
          time={new Date(transaction.createdAt).toLocaleTimeString()}
        />
      ))}
    </View>
  );
};

const ExpenseItem = ({ category, amount, time }) => (
  <View className="flex-row justify-between items-center mt-2">
    <View className="flex-row items-center">
      <View className="bg-yellow-500 w-4 h-4 rounded-full mr-2" />
      <Text className="text-white">{category}</Text>
    </View>
    <Text className="text-white">{amount}</Text>
    <Text className="text-gray-400">{time}</Text>
  </View>
);

const ExpensesByCategory = ({ data, onSlicePress }) => (
  <View className="bg-gray-800 p-4 rounded-lg mt-4">
    <Text className="text-white text-lg">Despesas por categoria</Text>
    <PieChart data={data} onSlicePress={onSlicePress} />
    <View className="mt-4">
      {data.map((item, index) => (
        <View
          key={index}
          className="flex-row justify-between items-center mt-2"
        >
          <View className="flex-row items-center">
            <View
              className={`w-4 h-4 rounded-full mr-2`}
              style={{ backgroundColor: item.color }}
            />
            <Text className="text-white">{item.label}</Text>
          </View>
          <Text className="text-white">
            {(
              (item.value / data.reduce((sum, item) => sum + item.value, 0)) *
              100
            ).toFixed(0)}
            %
          </Text>
        </View>
      ))}
    </View>
  </View>
);

const SliceDetails = ({ slice }) => (
  <View className="bg-gray-800 p-4 rounded-lg mt-4">
    <Text className="text-white text-lg">{slice.label}</Text>
    <Text className="text-white">{`R$ ${slice.value.toFixed(2)}`}</Text>
  </View>
);
