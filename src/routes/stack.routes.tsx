import { useColorScheme } from "nativewind";
import { Home } from "@/app/screens/login/Welcome";
import { SignInScreen } from "@/app/screens/login/SignInScreen";
import { SignUpScreen } from "@/app/screens/login/SignUpScreen";
import { ForgotPassword } from "@/app/screens/login/ForgotPassword";
import { OnboardingScreen } from "@/app/screens/OnboardingScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function StackRoutes() {
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
        animationDuration: 5000,
      }}
    >
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
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
        name="SignUpScreen"
        component={SignUpScreen}
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
