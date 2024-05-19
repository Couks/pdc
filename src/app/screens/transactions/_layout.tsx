import { createStackNavigator } from "@react-navigation/stack";
import TransactionsScreen from "./TransactionsScreen";

const TransactionsStack = createStackNavigator();

export default function TransactionsStackNavigator() {
  return (
    <TransactionsStack.Navigator screenOptions={{ headerShown: false }}>
      <TransactionsStack.Screen
        name="Transactions"
        component={TransactionsScreen}
        options={{ headerTitle: "Transações" }}
      />
    </TransactionsStack.Navigator>
  );
}
