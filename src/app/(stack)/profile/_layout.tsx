import { createStackNavigator } from "@react-navigation/stack";
import SettingsScreen from "./SettingsScreen";
import ProfileScreen from "./ProfileScreen";

const ProfileStack = createStackNavigator();

export default function ProfileStackNavigator() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: true }}>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerTitle: "Perfil" }}
      />
      <ProfileStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerTitle: "Configurações" }}
      />
    </ProfileStack.Navigator>
  );
}
