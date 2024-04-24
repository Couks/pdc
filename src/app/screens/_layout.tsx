import { Slot } from "expo-router";
import { View, Text } from "react-native";

export default function Layout() {
  return (
    <View className="flex-1 items-center bg-green-500 dark:bg-green-700">
      <Text className="font-bold text-3xl dark:text-white py-12">
        Bem vindo!
      </Text>

      <View className="flex-1 w-full rounded-t-[35px] bg-white dark:bg-purple-600">
        <Slot />
      </View>
    </View>
  );
}
