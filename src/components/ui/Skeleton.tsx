import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { View, StyleSheet, Dimensions } from "react-native";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

const windowWidth = Dimensions.get("window").width;

export function Skeleton({ className, ...props }: { className?: string }) {
  const translateX = useSharedValue(-windowWidth);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(windowWidth, { duration: 1000 }),
      -1,
      false
    );
  }, []);

  return (
    <View
      className={cn("bg-gray-300 overflow-hidden rounded-xl", className)}
      {...props}
    >
      <View style={StyleSheet.absoluteFill}>
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              opacity: 0.9,
              width: "40%",
            },
            animatedStyle,
          ]}
        />
      </View>
    </View>
  );
}
