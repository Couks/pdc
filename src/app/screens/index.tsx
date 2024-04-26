import Routes from "@/routes/route";
import TabRoutes from "@/routes/tab.routes";
import "@/styles/global.css";
import { NavigationContainer } from "@react-navigation/native";
import { Slot } from "expo-router";

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <TabRoutes />
    </NavigationContainer>
  );
}
