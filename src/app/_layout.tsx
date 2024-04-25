import "@/styles/global.css";
import { Slot } from "expo-router";
import { NavigationContainer } from "@react-navigation/native";
import StackRoutes from "@/routes/stack.routes";

export function Layout() {
  return (
    <NavigationContainer>
      <StackRoutes />
      <Slot />
    </NavigationContainer>
  );
}
