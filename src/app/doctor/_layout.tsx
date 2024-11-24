import { Tabs } from "expo-router";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function DoctorLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: "hsl(var(--background))",
          marginTop: 10,
        },
        headerTintColor: "hsl(var(--foreground))",
        tabBarStyle: {
          backgroundColor: "hsl(var(--background))",
          borderTopWidth: 0,
          elevation: 0,
          height: 60 + (Platform.OS === "ios" ? insets.bottom : 0),
          marginHorizontal: 20,
          borderRadius: 50,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.25,
          shadowRadius: 10,
          paddingHorizontal: 10,
          paddingBottom: Platform.OS === "ios" ? insets.bottom : 0,
        },
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="dashboard/dashboard"
        options={{
          title: "Dashboard/index",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="patients/index"
        options={{
          title: "Pacientes",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="exams/index"
        options={{
          title: "Exames",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-text-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="request-exam/index"
        options={{
          title: "Solicitar Exame",
          href: null,

          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="patients/[id]/exams"
        options={{
          href: null,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="patients/[id]/index"
        options={{
          title: "Exames",
          href: null,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-text-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="pending/index"
        options={{
          title: "Exames",
          href: null,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-text-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
