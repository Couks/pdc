import TabRoutes from "./tab.routes";
import StackRoutes from "./stack.routes";
import { useAuth } from "@/hooks/auth/AuthContext";
import { PaperProvider } from "react-native-paper";
import { FabGroup } from "@/components/ui/FabGroup";
import { NavigationContainer } from "@react-navigation/native";

export default function Routes() {
  const { authState } = useAuth();

  return (
    <NavigationContainer independent={true}>
      {authState?.authenticated ? (
        <PaperProvider>
          <TabRoutes />
          <FabGroup />
        </PaperProvider>
      ) : (
        <>
          <StackRoutes />
        </>
      )}
    </NavigationContainer>
  );
}
