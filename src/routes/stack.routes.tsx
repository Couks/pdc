import Home from "@/app/screens/Welcome";
import LoginScreen from "@/app/login/LoginScreen";
import CategoryScreen from "@/app/screens/Category";
import SignupScreen from "@/app/login/SignupScreen";
import ForgotPassword from "@/app/login/ForgotPassword";

import { useEffect, useState } from "react";
import { useColorScheme } from "nativewind";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Onboarding } from "@/app/onboarding/Onboarding";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

export default function StackRoutes() {
  const [isLogedIn, setIsLogedIn] = useState(false);
  const { colorScheme } = useColorScheme();

  const [initialRoute, setInitialRoute] = useState("Onboarding");

  useEffect(() => {
    const verificarPrimeiraAbertura = async () => {
      const alreadyOpened = await AsyncStorage.getItem("alreadyOpened");
      console.log(alreadyOpened);
      if (alreadyOpened !== null) {
        setInitialRoute("Home"); // Usuário já abriu o app antes
      }
    };

    verificarPrimeiraAbertura();
  }, []);

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
      {isLogedIn ? (
        <>
          <Stack.Screen
            name="Category"
            component={CategoryScreen}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <>
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
        </>
      )}
    </Stack.Navigator>
  );
}
