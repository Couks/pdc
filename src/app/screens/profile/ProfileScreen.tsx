import { Link } from "expo-router";
import Header from "@/components/ui/Header";
import { Text, View } from "react-native";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useAuth } from "@/hooks/auth/AuthContext";
import { ToggleTheme } from "@/components/ui/ToggleTheme";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/Dialog";
import Animated, { FadeInDown, FlipInEasyX } from "react-native-reanimated";
import { useProfile } from "@/hooks/useProfile";

export default function ProfileScreen({ navigation }) {
  const { onLogout = () => {} } = useAuth();
  const { toast } = useToast();

  const { userData } = useProfile();

  function handleLogout() {
    toast("Você deslogou, até mais! 😔", "destructive", 5000);

    setTimeout(() => {
      if (onLogout) {
        onLogout();
      }
    }, 5000);
  }

  return (
    <View className="flex-1 bg-green-500 dark:bg-green-700">
      <Header title="Perfil" style={{ height: 200 }} />

      <View className="flex-1 bg-white items-center dark:bg-purple-800 rounded-t-[30px]">
        <View className="items-center" style={{ marginTop: -70 }}>
          <Animated.View
            entering={FlipInEasyX.springify().damping(2).duration(2000)}
          >
            <Avatar
              className="border-8 border-green-500 dark:border-green-700"
              style={{ height: 130, width: 130, backgroundColor: "#052224" }}
            >
              <AvatarImage source={{ uri: "https://github.com/couks.png" }} />
              <AvatarFallback>RG</AvatarFallback>
            </Avatar>
          </Animated.View>

          {userData && (
            <Animated.Text
              entering={FadeInDown.springify().delay(400).duration(1000)}
              className="dark:text-white text-purple-800 font-bold text-2xl mt-4"
            >
              {userData.firstName || "usuario nao encontrado"}{" "}
              {userData.lastName}
            </Animated.Text>
          )}

          {userData && (
            <Animated.Text
              entering={FadeInDown.springify().delay(600).duration(1000)}
              className="dark:text-gray-200 text-gray-500"
            >
              @{userData.apelido}
            </Animated.Text>
          )}

          {userData && (
            <Animated.Text
              entering={FadeInDown.springify().delay(800).duration(1000)}
              className="dark:text-gray-200 text-gray-400"
            >
              {userData.email}
            </Animated.Text>
          )}

          <View className="flex-col gap-4">
            {/* <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
              onPress={() => navigation.navigate("EditProfileScreen")}
            >
              <View
                className="items-center justify-center bg-green-500 dark:bg-rpurple-500 rounded-3xl "
                style={{ height: 60, width: 60 }}
              >
                <Ionicons name="person" color="white" size={30} />
              </View>
              <Text className="text-2xl font-bold text-purple-800 dark:text-white">
                Editar Perfil
              </Text>
            </TouchableOpacity> */}

            {/* <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
              onPress={() => navigation.navigate("SettingsScreen")}
            >
              <View
                className="items-center justify-center bg-green-500 dark:bg-purple-500 rounded-3xl "
                style={{ height: 60, width: 60 }}
              >
                <Ionicons name="settings" color="white" size={30} />
              </View>
              <Text className="text-2xl font-bold text-purple-800 dark:text-white">
                Configurações
              </Text>
            </TouchableOpacity> */}

            <Dialog>
              <DialogTrigger>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <View
                    className="items-center justify-center bg-green-500 dark:bg-purple-500 rounded-3xl "
                    style={{ height: 60, width: 60 }}
                  >
                    <Ionicons name="log-out-outline" color="white" size={30} />
                  </View>
                  <Text className="text-2xl font-bold text-purple-800 dark:text-white">
                    Sair
                  </Text>
                </TouchableOpacity>
              </DialogTrigger>
              <DialogContent>
                <View
                  className="gap-4 rounded-3xl justify-center shadow-2xl bg-red-500"
                  style={{ margin: 20, padding: 30 }}
                >
                  <Text className="text-white text-xl">
                    Tem certeza que deseja sair?
                  </Text>
                  <Button
                    label="Sair"
                    variant="light"
                    className="w-full"
                    onPress={handleLogout}
                  />
                </View>
              </DialogContent>
            </Dialog>

            <View className="self-center">
              <ToggleTheme />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
