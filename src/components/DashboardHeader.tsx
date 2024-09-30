import { Link } from "expo-router";
import { formatString } from "@/lib/utils";
import { useProfile } from "@/hooks/useProfile";
import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export function DashboardHeader({ navigation }) {
  const { userData } = useProfile();

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

  const formattedName = formatString(userData?.firstName);

  return (
    <View className="flex-row items-center justify-between w-full">
      <Text className="text-md font-medium text-secondary-900 dark:text-white">
        {getGreeting()}, {formattedName}
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate("/settings")}>
        <Ionicons name="settings-outline" size={24}></Ionicons>
      </TouchableOpacity>
    </View>
  );
}
