import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";
import Animated, { useSharedValue } from "react-native-reanimated";
import { AnimatedTabBar } from "@/components/navigation/AnimatedTabBar";

const DOCTOR_TABS = [
  {
    name: "dashboard/index",
    icon: "home-outline",
    label: "Dashboard",
  },
  {
    name: "patients/index",
    icon: "people-outline",
    label: "Pacientes",
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
        headerShown: false,
        tabBarShowLabel: false,
      }}
      tabBar={(props) => (
        <AnimatedTabBar {...props} scrollY={scrollY} tabs={DOCTOR_TABS} />
      )}
    >
      <Tabs.Screen
        name="dashboard/index"
        options={{
          title: "Dashboard",
        }}
      />
      <Tabs.Screen
        name="patients/index"
        options={{
          title: "Pacientes",
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
    </Tabs>
  );
}
