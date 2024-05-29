import { Link } from "expo-router";
import { formatString } from "@/lib/utils";
import { Ionicons } from "@expo/vector-icons";
import { useProfile } from "@/hooks/useProfile";
import { Text, View } from "react-native";

export function DashboardHeader({ navigation }: { navigation: any }) {
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
    <View className="flex-row justify-between items-center mb-8">
      <View className="items-start">
        <Text className="text-md font-semibold dark:text-green-200">
          {getGreeting()}, {formattedName}
        </Text>
        <Text className="text-2xl font-bold dark:text-green-500">
          Seja Bem Vindo!
        </Text>
      </View>

      <Link href="/">
        <Ionicons name="notifications" color="white" size={24} />
      </Link>
    </View>
  );
}
