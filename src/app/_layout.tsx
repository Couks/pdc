import Header from "@/components/Header";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "@/styles/global.css";
import { AuthProvider } from "@/services/AuthContext";
import { useColorScheme } from "nativewind";
import { View } from "react-native";

type LayoutProps = {
  title: string;
};

export default function RootLayout({ title }: LayoutProps) {
  const { colorScheme } = useColorScheme();

  return (
    <AuthProvider>
      <StatusBar
        style="auto"
        backgroundColor={colorScheme == "light" ? "#00D09E" : "#052224"}
      />
      <View className="flex-1">
        <Slot />
      </View>
    </AuthProvider>
  );
}
