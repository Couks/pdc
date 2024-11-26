import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";
import Animated, { useSharedValue } from "react-native-reanimated";
import { AnimatedTabBar } from "@/components/navigation/AnimatedTabBar";

const PATIENT_TABS = [
  {
    name: "dashboard",
    icon: "home-outline",
    label: "Início",
  },
  {
    name: "exams",
    icon: "document-text-outline",
    label: "Exames",
  },
  {
    name: "profile",
    icon: "person-outline",
    label: "Perfil",
  },
  {
    name: "history",
    icon: "card-outline",
    label: "Histórico",
  },
  {
    name: "clinical",
    icon: "documents-outline",
    label: "Dados",
  },
] satisfies Array<{
  name: string;
  icon: string;
  label: string;
}>;

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: "hsl(var(--background))",
        },
        headerTintColor: "hsl(var(--foreground))",
        headerShown: true,
        tabBarShowLabel: false,
      }}
      tabBar={(props) => <AnimatedTabBar {...props} tabs={PATIENT_TABS} />}
    >
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
        name="profile"
        options={{
          title: "Perfil",
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
    </Tabs>
  );
}
