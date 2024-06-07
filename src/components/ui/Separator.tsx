import React, { forwardRef } from "react";
import { View, StyleSheet } from "react-native";

interface SeparatorProps {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
  style?: React.CSSProperties;
}

const Separator = forwardRef<View, SeparatorProps>(
  ({ orientation = "horizontal", decorative = true, style, ...props }, ref) => {
    const separatorStyle = [
      styles.separator,
      orientation === "horizontal" ? styles.horizontal : styles.vertical,
      style,
    ];

    return <View style={separatorStyle} />;
  }
);

const styles = StyleSheet.create({
  separator: {
    backgroundColor: "rgb(107 114 128)",
    borderRadius: 100,
  },
  horizontal: {
    height: 2,
    width: "100%",
    marginVertical: 8,
  },
  vertical: {
    width: 2,
    height: "100%",
    marginHorizontal: 8,
  },
});

export default Separator;
