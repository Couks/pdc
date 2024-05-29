import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

export function Skeleton({ className, ...props }: { className?: string }) {
  const fadeAnim = useSharedValue(0.5);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeAnim.value,
    };
  });

  useEffect(() => {
    fadeAnim.value = withRepeat(withTiming(1, { duration: 400 }), -1, true);
  }, []);

  return (
    <Animated.View
      className={cn("bg-gray-400 rounded-full", className)}
      style={[animatedStyle]}
      {...props}
    />
  );
}
