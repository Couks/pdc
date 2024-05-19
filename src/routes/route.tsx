import TabRoutes from "./tab.routes";
import StackRoutes from "./stack.routes";

import { useAuth } from "@/hooks/auth/AuthContext";
import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import FabGroup from "@/components/ui/FabGroup";

export default function Routes() {
  const { authState } = useAuth();

  return (
    <NavigationContainer independent={true}>
      {true ? (
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
