import { createStackNavigator } from "@react-navigation/stack";
import TransactionsScreen from "./TransactionsScreen";
import EditTransaction from "./EditTransaction";

const TransactionsStack = createStackNavigator();

export default function TransactionsStackNavigator() {
  return (
    <TransactionsStack.Navigator screenOptions={{ headerShown: false }}>
      <TransactionsStack.Screen
        name="Transactions"
        component={TransactionsScreen}
        options={{ headerTitle: "Transações" }}
      />

      <TransactionsStack.Screen
        name="EditTransaction"
        component={EditTransaction}
        options={{ headerTitle: "Editar Transação" }}
      />
    </TransactionsStack.Navigator>
  );
}
