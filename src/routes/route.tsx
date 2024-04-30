import { useState } from "react";
import StackRoutes from "./stack.routes";
import TabRoutes from "./tab.routes";

import { useAuth } from "@/services/AuthContext";
import { NavigationContainer } from "@react-navigation/native";

export default function Routes() {
  // const { isLogedIn, setIsLogedIn } = useAuth();

  const [isLogedIn, setIsLogedIn] = useState(true);

  return (
    <NavigationContainer independent={true}>
      {isLogedIn ? (
        <TabRoutes />
      ) : (
        <>
          <StackRoutes />
        </>
      )}
    </NavigationContainer>
  );
}
