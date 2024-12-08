import { Tabs } from "expo-router";
import { AnimatedTabBar } from "@/components/navigation/AnimatedTabBar";

// Define as abas disponíveis para o paciente com seus respectivos ícones e rótulos
const PATIENT_TABS = [
  {
    name: "dashboard",
    icon: "home",
    label: "Início",
  },
  {
    name: "exams",
    icon: "document-text",
    label: "Exames",
  },

  {
    name: "history",
    icon: "time",
    label: "Histórico",
  },
  {
    name: "clinical",
    icon: "documents",
    label: "Dados",
  },
  {
    name: "profile",
    icon: "person",
    label: "Perfil",
  },
] satisfies Array<{
  name: string;
  icon: string;
  label: string;
}>;

// Componente principal que define o layout de navegação em abas para o paciente
export default function TabsLayout() {
  return (
    // Configura o componente Tabs com opções visuais personalizadas
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: "hsl(var(--background))",
          borderBottomWidth: 1,
          borderBottomColor: "hsl(var(--border))",
          elevation: 0,
          shadowOpacity: 0,
          height: 20,
        },
        headerTitleAlign: "center",
        headerShadowVisible: false,
        headerTintColor: "hsl(var(--foreground))",
        headerShown: true,
        headerTitle: "",
        tabBarShowLabel: false,
      }}
      // Utiliza um componente de barra de abas animada personalizado
      tabBar={(props) => <AnimatedTabBar {...props} tabs={PATIENT_TABS} />}
    >
      {/* Define as telas individuais para cada aba */}
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Início",
        }}
      />
      <Tabs.Screen
        name="exams"
        options={{
          title: "Exames",
        }}
      />

      <Tabs.Screen
        name="history"
        options={{
          title: "Histórico",
        }}
      />
      <Tabs.Screen
        name="clinical"
        options={{
          title: "Dados",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
        }}
      />
    </Tabs>
  );
}
