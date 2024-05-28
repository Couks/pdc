import { createStackNavigator } from "@react-navigation/stack";
import { TransactionsScreen } from "./TransactionsScreen";
import { CreateTransaction } from "./CreateTransaction";

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
        name="CreateTransaction"
        component={CreateTransaction}
        options={{ headerTitle: "Criar Transação" }}
      />
    </TransactionsStack.Navigator>
  );
}
