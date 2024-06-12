import { View } from "react-native";
import { useColorScheme } from "nativewind";
import { Ionicons } from "@expo/vector-icons";
import { AnalysisScreen } from "@/app/screens/AnalysisScreen";
import { DashboardScreen } from "@/app/screens/DashboardScreen";
import { ProfileScreen } from "@/app/screens/ProfileScreen";
import { CategoryListScreen } from "@/app/screens/CategoryListScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TransactionsScreen } from "@/app/screens/transactions/TransactionsScreen";
import { CreateTransaction } from "@/app/screens/transactions/CreateTransaction";
import { Text } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

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
          bottom: 10,
          marginHorizontal: 10,
          borderRadius: 100,
          height: 65,
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
        component={AnalysisScreen}
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
        component={CategoryListScreen}
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
        name="Criar Transação"
        component={CreateTransaction}
        options={{
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return (
                <View className="items-center justify-center size-14 bg-primary-500 rounded-full">
                  <Ionicons name="add-circle" color={color} size={size} />
                </View>
              );
            }
            return (
              <Ionicons name="add-circle-outline" color={color} size={size} />
            );
          },
        }}
      />

      <Tab.Screen
        name="Perfil"
        component={ProfileScreen}
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
