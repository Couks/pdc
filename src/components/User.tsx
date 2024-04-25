import { View, Text } from "react-native";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";

export function User() {
  return (
    <View className="items-center">
      <Avatar className="size-32 border-4 border-purple-800 mt-4">
        <AvatarImage source={{ uri: "https://github.com/couks.png" }} />
        <AvatarFallback>RG</AvatarFallback>
      </Avatar>

      <Text className="text-green-500 font-bold text-2xl mt-4">
        Matheus Castro
      </Text>
      <Text className="text-gray-400">@couks</Text>

      <View className="w-full"></View>
    </View>
  );
}
