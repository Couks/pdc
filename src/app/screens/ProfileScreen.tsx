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
import { RoundedView } from "@/components/ui/RoundedView";

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

  function formatString(name: string | null | undefined) {
    if (!name) {
      return "Usuário";
    }

    return name.replace(/(?:^|\s)[a-z]/g, function (letter: string) {
      return letter.toUpperCase();
    });
  }

  const formattedFirstName = formatString(userData?.firstName);
  const formattedLastName = formatString(userData?.lastName);

  if (!userData) {
    return (
      <View>
        <Text>Something went wrong, please try again later.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-green-500 dark:bg-green-700">
      <Header title="Perfil" style={{ height: 250 }} />
      <RoundedView>
        <View className="flex-col items-center justify-around h-full">
          <View className="items-center gap-2">
            <Animated.View
              entering={FlipInEasyX.springify().damping(2).duration(2000)}
              style={{ marginTop: -110 }}
            >
              <Avatar
                className="border-4 border-green-500 dark:border-green-700"
                style={{ height: 130, width: 130, backgroundColor: "#052224" }}
              >
                <AvatarImage
                  source={{
                    uri:
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThxpcmi8WVEkDU-XPYeZPPlp5daXAH7Ho_UA&s" ||
                      undefined,
                  }}
                />
                <AvatarFallback>PROFILE</AvatarFallback>
              </Avatar>
            </Animated.View>

            <Animated.Text
              entering={FadeInDown.springify().delay(400).duration(1000)}
              className="dark:text-white text-purple-800 font-bold text-3xl "
            >
              {formattedFirstName}
              {formattedLastName}
            </Animated.Text>

            <Animated.Text
              entering={FadeInDown.springify().delay(600).duration(1000)}
              className="dark:text-gray-400 text-gray-600 text-xl"
            >
              {userData.email}
            </Animated.Text>

            <Animated.Text
              entering={FadeInDown.springify().delay(800).duration(1000)}
              className="dark:text-gray-100 text-gray-500 text-lg"
            >
              @{userData.apelido}
            </Animated.Text>
          </View>

          <View className="items-center gap-8">
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
            <ToggleTheme />
          </View>
        </View>
      </RoundedView>
    </View>
  );
}
