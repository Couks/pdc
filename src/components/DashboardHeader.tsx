import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { Progress } from "./ui/Progress";
import { Link } from "expo-router";

export function DashboardHeader() {
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
          <Link href="/screens/NotificationScreen">
            <Ionicons name="notifications" color="white" size={24} />
          </Link>
        </TouchableOpacity>
      </View>

      <View className="w-full mt-10">
        <View className="flex-row gap-4 items-center justify-center p-3">
          <Text className="text-md font-bold mb-4 text-purple-800 dark:text-green-500 ">
            Balanço total
          </Text>
          <View className="bg-white rounded-full h-[40px] w-[2px]" />

          <Text className="text-md font-bold mb-4 text-purple-800 dark:text-green-500 ">
            Total de Gastos
          </Text>
        </View>
        <Progress percentage={44} />
      </View>
    </View>
  );
}
