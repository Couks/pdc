import { useState } from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import transactionsData from "@/assets/transactionsData.json";

export default function AnalysisComponent() {
  const [transactionData, setTransactionData] = useState(transactionsData);

  const totalByCategory = transactionData.reduce((acc, transaction) => {
    const { categoria, valor, entrada_saida } = transaction;
    if (entrada_saida === "saida") {
      acc[categoria] = (acc[categoria] || 0) + valor;
    }
    return acc;
  }, {});

  const sortedCategories = Object.entries(totalByCategory).sort(
    (a, b) => b[1] - a[1]
  );

  const [highestCategory, secondHighestCategory] = sortedCategories;

  return (
    <View
      className="flex-row gap-4 bg-green-500 border-4 border-white px-4 py-2 rounded-3xl items-center justify-around"
      style={{ marginTop: -70 }}
    >
      <View className="gap-2 items-center justify-center m-4">
        <View className="items-center justify-center rounded-full bg-transparent border-2 size-20 border-white">
          <Ionicons name="car-sport" color="#47286C" size={40} />
        </View>

        <Text className="font-bold text-md text-purple-800 text-center">
          Meta de Gastos
        </Text>
      </View>

      <View className="bg-white rounded-full h-40 w-[2px]" />

      <View className="flex-col items-start gap-4 px-2">
        {sortedCategories.slice(0, 2).map(([category, value], index) => (
          <View
            key={index}
            className="flex-row gap-4 justify-center items-center"
          >
            <Ionicons name="wallet" color="#47286C" size={35} />
            <View className="flex-col">
              <Text className="font-bold text-purple-800">{category}</Text>
              <Text className="font-bold text-xl text-purple-600 -mt-1">
                R${value.toFixed(2)}
              </Text>
            </View>
          </View>
        ))}
        <View className="bg-white rounded-full h-[2px] w-full" />
      </View>
    </View>
  );
}
