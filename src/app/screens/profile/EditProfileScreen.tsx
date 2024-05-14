import { Text, View } from "react-native";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/Avatar";

type EditProfileProps = {
  image: any;
  name: string;
  nickname: string;
};

export default function EditProfileScreen({
  image,
  name,
  nickname,
}: EditProfileProps) {
  return (
    <View className="flex-1 bg-white items-center justify-center">
      <View className="items-center">
        <Avatar className="size-32 border-4 border-purple-800 mt-4">
          <AvatarImage source={image} />
          <AvatarFallback>RG</AvatarFallback>
        </Avatar>
        <Text className="text-green-500 font-bold text-2xl mt-4">{name}</Text>
        <Text className="text-gray-400">{nickname}</Text>
      </View>
    </View>
  );
}
