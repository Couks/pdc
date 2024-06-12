import TabRoutes from "./tab.routes";
import StackRoutes from "./stack.routes";
import { StatusBar } from "react-native";
import { useAuth } from "@/hooks/auth/AuthContext";
import { NavigationContainer } from "@react-navigation/native";

export default function Routes() {
  const { authState } = useAuth();

  return (
    <NavigationContainer independent={true}>
      {authState?.authenticated ? (
        <>
          <TabRoutes />
          <StatusBar barStyle="default" translucent animated />
        </>
      ) : (
        <>
          <StackRoutes />
        </>
      )}
    </NavigationContainer>
  );
}
