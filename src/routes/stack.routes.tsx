import Home from "@/app/screens/Welcome";
import User from "@/app/screens/dashboard/User";
import Dashboard from "@/app/screens/dashboard/Dashboard";
import Categories from "@/app/screens/dashboard/Categories";
import Transactions from "@/app/screens/dashboard/Transactions";
import LoginScreen from "@/app/screens/onboarding/login/LoginScreen";
import SignupScreen from "@/app/screens/onboarding/login/SignupScreen";
import ForgotPassword from "@/app/screens/onboarding/login/ForgotPassword";

import { useState } from "react";
import { useColorScheme } from "nativewind";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Onboarding } from "@/app/screens/onboarding/Onboarding";

const Stack = createNativeStackNavigator();

function StackRoutes() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const { colorScheme } = useColorScheme();

  return (
    <Stack.Navigator
      initialRouteName="Onboarding"
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
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          statusBarColor: colorScheme == "light" ? "#F1FFF3" : "#052224",
        }}
      />

      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ title: "Bem Vindo" }}
      />

      <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="SignUpScreen"
        component={SignupScreen}
        options={{ title: "Criar Conta" }}
      />

      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{ title: "Esqueceu a senha?" }}
      />
    </Stack.Navigator>
  );
}

export default () => {
  return (
    <NavigationContainer independent={true}>
      <StackRoutes />
    </NavigationContainer>
  );
};
