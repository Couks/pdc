import { View } from "react-native";
import { useColorScheme } from "nativewind";
import { Ionicons } from "@expo/vector-icons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TransactionsScreen } from "@/app/screens/transactions";
import { Text } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { DashboardScreen } from "@/app/screens/dashboard";
import { ExpenseAnalysis } from "@/app/screens/expense-analysis";
import { CategoryList } from "@/app/screens/category";
import { Profile } from "@/app/screens/profile";

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  const { colorScheme } = useColorScheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerTintColor: colorScheme == "light" ? "#47286C" : "white",
        headerTitleAlign: "center",
        headerStatusBarHeight: 30,
        headerTitle(props) {
          return (
            <Animated.View
              entering={FadeInUp.delay(200).springify()}
              className="w-full mt-2"
            >
              <Text className="dark:text-white text-secondary-800 font-bold text-3xl">
                {props.children}
              </Text>
            </Animated.View>
          );
        },
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: colorScheme == "light" ? "#00D09E" : "#052224",
        },
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: colorScheme == "light" ? "#052224" : "#47286C",
        tabBarInactiveTintColor: colorScheme == "light" ? "#052224" : "white",
        tabBarStyle: {
          backgroundColor: colorScheme == "light" ? "#DFF7E2" : "#47286C",
          borderTopWidth: 0,
          paddingHorizontal: 6,
          position: "absolute",
          bottom: 12,
          elevation: 14,
          marginHorizontal: 24,
          borderRadius: 100,
          height: 60,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={DashboardScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return (
                <View className="items-center justify-center size-14 bg-primary-500 rounded-full">
                  <Ionicons name="home" color={color} size={size} />
                </View>
              );
            }
            return <Ionicons name="home-outline" color={color} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name="Análise de Gastos"
        component={ExpenseAnalysis}
        options={{
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return (
                <View className="items-center justify-center size-14 bg-primary-500 rounded-full">
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
        name="Transações"
        component={TransactionsScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return (
                <View className="items-center justify-center size-14 bg-primary-500 rounded-full">
                  <Ionicons name="cash" color={color} size={size} />
                </View>
              );
            }
            return <Ionicons name="cash-outline" color={color} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name="Categorias"
        component={CategoryList}
        options={{
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return (
                <View className="items-center justify-center size-14 bg-primary-500 rounded-full">
                  <Ionicons name="grid" color={color} size={size} />
                </View>
              );
            }
            return <Ionicons name="grid-outline" color={color} size={size} />;
          },
        }}
      />

      <Tab.Screen
        name="Perfil"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return (
                <View className="items-center justify-center size-14 bg-primary-500 rounded-full">
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
