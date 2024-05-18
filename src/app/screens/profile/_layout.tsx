import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "./ProfileScreen";
import SettingsScreen from "./SettingsScreen";

const ProfileStack = createStackNavigator();

type RootStackParamList = {
  ProfileScreen: { userId: string };
  EditProfileScreen: { image: string; name: string; nickname: string };
  SettingsScreen: undefined;
};

export default function ProfileStackNavigator() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} />
      <ProfileStack.Screen name="SettingsScreen" component={SettingsScreen} />
      {/* <ProfileStack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
      /> */}
    </ProfileStack.Navigator>
  );
}
