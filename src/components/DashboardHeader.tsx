import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
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
    <View className="flex-row flex-1 justify-between items-center w-full">
      <View className="items-start ">
        <Text className="text-xl font-bold dark:text-green-500">
          Olá, Bem Vindo De Volta!
        </Text>
        <Text className="text-md font-regular dark:text-green-200">
          {getGreeting()}
        </Text>
      </View>

      <TouchableOpacity>
        <Link href={"/screens/NotificationsScreen"}>
          <Ionicons name="notifications" color="white" size={24} />
        </Link>
      </TouchableOpacity>
    </View>
  );
}
