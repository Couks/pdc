import TabRoutes from "./tab.routes";
import StackRoutes from "./stack.routes";

import { useState } from "react";
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
