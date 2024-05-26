import { Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import Animated, {
  BounceInLeft,
  BounceInRight,
  FadeIn,
  SlideInLeft,
  SlideInRight,
  SlideInUp,
} from "react-native-reanimated";
import { TouchableOpacity } from "react-native";
import { useTransactions } from "@/hooks/useTransactions";

export function Balance() {
  const { transactions } = useTransactions();

  const totalEntradas = transactions.reduce((total, transaction) => {
    if (transaction.entrada_saida === "entrada") {
      return total + transaction.valor;
    }
    return total;
  }, 0);

  const totalSaidas = transactions.reduce((total, transaction) => {
    if (transaction.entrada_saida === "saida") {
      return total + transaction.valor;
    }
    return total;
  }, 0);

  const balanceTotal = totalEntradas - totalSaidas;

  return (
    <Animated.View
      entering={FadeIn.duration(1000).springify()}
      className="items-center justify-center gap-4"
    >
      <Animated.View
        entering={SlideInUp.duration(1000)}
        className="bg-white py-2 rounded-lg items-center w-full"
      >
        <Text className="text-lg font-semibold">Balanço Total</Text>
        <Text className="font-bold text-green-500 text-xl">
          R$ {balanceTotal.toFixed(2)}
        </Text>
      </Animated.View>

      <View className="flex-row justify-between w-full">
        <TouchableOpacity onPress={() => filterTransactions("entradas")}>
          <Animated.View
            entering={BounceInLeft.duration(1000).springify()}
            className="bg-white py-2 px-6 rounded-lg items-center"
          >
            <Feather name="arrow-up-right" size={24} />
            <Text className="text-lg font-semibold">Entradas</Text>
            <Text className="font-semibold text-purple-500 text-xl">
              R$ {totalEntradas.toFixed(2)}
            </Text>
          </Animated.View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => filterTransactions("saidas")}>
          <Animated.View
            entering={BounceInRight.duration(1000).springify()}
            className="bg-white py-2 px-6 rounded-lg items-center"
          >
            <Feather name="arrow-down-right" size={24} />
            <Text className="text-lg font-semibold">Saidas</Text>
            <Text className="font-semibold text-purple-500 text-xl">
              R$ {totalSaidas.toFixed(2)}
            </Text>
          </Animated.View>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}
