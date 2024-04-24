import Home from "@/app";
import User from "@/app/screens/user";
import Categories from "@/app/screens/categories";
import Transactions from "@/app/screens/transactions";
import LoginScreen from "@/app/screens/login/LoginScreen";
import SignupScreen from "@/app/screens/login/SignupScreen";
import Dashboard from "@/app/screens/dashboard";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function StackRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#00D09E",
        },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen
        name="Home"
        component={Dashboard}
        options={{ title: "Dashboard" }}
      />
      <Stack.Screen
        name="Perfil"
        component={User}
        options={{ title: "Perfil" }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: "Login" }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignupScreen}
        options={{ headerShown: false, title: "SignUp" }}
      />
      <Stack.Screen
        name="Categories"
        component={Categories}
        options={{ title: "Categorias" }}
      />
      <Stack.Screen
        name="Transactions"
        component={Transactions}
        options={{ title: "Transações" }}
      />
    </Stack.Navigator>
  );
}
