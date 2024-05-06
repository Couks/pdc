import { createStackNavigator } from "@react-navigation/stack";
import SettingsScreen from "./SettingsScreen";
import ProfileScreen from "./ProfileScreen";
import EditProfileScreen from "./EditProfileScreen";

const ProfileStack = createStackNavigator();

export default function ProfileStackNavigator() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerTitle: "Perfil" }}
      />
      <ProfileStack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{ headerTitle: "Ediar Perfil" }}
      />
      <ProfileStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerTitle: "Configurações" }}
      />
    </ProfileStack.Navigator>
  );
}
