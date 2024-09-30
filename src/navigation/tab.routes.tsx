import { View } from "react-native";
import { useColorScheme } from "nativewind";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { AdminDashboard } from "@/app/screens/admin/dashboard";
import { ProfessionalDashboard } from "@/app/screens/professional/dashboard";
import { PatientDashboard } from "@/app/screens/patient/dashboard";
import { useAuth } from "@/hooks/auth/AuthContext"; // Importa o contexto de autenticação
import { colors } from "@/assets/styles/colors";
import { Profile } from "@/app/screens/shared/profile";

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  const { colorScheme } = useColorScheme();
  const { authState } = useAuth(); // Pegue o estado de autenticação, incluindo o tipo de usuário

  // Decide qual dashboard usar com base no tipo de usuário
  const renderDashboard = () => {
    switch (authState?.userType) {
      case "Paciente":
        return PatientDashboard;
      case "Medico":
        return ProfessionalDashboard;
      case "Administrador":
        return AdminDashboard;
      default:
        return PatientDashboard; // Ou uma rota padrão
    }
  };

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
      {/* Página Home/Dashboard depende do tipo de usuário */}
      <Tab.Screen
        name="Home"
        component={renderDashboard()} // Renderiza o dashboard apropriado
        options={{
          headerShown: false,
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

      {/* Perfil está disponível para todos os usuários */}
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
