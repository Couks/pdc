import { createStackNavigator } from "@react-navigation/stack";
import TransactionScreen from "./[transaction]";
import TransactionsScreen from "./TransactionsScreen";
import { StatusBar } from "expo-status-bar";

const TransactionsStack = createStackNavigator();

export default function TransactionsStackNavigator() {
  return (
    <TransactionsStack.Navigator screenOptions={{ headerShown: true }}>
      <TransactionsStack.Screen
        name="Transactions"
        component={TransactionsScreen}
        options={{ headerTitle: "Transações" }}
      />
      <TransactionsStack.Screen
        name="Transaction"
        component={TransactionScreen}
        options={{ headerTitle: "Transação" }}
      />
    </TransactionsStack.Navigator>
  );
}
