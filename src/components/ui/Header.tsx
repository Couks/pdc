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
      className="justify-center bg-primary-500 dark:bg-secondary-900 px-4"
      style={[styles.header, style]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 100,
  },
});
