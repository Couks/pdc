import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ProfessionalDashboard } from "@/app/screens/professional/dashboard";
import { ManageExams } from "@/app/screens/professional/manage-exams";
import { Profile } from "@/app/screens/shared/profile";
import { Ionicons } from "@expo/vector-icons";
import { View, Text } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useColorScheme } from "nativewind";
import { colors } from "@/assets/styles/colors";

const Tab = createBottomTabNavigator();

export function ProfessionalTabRoutes() {
  const { colorScheme } = useColorScheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerTintColor:
          colorScheme === "light" ? colors.primary[500] : colors.secondary[900],
        headerTitleAlign: "center",
        headerStatusBarHeight: 30,
        headerTitle(props) {
          return (
            <Animated.View entering={FadeInUp.delay(200).springify()}>
              <Text className="dark:text-white text-primary-900 font-bold text-3xl">
                {props.children}
              </Text>
            </Animated.View>
          );
        },
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor:
            colorScheme === "light" ? colors.primary[500] : colors.primary[900],
        },
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor:
          colorScheme === "light" ? colors.primary[900] : colors.secondary[900],
        tabBarInactiveTintColor:
          colorScheme === "light" ? colors.primary[700] : colors.white,
        tabBarStyle: {
          backgroundColor:
            colorScheme === "light"
              ? colors.primary[200]
              : colors.secondary[700],
          borderTopWidth: 0,
          width: "auto",
          paddingHorizontal: 6,
          position: "absolute",
          bottom: 18,
          elevation: 14,
          marginHorizontal: 24,
          borderRadius: 50,
          height: 60,
        },
      }}
    >
      {/* Dashboard */}
      <Tab.Screen
        name="Dashboard"
        component={ProfessionalDashboard}
        options={{
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return (
                <View
                  style={{
                    backgroundColor: colors.primary[500],
                    borderRadius: 50,
                    padding: 8,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Ionicons name="home" color={color} size={size} />
                </View>
              );
            }
            return <Ionicons name="home-outline" color={color} size={size} />;
          },
        }}
      />

      {/* Gerenciamento de Exames */}
      <Tab.Screen
        name="Gerenciamento de Exames"
        component={ManageExams}
        options={{
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return (
                <View
                  style={{
                    backgroundColor: colors.primary[500],
                    borderRadius: 50,
                    padding: 8,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Ionicons name="medkit" color={color} size={size} />
                </View>
              );
            }
            return <Ionicons name="medkit-outline" color={color} size={size} />;
          },
        }}
      />

      {/* Perfil */}
      <Tab.Screen
        name="Perfil"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return (
                <View
                  style={{
                    backgroundColor: colors.primary[500],
                    borderRadius: 50,
                    padding: 8,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
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
