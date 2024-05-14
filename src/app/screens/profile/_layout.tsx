import { createStackNavigator } from "@react-navigation/stack";
import SettingsScreen from "./SettingsScreen";
import ProfileScreen from "./ProfileScreen";
import EditProfileScreen from "./EditProfileScreen";

const ProfileStack = createStackNavigator();

type RootStackParamList = {
  ProfileScreen: { userId: string };
  EditProfileScreen: { image: string; name: string; nickname: string };
  SettingsScreen: undefined;
};

export default function ProfileStackNavigator() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerTitle: "Perfil" }}
      />
      <ProfileStack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{ headerTitle: "Editar Perfil" }}
      />
      <ProfileStack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{ headerTitle: "Configurações" }}
      />
    </ProfileStack.Navigator>
  );
}
