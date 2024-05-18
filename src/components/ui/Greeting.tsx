import { Ionicons } from "@expo/vector-icons";
import { Progress } from "@/components/ui/Progress";

import { Text, TouchableOpacity, View } from "react-native";

export default function Greeting() {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      return "Bom dia";
    } else if (hour >= 12 && hour < 18) {
      return "Boa tarde";
    } else {
      return "Boa noite";
    }
  };

  return (
    <View className="flex-col justify-center">
      <View className="flex-row justify-between items-center w-full">
        <View className="items-start">
          <Text className="text-xl font-bold dark:text-green-500">
            Olá, Bem Vindo De Volta!
          </Text>
          <Text className="text-xs font-regular dark:text-green-200">
            {getGreeting()}
          </Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="notifications" color="white" size={24} />
        </TouchableOpacity>
      </View>

      <View className="w-full mt-10">
        <View>
          <Text className="text-md font-bold mb-4 text-purple-800 dark:text-green-500 ">
            Total de Gastos
          </Text>
          <Progress percentage={44} />
        </View>
      </View>
    </View>
  );
}
