import { Tabs } from "expo-router";
import { AnimatedTabBar } from "@/components/navigation/AnimatedTabBar";

interface TabConfig {
  name: string;
  icon: string;
  label: string;
}

const DOCTOR_TABS: TabConfig[] = [
  {
    name: "dashboard",
    icon: "home",
    label: "Dashboard",
  },
  {
    name: "patients",
    icon: "people",
    label: "Pacientes",
  },
  {
    name: "exams",
    icon: "document-text",
    label: "Exames",
  },
  {
    name: "profile",
    icon: "person",
    label: "Perfil",
  },
];

export default function TabsLayout() {
  return (
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
      tabBar={(props) => <AnimatedTabBar {...props} tabs={DOCTOR_TABS} />}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
        }}
      />
      <Tabs.Screen
        name="patients"
        options={{
          title: "Pacientes",
        }}
      />
      <Tabs.Screen
        name="exams"
        options={{
          title: "Exames",
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
