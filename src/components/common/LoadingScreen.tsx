import { View, ActivityIndicator } from "react-native";

export function LoadingScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <ActivityIndicator size="large" color="hsl(var(--primary))" />
    </View>
  );
}
