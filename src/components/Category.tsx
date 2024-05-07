import { Dialog, DialogTrigger, DialogContent } from "./Dialog";
import { TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "react-native";

interface CategoryProps {
  iconName: string;
  title: string;
  description: string;
}

export default function Category({
  iconName,
  title,
  description,
}: CategoryProps) {
  return (
    <Dialog>
      <DialogTrigger>
        <TouchableOpacity>
          <View
            className="bg-purple-500 rounded-3xl items-center justify-center"
            style={{
              width: 90,
              height: 90,
            }}
          >
            <Ionicons name={iconName} size={40} color="white" />
          </View>
        </TouchableOpacity>
      </DialogTrigger>
      <DialogContent>
        <View
          className="gap-4 rounded-3xl justify-center w-auto h-auto border-2 border-white bg-purple-500"
          style={{ margin: 30, padding: 20 }}
        >
          <View className="flex-row items-center gap-4">
            <Ionicons name={iconName} size={40} color="white" />
            <Text className="font-semibold text-3xl text-white">{title}</Text>
          </View>
          <Text className="text-gray-200">{description}</Text>
        </View>
      </DialogContent>
    </Dialog>
  );
}
