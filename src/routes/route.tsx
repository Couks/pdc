import TabRoutes from "./tab.routes";
import StackRoutes from "./stack.routes";

import { useAuth } from "@/services/AuthContext";
import { NavigationContainer } from "@react-navigation/native";

export default function Routes() {
  const { authState } = useAuth();

  return (
    <NavigationContainer independent={true}>
      {true ? (
        <TabRoutes />
      ) : (
        <>
          <StackRoutes />
        </>
      )}
    </NavigationContainer>
  );
}
