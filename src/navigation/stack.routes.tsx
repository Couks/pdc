import { useColorScheme } from "nativewind";
import { Home } from "@/app/screens/shared/login";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { ForgotPassword } from "@/app/screens/shared/login/forgot-password";
import { colors } from "@/assets/styles/colors";
import { SignIn } from "@/app/screens/shared/login/sign-in";
import { SignUp } from "@/app/screens/shared/login/sign-up";

const Stack = createNativeStackNavigator();

export default function StackRoutes() {
  const { colorScheme } = useColorScheme();

  const [initialRoute, setInitialRoute] = useState("Onboarding");

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const value = await AsyncStorage.getItem("@has_onboarded");
        if (value !== null) {
          setInitialRoute("Home");
        }
      } catch (e) {
        console.error(e);
      }
    };
    checkOnboardingStatus();
  }, []);

  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        statusBarStyle: colorScheme == "dark" ? "light" : "dark",
        statusBarColor:
          colorScheme == "light" ? colors.primary[500] : colors.secondary[900],
        headerTitleAlign: "center",
        headerBackTitleStyle: { fontSize: 40 },
        headerStyle: {
          backgroundColor:
            colorScheme == "light"
              ? colors.primary[500]
              : colors.secondary[900],
        },
        animation: "ios",
        statusBarAnimation: "slide",
        animationDuration: 5000,
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          statusBarColor:
            colorScheme == "light" ? colors.white : colors.secondary[900],
        }}
      />

      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          title: "Bem Vindo",
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: "bold",
            color: "#fff",
          },
          headerShadowVisible: false,
        }}
      />

      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          title: "Criar Conta",
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: "bold",
            color: "#fff",
          },
          headerShadowVisible: false,
        }}
      />

      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          title: "Esqueceu a senha?",
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: "bold",
            color: "#fff",
          },
          headerShadowVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}
