import TabRoutes from "./tab.routes";
import StackRoutes from "./stack.routes";
import { useAuth } from "@/hooks/auth/AuthContext";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

export default function Routes() {
  const { authState } = useAuth();

  return (
    <NavigationContainer independent={true}>
      {authState?.authenticated ? (
        <>
          <TabRoutes />
          <StatusBar style="auto" translucent animated />
        </>
      ) : (
        <>
          <StackRoutes />
        </>
      )}
    </NavigationContainer>
  );
}
