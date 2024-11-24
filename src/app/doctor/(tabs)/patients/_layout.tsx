import { Stack } from "expo-router";

export default function PatientsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Pacientes",
          headerStyle: {
            backgroundColor: "hsl(var(--background))",
          },
          headerTintColor: "hsl(var(--foreground))",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="[id]/index"
        options={{
          title: "Detalhes do Paciente",
          headerStyle: {
            backgroundColor: "hsl(var(--background))",
          },
          headerTintColor: "hsl(var(--foreground))",
        }}
      />
      <Stack.Screen
        name="[id]/exams"
        options={{
          title: "Exames do Paciente",
          headerStyle: {
            backgroundColor: "hsl(var(--background))",
          },
          headerTintColor: "hsl(var(--foreground))",
        }}
      />
    </Stack>
  );
}
