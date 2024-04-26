import TabRoutes from "@/routes/tab.routes";
import { NavigationContainer } from "@react-navigation/native";
import { Slot } from "expo-router";

export default function DashboardLayout() {
  return (
    <NavigationContainer>
      <TabRoutes />
      <Slot />
    </NavigationContainer>
  );
}
