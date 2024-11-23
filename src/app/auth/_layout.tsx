import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

export default function AuthLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: colorScheme === "dark" ? "#1f2937" : "#eee",
        },
      }}
    >
      <Stack.Screen
        name="login/index"
        options={{
          title: "Login",
        }}
      />
      <Stack.Screen
        name="register/index"
        options={{
          title: "Cadastro",
        }}
      />
    </Stack>
  );
}
