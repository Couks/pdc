import React from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

interface Props {
  children?: React.ReactNode;
  style?: object;
}

export function Header({ children, style }: Props) {
  return (
    <View
      className="justify-center bg-primary-500 dark:bg-primary-800 px-6 mt-4"
      style={[styles.header, style]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 80,
  },
});
