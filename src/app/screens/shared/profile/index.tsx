import { useState } from "react";
import { Text, View } from "react-native";
import { formatString } from "@/lib/utils";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "@/components/ui/Button";
import { TouchableOpacity } from "react-native";
import { useProfile } from "@/hooks/useProfile";
import { Header } from "@/components/ui/Header";
import { useToast } from "@/components/ui/Toast";
import * as ImagePicker from "expo-image-picker";
import { Loading } from "@/components/ui/Loading";
import { useAuth } from "@/hooks/auth/AuthContext";
import { Skeleton } from "@/components/ui/Skeleton";
import { ToggleTheme } from "@/components/ui/ToggleTheme";
import { RoundedView } from "@/components/ui/RoundedView";
import { Avatar, AvatarImage } from "@/components/ui/Avatar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/Dialog";
import Animated, { FadeInDown, FlipInEasyX } from "react-native-reanimated";

export function Profile() {
  const { onLogout = () => {} } = useAuth();
  const { toast } = useToast();

  const { userData } = useProfile();

  const [profileImage, setProfileImage] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThxpcmi8WVEkDU-XPYeZPPlp5daXAH7Ho_UA&s"
  );
  const PROFILE_IMAGE_KEY = "profile_image_uri";
  const [isLoading, setIsLoading] = useState(false);

  function handleLogout() {
    toast("Saindo...", "error");
    setTimeout(() => {
      if (onLogout) {
        onLogout();
      }
    }, 2000);
  }

  const handlePickImage = async () => {
    try {
      setIsLoading(true);
      let result = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (result.granted === false) {
        alert("Para alterar a imagem, permita o acesso a galeria");
        return;
      }

      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });

      if (!pickerResult.canceled) {
        const imageUri = pickerResult.assets[0].uri;
        setProfileImage(imageUri);
        await AsyncStorage.setItem(PROFILE_IMAGE_KEY, imageUri);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const formattedFirstName = formatString(userData?.firstName);
  const formattedLastName = formatString(userData?.lastName);

  return (
    <View className="flex-1 bg-primary-500 dark:bg-primary-900 ">
      <RoundedView>
        <View className="flex-col items-center justify-around h-full">
          <View className="items-center justify-center gap-2">
            <TouchableOpacity onPress={handlePickImage}>
              <Animated.View entering={FlipInEasyX.springify().damping(2)}>
                <Avatar
                  className="border-8 border-primary-500 dark:border-primary-800"
                  style={{
                    height: 150,
                    width: 150,
                    backgroundColor: "#052224",
                  }}
                >
                  {isLoading ? (
                    <Loading />
                  ) : (
                    <AvatarImage
                      source={{
                        uri: profileImage,
                      }}
                    />
                  )}
                </Avatar>
              </Animated.View>
            </TouchableOpacity>

            {!userData?.firstName && !userData?.lastName ? (
              <View className="flex-row gap-2 mb-2">
                <Skeleton className="w-32 h-8" />
                <Skeleton className="w-32 h-8" />
              </View>
            ) : (
              <Animated.Text
                entering={FadeInDown.springify().delay(400)}
                className="dark:text-white text-secondary-900 font-bold text-3xl "
              >
                {formattedFirstName} {formattedLastName}
              </Animated.Text>
            )}

            {!userData?.email ? (
              <Skeleton className="w-72 h-8 mb-2" />
            ) : (
              <Animated.Text
                entering={FadeInDown.springify().delay(600)}
                className="dark:text-gray-400 text-gray-600 text-xl"
              >
                {userData?.email}
              </Animated.Text>
            )}

            {!userData?.apelido ? (
              <Skeleton className="w-32 h-8" />
            ) : (
              <Animated.View
                entering={FadeInDown.springify().delay(800)}
                className="flex-row items-end justify-center"
              >
                <Ionicons name="at-circle-outline" size={18} color="white" />
                <Text className="dark:text-gray-100 text-gray-500 text-xl ml-[1px]">
                  {userData?.apelido}
                </Text>
              </Animated.View>
            )}
          </View>

          <Animated.View
            entering={FadeInDown.springify().delay(1000)}
            className="items-center gap-8"
          >
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
                    className="items-center justify-center bg-primary-500 dark:bg-secondary-500 rounded-md "
                    style={{ height: 60, width: 60 }}
                  >
                    <Ionicons name="log-out-outline" color="white" size={30} />
                  </View>
                  <Text className="text-3xl font-bold text-secondary-900 dark:text-white">
                    Sair
                  </Text>
                </TouchableOpacity>
              </DialogTrigger>
              <DialogContent>
                <View
                  className="gap-4 rounded-2xl justify-center shadow-2xl bg-black dark:bg-white"
                  style={{ margin: 20, padding: 30 }}
                >
                  <Text className="text-white dark:text-secondary-900 font-bold text-xl">
                    Tem certeza que deseja sair?
                  </Text>
                  <Button
                    label="Sair"
                    variant="destructive"
                    className="w-full"
                    onPress={handleLogout}
                  />
                </View>
              </DialogContent>
            </Dialog>
          </Animated.View>
          <Animated.View
            entering={FadeInDown.springify().delay(1200)}
            className="items-center gap-8"
          >
            <ToggleTheme />
          </Animated.View>
        </View>
      </RoundedView>
    </View>
  );
}
