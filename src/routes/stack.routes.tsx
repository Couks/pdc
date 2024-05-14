import Home from "@/app/login/Welcome";

import { useColorScheme } from "nativewind";
import SignInScreen from "@/app/login/SignInScreen";
import SignUpScreen from "@/app/login/SignUpScreen";
import ForgotPassword from "@/app/login/ForgotPassword";
import { Onboarding } from "@/app/onboarding/Onboarding";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function StackRoutes() {
  const { colorScheme } = useColorScheme();

  return (
    <Stack.Navigator
      initialRouteName="Home"
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
        name="SignInScreen"
        component={SignInScreen}
        options={{ title: "Bem Vindo" }}
      />

      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
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
