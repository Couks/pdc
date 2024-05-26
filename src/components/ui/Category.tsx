import { Dialog, DialogTrigger, DialogContent } from "./Dialog";
import { TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "react-native";
import Animated, { FadeInDown, FlipInEasyX } from "react-native-reanimated";

interface CategoryProps {
  iconName: string;
  title: string;
  description: string;
}

export function Category({ iconName, title, description }: CategoryProps) {
  return (
    <Dialog>
      <DialogTrigger>
        <TouchableOpacity style={{ alignItems: "center", gap: 8 }}>
          <Animated.View
            entering={FlipInEasyX.delay(400).duration(2000).springify()}
            className="bg-purple-500 rounded-3xl items-center justify-center"
            style={{
              width: 90,
              height: 90,
            }}
          >
            <Ionicons name={iconName} size={40} color="white" />
          </Animated.View>
          <Text className="text-purple-800 dark:text-white text-xs">
            {title}
          </Text>
        </TouchableOpacity>
      </DialogTrigger>
      <DialogContent>
        <View
          className="gap-4 rounded-3xl justify-center w-auto h-auto bg-purple-500 shadow-2xl"
          style={{ margin: 30, padding: 30 }}
        >
          <View className="flex-row items-center gap-4">
            <Ionicons name={iconName} size={40} color="white" />
            <Text className="font-semibold text-3xl text-white ">{title}</Text>
          </View>
          <Text className="text-gray-200 text-center">{description}</Text>
        </View>
      </DialogContent>
    </Dialog>
  );
}
