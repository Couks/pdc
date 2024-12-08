import { Stack } from "expo-router";

export default function PatientsLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "hsl(var(--background))",
        },
        headerTintColor: "hsl(var(--foreground))",
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Lista de Pacientes",
        }}
      />

      <Stack.Screen
        name="[id]/details"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="[id]/exams"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
