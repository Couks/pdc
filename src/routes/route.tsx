import TabRoutes from "./tab.routes";
import StackRoutes from "./stack.routes";
import { useAuth } from "@/hooks/auth/AuthContext";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";

export default function Routes() {
  const { authState } = useAuth();

  return (
    <NavigationContainer independent={true}>
      {authState?.authenticated ? (
        <TabRoutes />
      ) : (
        <>
          <StackRoutes />
        </>
      )}
    </NavigationContainer>
  );
}
