import { Text, View } from "react-native";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/Avatar";
import Header from "@/components/Header";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export default function ProfileScreen({ navigation }) {
  return (
    <>
      <Header title="Perfil" style={{ height: 200 }}>
        {""}
      </Header>
      <View className="flex-1 bg-white items-center dark:bg-purple-800">
        <View className="items-center" style={{ marginTop: -70 }}>
          <Avatar className="size-32 border-4 border-purple-800 mt-4">
            <AvatarImage source={{ uri: "https://github.com/couks.png" }} />
            <AvatarFallback>RG</AvatarFallback>
          </Avatar>

          <Text className="dark:text-white text-purple-800 font-bold text-2xl mt-4">
            Matheus Castro
          </Text>
          <Text className="dark:text-gray-200 text-gray-400">@couks</Text>
          <View className="flex-col mt-8 gap-4">
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
            >
              <View
                className="items-center justify-center bg-purple-500 rounded-3xl "
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
            >
              <View
                className="items-center justify-center bg-purple-500 rounded-3xl "
                style={{ height: 60, width: 60 }}
              >
                <Ionicons name="settings" color="white" size={30} />
              </View>
              <Text className="text-2xl font-bold text-purple-800 dark:text-white">
                Configurações
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
              onPress={() => navigation.navigate("")}
            >
              <View
                className="items-center justify-center bg-purple-500 rounded-3xl "
                style={{ height: 60, width: 60 }}
              >
                <Ionicons name="log-out-outline" color="white" size={30} />
              </View>
              <Text className="text-2xl font-bold text-purple-800 dark:text-white">
                Sair
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}
