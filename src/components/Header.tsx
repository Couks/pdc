import { View, Text } from "react-native";
import React from "react";

type Props = {
  title: string;
};

export default function Header({ title }: Props) {
  return (
    <View
      className="items-center justify-center bg-green-500 dark:bg-green-700"
      style={{ height: 170 }}
    >
      <Text className="text-white font-bold text-4xl">{title}</Text>
    </View>
  );
}
