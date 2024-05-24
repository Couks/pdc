import { View, Text } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

interface Props {
  title?: string;
  children?: React.ReactNode;
  style?: object;
}

export function Header({ title, children, style }: Props) {
  return (
    <View
      className="items-center justify-center bg-green-500 dark:bg-green-700 px-8"
      style={[styles.header, style]}
    >
      <Animated.Text
        entering={FadeInDown.delay(200).duration(1000).springify()}
        className="dark:text-white text-purple-800 font-bold text-4xl mb-4"
      >
        {title}
      </Animated.Text>
      <View>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 300,
  },
});
