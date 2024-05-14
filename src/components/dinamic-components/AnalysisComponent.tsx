import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

export default function AnalysisComponent() {
  return (
    <View className="flex-row gap-5 bg-green-500 px-8 py-4 w-full rounded-3xl h-40 mx-8 items-center justify-around">
      <View className="gap-2 items-center justify-center">
        <View className="items-center justify-center rounded-full bg-transparent border-2 size-20 border-white">
          <Ionicons name="car-sport" color="#47286C" size={40} />
        </View>

        <Text className="font-bold text-md text-purple-800 text-center">
          Meta de Gastos
        </Text>
      </View>

      <View className="bg-white rounded-full h-24 w-[2px] my-8" />

      <View className="flex-col items-start gap-4">
        <View className="flex-row gap-4 justify-center items-center">
          <Ionicons name="cash" color="#47286C" size={35} />
          <View className="flex-col">
            <Text className="font-bold text-purple-800">Investimentos</Text>
            <Text className="font-bold text-xl text-purple-600 -mt-1">
              R$100.00
            </Text>
          </View>
        </View>

        <View className="bg-white rounded-full h-[2px] w-full" />

        <View className="flex-row gap-4 justify-center items-center">
          <Ionicons name="fast-food" color="#47286C" size={35} />
          <View className="flex-col">
            <Text className="font-bold text-purple-800">Comida</Text>
            <Text className="font-bold text-xl text-purple-600 -mt-1">
              R$100.00
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
