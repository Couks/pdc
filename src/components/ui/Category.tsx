import { Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import Animated, { FadeIn, StretchInY } from "react-native-reanimated";
import { Dialog, DialogTrigger, DialogContent } from "./Dialog";
import { useColorScheme } from "nativewind";
import { colors as defaultColors } from "@/assets/styles/colors";

interface CategoryProps {
  iconName: string;
  title: string;
  description: string;
}

export function Category({ iconName, title, description }: CategoryProps) {
  const { colorScheme } = useColorScheme();
  return (
    <Dialog>
      <DialogTrigger>
        <TouchableOpacity>
          <Animated.View
            entering={FadeIn.delay(800).duration(2000).springify()}
            className="bg-primary-500 dark:bg-secondary-500 rounded-3xl items-center justify-center gap-2"
            style={{
              width: 96,
              height: 96,
            }}
          >
            <Ionicons
              name={iconName}
              size={40}
              color={
                colorScheme == "light"
                  ? defaultColors.secondary[500]
                  : defaultColors.primary[500]
              }
            />

            <Text className="text-secondary-800 dark:text-white text-sm text-center">
              {title}
            </Text>
          </Animated.View>
        </TouchableOpacity>
      </DialogTrigger>
      <DialogContent>
        <View
          className="gap-4 rounded-3xl justify-center w-auto h-auto bg-primary-500 dark:bg-secondary-500 shadow-2xl"
          style={{ margin: 10, padding: 30 }}
        >
          <View className="flex-row items-center gap-4">
            <Ionicons
              name={iconName}
              size={40}
              color={
                colorScheme == "light"
                  ? defaultColors.secondary[500]
                  : defaultColors.primary[500]
              }
            />
            <Text className="font-semibold text-3xl text-white ">{title}</Text>
          </View>
          <Text className="text-secondary-800 text-center font-semibold text-lg dark:text-gray-200 ">
            {description}
          </Text>
        </View>
      </DialogContent>
    </Dialog>
  );
}
