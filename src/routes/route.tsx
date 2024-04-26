import { NavigationContainer } from "@react-navigation/native";
import StackRoutes from "./stack.routes";

export default function Routes() {
  return (
    <NavigationContainer independent={true}>
      <StackRoutes />
    </NavigationContainer>
  );
}
