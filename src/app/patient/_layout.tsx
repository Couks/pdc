import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

export default function PatientLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      {/* Adicione outras telas de stack aqui se necessário */}
    </Stack>
  );
}
