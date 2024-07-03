import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTransactions } from "@/hooks/useTransactions";
import Animated, { SlideInRight } from "react-native-reanimated";
import { Skeleton } from "@/components/ui/Skeleton";
import { colors as defaultColors } from "@/assets/styles/colors";
import { useColorScheme } from "nativewind";
import { categoryIcons } from "@/utils/categoryIcons";
import { formatPrice, getFormattedCategoryName } from "@/utils/formatUtils";

export function Analysis() {
  const { colorScheme } = useColorScheme();
  const { transactions, isLoading } = useTransactions();

  if (isLoading) {
    return (
      <Animated.View
        entering={SlideInRight.springify()}
        className="flex-row bg-green-200 dark:bg-secondary-600 p-6 items-center justify-around rounded-3xl gap-4"
      >
        <View className="items-center justify-center">
          <Skeleton className="rounded-full size-20" />
          <Skeleton className="w-20 h-4 mt-2" />
          <Skeleton className="w-24 h-4 mt-2" />
        </View>
        <View className="items-center justify-center">
          <Skeleton className="rounded-full size-20" />
          <Skeleton className="w-20 h-4 mt-2" />
          <Skeleton className="w-24 h-4 mt-2" />
        </View>
        <View className="items-center justify-center">
          <Skeleton className="rounded-full size-20" />
          <Skeleton className="w-20 h-4 mt-2" />
          <Skeleton className="w-24 h-4 mt-2" />
        </View>
      </Animated.View>
    );
  }

  const totalByCategory =
    transactions?.reduce((acc, { categoria, valor, entrada_saida }) => {
      if (entrada_saida === "gastei") {
        acc[categoria] = acc[categoria] || 0 + valor;
      }
      return acc;
    }, {}) ?? {};

  const categoriesToShow = Object.entries(totalByCategory)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  return (
    <View className="flex-row bg-green-200 dark:bg-secondary-600 p-6 items-center justify-around rounded-3xl gap-4">
      {categoriesToShow.map(([category, value], index) => (
        <View key={index} className="gap-2 items-center justify-center">
          <View className="items-center justify-center rounded-full border-4 size-20 border-secondary-500 dark:border-primary-500">
            <Ionicons
              name={categoryIcons[category] || "alert-circle-outline"}
              color={
                colorScheme === "light"
                  ? defaultColors.secondary[500]
                  : defaultColors.primary[500]
              }
              size={30}
            />
          </View>
          <Text className="font-bold text-sm text-secondary-800 dark:text-purple-500">
            {getFormattedCategoryName(category)}
          </Text>
          <Text className="font-bold text-md text-secondary-600 dark:text-gray-200 -mt-2">
            {formatPrice("gastei", value)}
          </Text>
        </View>
      ))}
    </View>
  );
}
