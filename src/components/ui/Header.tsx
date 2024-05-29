import React from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

interface Props {
  title?: string;
  children?: React.ReactNode;
  style?: object;
}

export function Header({ title, children, style }: Props) {
  return (
    <View
      className="items-center justify-center bg-green-500 dark:bg-green-700 px-8 gap-4 mt-8"
      style={[styles.header, style]}
    >
      <Animated.Text
        entering={FadeInUp.delay(200).springify()}
        className="dark:text-white text-purple-800 font-bold text-3xl"
      >
        {title}
      </Animated.Text>
      <View className="w-full">{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 300,
  },
});
