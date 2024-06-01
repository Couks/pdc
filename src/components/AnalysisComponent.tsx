import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTransactions } from "@/hooks/useTransactions";
import Animated, { FlipInEasyX, SlideInUp } from "react-native-reanimated";
import { Skeleton } from "@/components/ui/Skeleton";

export function AnalysisComponent() {
  const { transactions, isLoading } = useTransactions();

  if (isLoading || !transactions) {
    return (
      <Animated.View
        entering={FlipInEasyX}
        className="flex-row bg-secondary-500 p-6 items-center justify-around rounded-3xl mb-8 gap-4"
      >
        <View className="items-center justify-center gap-1">
          <Skeleton className="rounded-full w-20 h-20" />
          <Skeleton className="w-24 h-8 mt-2" />
        </View>

        <View className="bg-gray-500/50 rounded-full h-full w-[2px]" />

        <View className="flex-col items-center gap-4">
          <View className="flex-row gap-2">
            <Skeleton className="w-10 h-10" />
            <Skeleton className="w-32 h-10" />
          </View>
          <View className="bg-gray-500/50 rounded-full h-[2px] w-full" />

          <View className="flex-row gap-2">
            <Skeleton className="w-10 h-10" />
            <Skeleton className="w-32 h-10" />
          </View>
        </View>
      </Animated.View>
    );
  }

  const totalByCategory = transactions.reduce((acc, transaction) => {
    const { categoria, valor, entrada_saida } = transaction;
    if (entrada_saida === "saida") {
      acc[categoria] = (acc[categoria] || 0) + valor;
    }
    return acc;
  }, {} as { [key: string]: number });

  const sortedCategories = totalByCategory
    ? Object.entries(totalByCategory).sort((a, b) => b[1] - a[1])
    : [];

  return (
    <Animated.View
      entering={SlideInUp.delay(200).springify()}
      className="flex-row gap-4 bg-secondary-500 dark:bg-primary-500 p-2 rounded-3xl items-center justify-around"
    >
      <View className="gap-2 items-center justify-center m-4">
        <View className="items-center justify-center rounded-full bg-transparent border-2 size-20 border-white">
          <Ionicons name="car-sport" color="#47286C" size={40} />
          <Text className="font-bold text-secondary-800">{category}</Text>
        </View>
        <Text className="font-bold text-xl text-secondary-600 -mt-1">
          R${value.toFixed(2)}
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
              <Text className="font-bold text-secondary-800">{category}</Text>
              <Text className="font-bold text-xl text-secondary-600 -mt-1">
                R${value.toFixed(2)}
              </Text>
            </View>
          </View>
        ))}
        <View className="bg-white rounded-full h-[2px] w-full" />
      </View>
    </Animated.View>
  );
}
