import { Stack } from "expo-router";
import { View } from "react-native";

export default function AuthLayout() {
  return (
    <View className="flex-1 bg-background dark:bg-background">
      <Stack
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="home/index"
      />
    </View>
  );
}
