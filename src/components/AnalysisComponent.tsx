import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTransactions } from "@/hooks/useTransactions";
import Animated, { SlideInRight, SlideInUp } from "react-native-reanimated";
import { Skeleton } from "@/components/ui/Skeleton";
import Separator from "./ui/Separator";
import { transactions } from "@/assets/transactions";
import { colors as defaultColors } from "@/assets/styles/colors";
import { useColorScheme } from "nativewind";
import { categoryIcons } from "@/utils/categoryIcons";
import { getFormattedCategoryName } from "@/utils/formatUtils";

export function AnalysisComponent() {
  const { colorScheme } = useColorScheme();
  const { isLoading } = useTransactions();

  if (isLoading) {
    return (
      <Animated.View
        entering={SlideInRight.springify()}
        className="flex-row bg-green-200 dark:bg-secondary-600 p-6 items-center justify-around rounded-3xl gap-4"
      >
        <View className="items-center justify-center gap-1">
          <Skeleton className="rounded-full w-20 h-20" />
          <Skeleton className="w-24 h-8 mt-2" />
        </View>

        <Separator orientation="vertical" />

        <View className="flex-col items-center gap-4">
          <View className="flex-row gap-2">
            <Skeleton className="w-10 h-10" />
            <Skeleton className="w-32 h-10" />
          </View>
          <Separator />

          <View className="flex-row gap-2">
            <Skeleton className="w-10 h-10" />
            <Skeleton className="w-32 h-10" />
          </View>
        </View>
      </Animated.View>
    );
  }

  const totalByCategory = transactions.reduce(
    (acc: { [key: string]: number }, transaction) => {
      const { categoria, valor, entrada_saida } = transaction;
      if (entrada_saida === "saida") {
        acc[categoria] = (acc[categoria] || 0) + valor;
      }
      return acc;
    },
    {}
  );

  const sortedCategories = Object.entries(totalByCategory).sort(
    (a, b) => b[1] - a[1]
  );

  const categoriesToShow = sortedCategories.slice(0, 3);
  const iconName =
    categoryIcons[categoriesToShow[0][0]] || "alert-circle-outline";

  return (
    <Animated.View
      entering={SlideInRight.springify()}
      className="flex-row bg-green-200 dark:bg-secondary-600 p-6 items-center justify-around rounded-3xl gap-4"
    >
      {/* Maior gasto */}
      {categoriesToShow.length > 0 && (
        <View className="gap-2 items-center justify-center m-4">
          <View className="items-center justify-center rounded-full bg-transparent border-4 size-20 border-secondary-500 dark:border-primary-500">
            <Ionicons
              name={iconName}
              color={
                colorScheme === "light"
                  ? defaultColors.secondary[500]
                  : defaultColors.primary[500]
              }
              size={40}
            />
          </View>
          <Text className="font-bold text-secondary-800 dark:text-white">
            {getFormattedCategoryName(categoriesToShow[0][0])}
          </Text>
          <Text className="font-bold text-xl text-secondary-600 dark:text-gray-200 -mt-2">
            R${categoriesToShow[0][1].toFixed(2) || "0.00"}{" "}
          </Text>
        </View>
      )}

      <Separator orientation="vertical" />

      <View className="flex-col items-start gap-4 px-2">
        {categoriesToShow.slice(1).map(([category, value], index) => (
          <View key={index} className="w-full">
            <View className="flex-row gap-4 justify-center items-center">
              <Ionicons
                name="wallet"
                color={
                  colorScheme === "light"
                    ? defaultColors.secondary[500]
                    : defaultColors.primary[500]
                }
                size={35}
              />
              <View className="flex-col">
                <Text className="font-bold text-secondary-800 dark:text-white">
                  {getFormattedCategoryName(category)}
                </Text>
                <Text className="font-bold text-xl text-secondary-600 dark:text-gray-200 -mt-1">
                  R${value.toFixed(2)}
                </Text>
              </View>
            </View>
            {index < categoriesToShow.slice(1).length - 1 && (
              <Separator style={{ marginTop: 22 }} />
            )}
          </View>
        ))}
      </View>
    </Animated.View>
  );
}
