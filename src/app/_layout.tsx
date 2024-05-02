import "@/styles/global.css";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import { AuthProvider } from "@/services/AuthContext";

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

      <Slot />
    </AuthProvider>
  );
}
