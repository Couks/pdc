import { Slot } from "expo-router";
import { View, Text } from "react-native";

export default function Layout() {
  return (
    <View className="flex-1 bg-green-500 dark:bg-green-700">
      <Slot />
    </View>
  );
}
