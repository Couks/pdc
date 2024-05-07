import { Text, View } from "react-native";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/Avatar";
import Header from "@/components/Header";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { ToggleTheme } from "@/components/ToggleTheme";
import { useAuth } from "@/services/AuthContext";
import { Dialog, DialogContent, DialogTrigger } from "@/components/Dialog";
import { Button } from "@/components/Button";
import { useToast } from "@/components/Toast";

export default function ProfileScreen({ navigation }: any) {
  const { onLogout } = useAuth();
  const { toast } = useToast();

  function handleLogout() {
    toast("Você deslogou, até mais! 😔", "destructive", 5000);
    onLogout;
    setTimeout(() => {
      navigation.navigate("Welcome");
    }, 5000);
  }
  return (
    <View className="flex-1 bg-green-500 dark:bg-green-700">
      <Header title="Perfil" style={{ height: 200 }} />
      <View className="flex-1 bg-white items-center dark:bg-purple-800 rounded-t-[50px]">
        <View className="items-center" style={{ marginTop: -70 }}>
          <Avatar
            className="border-4 border-green-500 dark:border-purple-800"
            style={{ height: 130, width: 130, backgroundColor: "#052224" }}
          >
            <AvatarImage source={{ uri: "https://github.com/couks.png" }} />
            <AvatarFallback>RG</AvatarFallback>
          </Avatar>
          <Text className="dark:text-white text-purple-800 font-bold text-2xl mt-4">
            Matheus Castro
          </Text>
          <Text className="dark:text-gray-200 text-gray-400">@couks</Text>
          <View className="flex-col gap-6">
            <Link href="/profile/SettingsScreen"></Link>
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
              onPress={() => navigation.navigate("EditProfile")}
            >
              <View
                className="items-center justify-center bg-green-500 dark:bg-purple-500 rounded-3xl "
                style={{ height: 60, width: 60 }}
              >
                <Ionicons name="notifications" color="white" size={30} />
              </View>
              <Text className="text-2xl font-bold text-purple-800 dark:text-white">
                Editar Perfil
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
              onPress={() => navigation.navigate("Settings")}
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
                  className="gap-4 rounded-3xl justify-center border-2 border-white bg-red-500"
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

            <View className="items-center">
              <ToggleTheme />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
