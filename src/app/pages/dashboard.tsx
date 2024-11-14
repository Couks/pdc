import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Dashboard() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 p-4">
        <Text className="text-2xl font-bold text-black mb-4">Dashboard</Text>
        <View className="flex-1 items-center justify-center">
          <Text className="text-base text-gray-600">
            Bem-vindo ao seu painel principal
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
