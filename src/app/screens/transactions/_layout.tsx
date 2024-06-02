import { createStackNavigator } from "@react-navigation/stack";
import { TransactionsScreen } from "./TransactionsScreen";
import { CreateTransaction } from "./CreateTransaction";
import { useColorScheme } from "nativewind";

const TransactionsStack = createStackNavigator();

export default function TransactionsStackNavigator() {
  const { colorScheme } = useColorScheme();

  return (
    <TransactionsStack.Navigator
      screenOptions={{
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        statusBarStyle: colorScheme == "dark" ? "light" : "dark",
        statusBarColor: colorScheme == "light" ? "#00D09E" : "#052224",
        headerTitleAlign: "center",
        headerBackTitleStyle: { fontSize: 40 },
        headerStyle: {
          backgroundColor: colorScheme == "light" ? "#00D09E" : "#052224",
        },
        animation: "ios",
        statusBarAnimation: "slide",
        animationDuration: 250,
      }}
    >
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
