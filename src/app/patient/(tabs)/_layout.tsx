import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";
import Animated, { useSharedValue } from "react-native-reanimated";
import { AnimatedTabBar } from "@/components/navigation/AnimatedTabBar";

const PATIENT_TABS = [
  {
    name: "dashboard/index",
    icon: "home-outline",
    label: "Início",
  },
  {
    name: "exams/index",
    icon: "document-text-outline",
    label: "Exames",
  },
  {
    name: "profile/index",
    icon: "person-outline",
    label: "Perfil",
  },
  {
    name: "history/index",
    icon: "card-outline",
    label: "Histórico",
  },
  {
    name: "clinical/index",
    icon: "documents-outline",
    label: "Dados",
  },
] satisfies Array<{
  name: string;
  icon: string;
  label: string;
}>;

export default function TabsLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const scrollY = useSharedValue(0);

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
      tabBar={(props) => (
        <AnimatedTabBar {...props} scrollY={scrollY} tabs={PATIENT_TABS} />
      )}
    >
      <Tabs.Screen
        name="dashboard/index"
        options={{
          title: "Início",
        }}
      />
      <Tabs.Screen
        name="exams/index"
        options={{
          title: "Exames",
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: "Perfil",
        }}
      />
      <Tabs.Screen
        name="history/index"
        options={{
          title: "Histórico",
        }}
      />
      <Tabs.Screen
        name="clinical/index"
        options={{
          title: "Dados",
        }}
      />
    </Tabs>
  );
}
