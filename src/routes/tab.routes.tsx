import { View } from "react-native";
import { useColorScheme } from "nativewind";
import { Ionicons } from "@expo/vector-icons";
import AnalysisScreen from "@/app/screens/AnalysisScreen";
import DashboardScreen from "@/app/screens/DashboardScreen";
import ProfileScreen from "@/app/screens/profile/ProfileScreen";
import CategoryListScreen from "@/app/screens/CategoryListScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TransactionsScreen from "@/app/screens/transactions/TransactionsScreen";

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  const { colorScheme } = useColorScheme();

  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
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
        component={DashboardScreen}
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
        component={TransactionsScreen}
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
        component={ProfileScreen}
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
