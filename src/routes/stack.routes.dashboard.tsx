import Home from "@/app/login/Welcome";
import Category from "@/app/(stack)/categories/CategoryListScreen";
import LoginScreen from "@/app/login/LoginScreen";
import SignupScreen from "@/app/login/SignupScreen";
import ForgotPassword from "@/app/login/ForgotPassword";

import { useColorScheme } from "nativewind";
import { useState } from "react";
import { Onboarding } from "@/app/onboarding/Onboarding";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function StackRoutesDashboard() {
  const { colorScheme } = useColorScheme();

  const [initialRoute, setInitialRoute] = useState("Onboarding");

  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerShown: false,
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
        name="Onboarding"
        component={Onboarding}
        options={{ headerShown: false }}
      />

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
