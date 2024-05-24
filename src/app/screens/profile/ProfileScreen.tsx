import { Link } from "expo-router";
import { Header } from "@/components/ui/Header";
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

export function ProfileScreen() {
  const { onLogout = () => {} } = useAuth();
  const { toast } = useToast();
  const userData = useProfile();

  function handleLogout() {
    toast("Deslogando...", "destructive", 3000);

    setTimeout(() => {
      if (onLogout) {
        onLogout();
      }
    }, 3000);
  }

  function formatString(name: string) {
    return name.replace(/(?:^|\s)[a-z]/g, function (letter: string) {
      return letter.toUpperCase();
    });
  }

  const formattedFirstName = formatString(userData.firstName);
  const formattedLastName = formatString(userData.lastName);
  const formattedNickNname = formatString(userData.apelido);

  return (
    <View className="flex-1 bg-green-500 dark:bg-green-700">
      <Header title="Perfil" style={{ height: 200 }} />

      <View className="flex-1 bg-white items-center dark:bg-purple-800 rounded-t-[50px]">
        <View className="flex-col items-center justify-around h-full">
          <View className="items-center">
            <Animated.View
              entering={FlipInEasyX.springify().damping(2).duration(2000)}
              style={{ marginTop: -100 }}
            >
              <Avatar
                className="border-4 border-green-500 dark:border-green-700"
                style={{ height: 130, width: 130, backgroundColor: "#052224" }}
              >
                <AvatarImage
                  source={{
                    uri:
                      "https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png" ||
                      undefined,
                  }}
                />
                <AvatarFallback>PROFILE</AvatarFallback>
              </Avatar>
            </Animated.View>

            <Animated.Text
              entering={FadeInDown.springify().delay(400).duration(1000)}
              className="dark:text-white text-purple-800 font-bold text-2xl mt-4"
            >
              {formattedFirstName} {formattedLastName}
            </Animated.Text>

            <Animated.Text
              entering={FadeInDown.springify().delay(600).duration(1000)}
              className="dark:text-gray-200 text-gray-500"
            >
              @{formattedNickNname}
            </Animated.Text>

            <Animated.Text
              entering={FadeInDown.springify().delay(800).duration(1000)}
              className="dark:text-gray-400 text-gray-600"
            >
              {userData.apelido}
            </Animated.Text>
          </View>

          <View className="flex-col gap-4">
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
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
            </TouchableOpacity>

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
          </View>

          <View className="self-center">
            <ToggleTheme />
          </View>
        </View>
      </View>
    </View>
  );
}
