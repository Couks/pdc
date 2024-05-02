import { View, Text } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";

type Props = {
  title: string;
  children: React.ReactNode;
  style?: object;
};

export default function Header({ title, children, style }: Props) {
  return (
    <View
      className="flex-col items-center justify-center bg-green-500 dark:bg-green-700 px-8 "
      style={[styles.header, style]}
    >
      <Text className="text-white font-bold text-3xl">{title}</Text>
      <View className="flex-col items-center justify-center">{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 300,
  },
});
