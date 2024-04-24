import "@/styles/global.css";
import { Slot } from "expo-router";
import { NavigationContainer } from "@react-navigation/native";
import StackRoutes from "@/routes/stack.routes";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

export function Layout() {
  return (
    <NavigationContainer>
      <StatusBar />
      <StackRoutes />
      <Slot />
    </NavigationContainer>
  );
}
