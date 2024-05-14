import Dashboard from "@/app/(stack)/Dashboard";
import Profile from "@/app/(stack)/profile/ProfileScreen";
import Notifications from "@/app/(stack)/Notifications";
import Transactions from "@/app/(stack)/transactions/TransactionsScreen";

import { View } from "react-native";
import { useColorScheme } from "nativewind";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CategoryListScreen from "@/app/(stack)/categories/CategoryListScreen";
import AnalysisScreen from "@/app/(stack)/Analysis/AnalysisScreen";

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  const { colorScheme } = useColorScheme();

  return (
    <Tab.Navigator
      initialRouteName="Analysis"
      screenOptions={{
        headerShown: false,
        headerTitleAlign: "center",
        tabBarShowLabel: false,
        tabBarActiveTintColor: colorScheme == "light" ? "white" : "white",
        tabBarInactiveTintColor: colorScheme == "light" ? "#052224" : "white",
        tabBarHideOnKeyboard: true,

        tabBarStyle: {
          backgroundColor: colorScheme == "light" ? "#DFF7E2" : "#47286C",
          borderTopWidth: 0,
          paddingHorizontal: 10,

          height: 70,
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return (
                <View className="items-center justify-center size-14 bg-green-500 rounded-3xl  ">
                  <Ionicons name="home" color={color} size={size} />
                </View>
              );
            }
            return <Ionicons name="home-outline" color={color} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name="Analysis"
        component={AnalysisScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return (
                <View className="items-center justify-center size-14 bg-green-500 rounded-3xl ">
                  <Ionicons name="analytics" color={color} size={size} />
                </View>
              );
            }
            return (
              <Ionicons name="analytics-outline" color={color} size={size} />
            );
          },
        }}
      />
      <Tab.Screen
        name="Transactions"
        component={Transactions}
        options={{
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return (
                <View className="items-center justify-center size-14 bg-green-500 rounded-3xl ">
                  <Ionicons name="cash" color={color} size={size} />
                </View>
              );
            }
            return <Ionicons name="cash-outline" color={color} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name="Categories"
        component={CategoryListScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return (
                <View className="items-center justify-center size-14 bg-green-500 rounded-3xl ">
                  <Ionicons name="grid" color={color} size={size} />
                </View>
              );
            }
            return <Ionicons name="grid-outline" color={color} size={size} />;
          },
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return (
                <View className="items-center justify-center size-14 bg-green-500 rounded-3xl ">
                  <Ionicons name="person" color={color} size={size} />
                </View>
              );
            }
            return <Ionicons name="person-outline" color={color} size={size} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}
