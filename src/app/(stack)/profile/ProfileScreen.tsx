import { Link } from "expo-router";
import Header from "@/components/Header";
import { Text, View } from "react-native";
import { Button } from "@/components/Button";
import { useToast } from "@/components/Toast";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useAuth } from "@/services/AuthContext";
import { ToggleTheme } from "@/components/ToggleTheme";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/Avatar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/Dialog";
import Animated, { FadeInDown, FlipInEasyX } from "react-native-reanimated";

export default function ProfileScreen({ navigation }: any) {
  const { onLogout } = useAuth();
  const { toast } = useToast();

  function handleLogout() {
    toast("Você deslogou, até mais! 😔", "destructive", 5000);

    setTimeout(() => {
      onLogout;
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

          <Animated.Text
            entering={FadeInDown.springify().delay(200).duration(800)}
            className="dark:text-white text-purple-800 font-bold text-2xl mt-4"
          >
            Matheus Castro
          </Animated.Text>
          <Animated.Text
            entering={FadeInDown.springify().delay(400).duration(800)}
            className="dark:text-gray-200 text-gray-400"
          >
            @couks
          </Animated.Text>

          <View className="flex-col gap-6">
            <Link href="/profile/SettingsScreen" />
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
              onPress={() => navigation.navigate("EditProfile")}
            >
              <View
                className="items-center justify-center bg-green-500 dark:bg-purple-500 rounded-3xl "
                style={{ height: 60, width: 60 }}
              >
                <Ionicons name="person" color="white" size={30} />
              </View>
              <Text className="text-2xl font-bold text-purple-800 dark:text-white">
                Editar Perfil
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
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

            <View className="self-center">
              <ToggleTheme />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
