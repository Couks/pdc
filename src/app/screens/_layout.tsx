import { Slot } from "expo-router";
import { View, Text } from "react-native";

export default function Layout({ title }) {
  return (
    <Header title={title}>
      <Slot />
    </Header>
  );
}

const Header = () => {
  return (
    <View className="w-full h-full items-center bg-green-500 dark:bg-green-700">
      <Text className="font-bold text-3xl dark:text-white py-12">
        Bem Vindo{" "}
      </Text>

      <View className="flex-1 w-full rounded-t-[35px] bg-white dark:bg-purple-800">
        <Slot />
      </View>
    </View>
  );
};
