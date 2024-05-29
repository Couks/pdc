import { Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import Animated, { StretchInY } from "react-native-reanimated";
import { Dialog, DialogTrigger, DialogContent } from "./Dialog";

interface CategoryProps {
  iconName: string;
  title: string;
  description: string;
}

export function Category({ iconName, title, description }: CategoryProps) {
  return (
    <Dialog>
      <DialogTrigger>
        <TouchableOpacity
          style={{ alignItems: "center", gap: 12, width: "100%" }}
        >
          <Animated.View
            entering={StretchInY.delay(400).duration(2000).springify()}
            className="bg-green-500 dark:bg-purple-500 rounded-3xl items-center justify-center"
            style={{
              width: 100,
              height: 70,
            }}
          >
            <Ionicons name={iconName} size={40} color="white" />
          </Animated.View>
          <Text className="text-purple-800 dark:text-white text-sm text-center">
            {title}
          </Text>
        </TouchableOpacity>
      </DialogTrigger>
      <DialogContent>
        <View
          className="gap-4 rounded-3xl justify-center w-auto h-auto bg-green-500 dark:bg-purple-500 shadow-2xl"
          style={{ margin: 10, padding: 30 }}
        >
          <View className="flex-row items-center gap-4">
            <Ionicons name={iconName} size={40} color="white" />
            <Text className="font-semibold text-3xl text-white ">{title}</Text>
          </View>
          <Text className="text-purple-800 text-center font-semibold text-lg dark:text-gray-200 ">
            {description}
          </Text>
        </View>
      </DialogContent>
    </Dialog>
  );
}
