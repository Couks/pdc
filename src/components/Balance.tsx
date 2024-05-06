import { Feather } from "@expo/vector-icons";
import { Text, View } from "react-native";
import Animated, {
  FadeIn,
  SlideInLeft,
  SlideInRight,
  SlideInUp,
} from "react-native-reanimated";

export default function Balance() {
  return (
    <Animated.View
      entering={FadeIn.duration(200)}
      className="items-center justify-center gap-6"
    >
      <Animated.View
        entering={SlideInUp.duration(800)}
        className="bg-white py-2 rounded-2xl items-center w-full"
      >
        <Text className="text-lg font-semibold">Balanço Total</Text>
        <Text className="font-bold text-green-500 text-3xl">R$ 7.783,00</Text>
      </Animated.View>
      <View className="flex-row justify-between gap-6">
        <Animated.View
          entering={SlideInLeft.duration(600)}
          className="bg-white py-2 px-6 rounded-2xl items-center"
        >
          <Feather name="arrow-up-right" size={24} />
          <Text className="text-lg font-semibold">Entradas</Text>
          <Text className="font-semibold text-purple-500 text-xl">
            R$ 4.100,00
          </Text>
        </Animated.View>
        <Animated.View
          entering={SlideInRight.duration(600)}
          className="bg-white py-2 px-6 rounded-2xl items-center"
        >
          <Feather name="arrow-down-right" size={24} />
          <Text className="text-lg font-semibold">Gastos</Text>
          <Text className="font-semibold text-purple-500 text-xl">
            R$ 1.187,40
          </Text>
        </Animated.View>
      </View>
    </Animated.View>
  );
}
